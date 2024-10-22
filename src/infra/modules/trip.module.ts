import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/clients/prisma.module';
import { TripsController } from '../../presentation/controllers/trip.controller';
import { TripService } from '../../application/services/trip.service';
import { PrismaTripRepository } from '../data/prisma/repositories/trip.repository';
import { TripMapper } from '../../application/mappers/trip.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [TripsController],
  providers: [PrismaTripRepository, TripService, TripMapper],
  exports: [PrismaTripRepository],
})
export class TripModule {}
