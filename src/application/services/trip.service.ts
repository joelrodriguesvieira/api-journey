import { BadRequestException, Injectable } from '@nestjs/common';
import { TripEntity } from '../../domain/entities/trip.entity';
import { ParticipantEntity } from '../../domain/entities/participant.entity';
import { PrismaTripRepository } from '../../infra/data/prisma/repositories/trip.repository';
import { ClientError } from '../../presentation/errors/clientError';
import * as dayjs from 'dayjs';
import { ActivityEntity } from '../../domain/entities/activity.entity';
import { LinkEntity } from '../../domain/entities/link.entity';
import { UpdateTripDTO } from '../DTOs/updateTrip.dto';
import { CreateActivityDTO } from '../DTOs/createActivity.dto';

@Injectable()
export class TripService {
  private readonly notFoundTripMessage = 'Trip not found';
  constructor(private readonly tripRepository: PrismaTripRepository) {}

  async createTrip(tripPayload: TripEntity) {
    if (dayjs(tripPayload.startsAt).isBefore(new Date())) {
      throw new ClientError('Invalid trip start date.');
    }

    if (dayjs(tripPayload.endsAt).isBefore(tripPayload.startsAt)) {
      throw new ClientError('Invalid trip end date.');
    }

    const activities: ActivityEntity[] = [];
    const links: LinkEntity[] = [];
    let participants: ParticipantEntity[] = [];

    participants = tripPayload.emailsToInvite.map((emailToInvite) => ({
      email: emailToInvite,
      isConfirmed: tripPayload.ownerEmail === emailToInvite ? true : false,
      isOwner: tripPayload.ownerEmail === emailToInvite ? true : false,
    }));
    const owner: ParticipantEntity = {
      name: tripPayload.ownerName,
      email: tripPayload.ownerEmail,
      isConfirmed: true,
      isOwner: true,
    };
    participants.push(owner);
    const trip = {
      ...tripPayload,
      participants,
      isConfirmed: false,
      activities,
      links,
    };
    return this.tripRepository.createTrip(trip);
  }

  async getUniqueTripById(tripId: string): Promise<TripEntity> {
    const trip = this.tripRepository.getUniqueTripById(tripId);
    return trip;
  }

  validateDate(date: Date, optionalDate?: Date) {
    if (dayjs(date).isBefore(new Date())) {
      throw new ClientError('Invalid start date.');
    }

    if (optionalDate) {
      if (dayjs(optionalDate).isBefore(date)) {
        throw new ClientError('Invalid end date.');
      }
    }
    return true;
  }

  async updateTrip(tripId: string, tripData: UpdateTripDTO) {
    const trip = await this.tripRepository.getUniqueTripById(tripId);

    if (!trip) {
      throw new BadRequestException(this.notFoundTripMessage);
    }
    if (!this.validateDate(tripData.startsAt, tripData.endsAt)) {
      throw new BadRequestException('Invalid date');
    }

    const updatedTrip = {
      ...trip,
      destination: tripData.destination,
      startsAt: tripData.startsAt,
      endsAt: tripData.endsAt,
    };

    return this.tripRepository.updateTrip(updatedTrip);
  }

  async createActivity(tripId: string, activityData: CreateActivityDTO) {
    const trip = await this.tripRepository.getUniqueTripById(tripId);

    if (!trip) {
      throw new BadRequestException(this.notFoundTripMessage);
    }
    if (!this.validateDate(activityData.occurs_at)) {
      throw new BadRequestException('Invalid date');
    }

    if (
      activityData.occurs_at < trip.startsAt ||
      activityData.occurs_at > trip.endsAt
    ) {
      throw new BadRequestException(
        'This date cannot be set because it is not in the travel range',
      );
    }

    const activity: ActivityEntity = {
      title: activityData.title,
      occursAt: activityData.occurs_at,
    };
    return this.tripRepository.createActivity(tripId, activity);
  }

  async findActivities(tripId: string) {
    const trip = await this.tripRepository.getUniqueTripById(tripId);

    if (!trip) {
      throw new BadRequestException(this.notFoundTripMessage);
    }

    const activities = await this.tripRepository.findActivities(tripId);
  }
}
