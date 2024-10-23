import { Injectable } from '@nestjs/common';
import { TripEntity } from '../../domain/entities/trip.entity';
import { ParticipantEntity } from '../../domain/entities/participant.entity';
import { PrismaTripRepository } from '../../infra/data/prisma/repositories/trip.repository';
import { ClientError } from '../../presentation/errors/clientError';
import * as dayjs from 'dayjs';
import { ActivityEntity } from '../../domain/entities/activity.entity';
import { LinkEntity } from '../../domain/entities/link.entity';

@Injectable()
export class TripService {
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
}
