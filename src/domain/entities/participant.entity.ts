export class ParticipantEntity {
  public id: string;
  public name?: string;
  public email: string;
  public isConfirmed: boolean;
  public isOwner: boolean;
  public tripId?: string;
}
