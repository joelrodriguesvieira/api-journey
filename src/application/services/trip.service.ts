import { BadRequestException, Injectable } from '@nestjs/common';
import { TripEntity } from '../../domain/entities/trip.entity';
import { ParticipantEntity } from '../../domain/entities/participant.entity';
import { PrismaTripRepository } from '../../infra/data/prisma/repositories/trip.repository';
import { ClientError } from '../../presentation/errors/clientError';
import * as dayjs from 'dayjs';
import { ActivityEntity } from '../../domain/entities/activity.entity';
import { LinkEntity } from '../../domain/entities/link.entity';
import { UpdateTripDTO } from '../DTOs/updateTrip.dto';

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

  async updateTrip(tripId: string, tripData: UpdateTripDTO) {
    const trip = await this.tripRepository.getUniqueTripById(tripId);

    if (!trip) {
      throw new BadRequestException(this.notFoundTripMessage);
    }

    if (dayjs(tripData.startsAt).isBefore(new Date())) {
      throw new ClientError('Invalid trip start date.');
    }

    if (dayjs(tripData.endsAt).isBefore(tripData.startsAt)) {
      throw new ClientError('Invalid trip end date.');
    }

    const updatedTrip = {
      ...trip,
      destination: tripData.destination,
      startsAt: tripData.startsAt,
      endsAt: tripData.endsAt,
    };

    return this.tripRepository.updateTrip(updatedTrip);
  }
}
