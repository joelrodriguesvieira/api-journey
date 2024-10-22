import { Injectable } from '@nestjs/common';
import { TripEntity } from '../../domain/entities/trip.entity';
import { ParticipantEntity } from '../../domain/entities/participant.entity';
import { PrismaTripRepository } from '../../infra/data/prisma/repositories/trip.repository';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: PrismaTripRepository) {}

  async createTrip(tripPayload: TripEntity) {
    const participants: ParticipantEntity[] = tripPayload.emailsToInvite.map(
      (emailToInvite) => ({
        email: emailToInvite,
        isConfirmed: false,
        isOwner: tripPayload.ownerEmail === emailToInvite ? true : false,
      }),
    );
    const trip = { ...tripPayload, participants };
    return this.tripRepository.createTrip(trip);
  }
}
