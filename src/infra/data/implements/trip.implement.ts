import { Injectable } from '@nestjs/common';
import { TripEntity } from '../../../domain/entities/trip.entity';

@Injectable()
export abstract class TripRepository {
  abstract createTrip(trip: TripEntity): Promise<TripEntity>;
  abstract getUniqueTripById(tripId: string);
}
