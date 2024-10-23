import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TripService } from '../../application/services/trip.service';
import { CreateTripDTO } from '../../application/DTOs/createTrip.dto';
import { TripMapperApplication } from '../../application/mappers/trip.mapper';

@Controller('trips')
export class TripsController {
  constructor(
    private tripService: TripService,
    private readonly tripMapper: TripMapperApplication,
  ) {}

  @Get('/:id')
  async getUniqueTrip(@Param('id') id: string) {
    return this.tripService.getUniqueTripById(id);
  }

  @Post()
  async createTrip(@Body() payload: CreateTripDTO) {
    const tripEntity = this.tripMapper.toDomain(payload);
    return this.tripService.createTrip(tripEntity);
  }
}
