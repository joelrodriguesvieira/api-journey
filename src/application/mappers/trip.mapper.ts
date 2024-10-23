import { Injectable } from '@nestjs/common';
import { CreateTripDTO } from '../DTOs/createTrip.dto';
import { TripEntity } from '../../domain/entities/trip.entity';

@Injectable()
export class TripMapperApplication {
  toDomain(data: CreateTripDTO): TripEntity {
    const tripEntity = new TripEntity({
      destination: data.destination,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      emailsToInvite: data.emailsToInvite,
    });
    return tripEntity;
  }
}
