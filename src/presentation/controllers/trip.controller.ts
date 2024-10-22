import { Body, Controller, Post } from '@nestjs/common';
import { TripService } from '../../application/services/trip.service';
import { CreateTripDTO } from '../../application/DTOs/createTrip.dto';
import { TripMapper } from '../../application/mappers/trip.mapper';

@Controller('trips')
export class TripsController {
  constructor(
    private tripService: TripService,
    private readonly tripMapper: TripMapper,
  ) {}

  @Post()
  async createTrip(@Body() payload: CreateTripDTO) {
    const tripEntity = this.tripMapper.toDomain(payload);

    return this.tripService.createTrip(tripEntity);
  }
}
