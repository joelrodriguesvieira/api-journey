import { Injectable } from '@nestjs/common';
import { TripEntity } from '../../../../domain/entities/trip.entity';
import { TripComplete } from '../../../interfaces/trip.inteface';

@Injectable()
export class TripMapper {
  toDomain(data: TripComplete): TripEntity {
    const tripEntity = new TripEntity({
      id: data.id,
      destination: data.destination,
      startsAt: data.starts_at,
      endsAt: data.ends_at,
      isConfirmed: data.is_confirmed,
      createdAt: data.created_at,
      participants: data.participants?.map((participant) => ({
        id: participant.id,
        name: participant.name ?? '',
        email: participant.email,
        isConfirmed: participant.is_confirmed,
        isOwner: participant.is_owner,
      })),
      activities: [],
      links: [],
    });
    return tripEntity;
  }
}
