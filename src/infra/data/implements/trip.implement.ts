import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TripRepository {
  abstract createTrip();
}
