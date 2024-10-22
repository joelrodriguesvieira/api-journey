import { Injectable } from '@nestjs/common';
import { TripRepository } from '../../implements/trip.implement';
import { TripEntity } from '../../../../domain/entities/trip.entity';
import { PrismaService } from '../../../clients/prisma.service';

@Injectable()
export class PrismaTripRepository implements TripRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTrip(data: TripEntity): Promise<any> {
    const trip = await this.prisma.trip.create({
      data: {
        destination: data.destination,
        starts_at: data.startsAt,
        ends_at: data.endsAt,
        is_confirmed: data.isConfirmed,
        participants: {
          create: data.participants?.map((participant) => ({
            email: participant.email,
            is_confirmed: participant.isConfirmed,
            is_owner: participant.isOwner,
          })),
        },
      },
    });
    return trip;
  }
}
