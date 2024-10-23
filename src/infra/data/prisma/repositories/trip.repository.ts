import { Injectable } from '@nestjs/common';
import { TripRepository } from '../../implements/trip.implement';
import { TripEntity } from '../../../../domain/entities/trip.entity';
import { PrismaService } from '../../../clients/prisma.service';
import { TripMapper } from '../mappers/trip.mapper';
import { ClientError } from '../../../../presentation/errors/clientError';

@Injectable()
export class PrismaTripRepository implements TripRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tripMapper: TripMapper,
  ) {}

  async createTrip(data: TripEntity): Promise<TripEntity> {
    const trip = await this.prisma.trip.create({
      data: {
        destination: data.destination,
        starts_at: new Date(data.startsAt).toISOString(),
        ends_at: new Date(data.endsAt).toISOString(),
        is_confirmed: data.isConfirmed,
        participants: {
          create: data.participants?.map((participant) => ({
            name: participant.name,
            email: participant.email,
            is_confirmed: participant.isConfirmed,
            is_owner: participant.isOwner,
          })),
        },
      },
      include: {
        participants: true,
      },
    });
    console.log(trip);
    return this.tripMapper.toDomain(trip);
  }

  async getUniqueTripById(tripId: string): Promise<TripEntity> {
    const trip = await this.prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: {
        participants: true,
      },
    });

    if (!trip) {
      throw new ClientError('Trip not found');
    }
    return this.tripMapper.toDomain(trip);
  }
}
