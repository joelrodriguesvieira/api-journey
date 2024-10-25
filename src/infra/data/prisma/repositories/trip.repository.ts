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
          create: data.participants.map((participant) => ({
            name: participant.name,
            email: participant.email,
            is_confirmed: participant.isConfirmed,
            is_owner: participant.isOwner,
          })),
        },
        activities: {
          create: data.activities.map((activity) => ({
            title: activity.title,
            occurs_at: new Date(activity.occursAt).toISOString(),
          })),
        },
        links: {
          create: data.links.map((link) => ({
            title: link.title,
            url: link.url,
          })),
        },
      },
      include: {
        participants: true,
        activities: true,
        links: true,
      },
    });
    return this.tripMapper.toDomain(trip);
  }

  async getUniqueTripById(tripId: string): Promise<TripEntity> {
    const trip = await this.prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: {
        participants: true,
        activities: true,
        links: true,
      },
    });

    if (!trip) {
      throw new ClientError('Trip not found');
    }
    return this.tripMapper.toDomain(trip);
  }

  async updateTrip(trip: TripEntity): Promise<TripEntity> {
    try {
      const updateTrip = await this.prisma.trip.update({
        where: {
          id: trip.id,
        },
        data: {
          destination: trip.destination,
          starts_at: trip.startsAt,
          ends_at: trip.endsAt,
        },
        include: {
          participants: true,
          activities: true,
          links: true,
        },
      });
      return this.tripMapper.toDomain(updateTrip);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
