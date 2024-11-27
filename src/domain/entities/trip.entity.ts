import { ActivityEntity } from './activity.entity';
import { LinkEntity } from './link.entity';
import { ParticipantEntity } from './participant.entity';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  destination: string;

  @Column({ type: 'timestamp' })
  starts_at: Date;

  @Column({ type: 'timestamp' })
  ends_at: Date;

  @Column({default: false})
}

export class TripEntity {
  public id?: string;
  public destination: string;
  public startsAt: Date;
  public endsAt: Date;
  public isConfirmed?: boolean;
  public createdAt?: Date;
  public ownerName?: string;
  public emailsToInvite?: string[];
  public ownerEmail?: string;
  public participants?: ParticipantEntity[];
  public activities?: ActivityEntity[];
  public links?: LinkEntity[];

  constructor(data: TripEntity) {
    Object.assign(this, data);
  }
}