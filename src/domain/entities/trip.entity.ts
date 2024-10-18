import { ActivityEntity } from './activity.entity';
import { ParticipantEntity } from './participant.entity';

export class TripEntity {
  public id: string;
  public destination: string;
  public startsAt: Date;
  public endsAt: Date;
  public isConfirmed: boolean;
  public createdAt: Date;
  public participants?: ParticipantEntity[];
  public activities?: ActivityEntity[];
  public links?: LinkEntity[];
}
