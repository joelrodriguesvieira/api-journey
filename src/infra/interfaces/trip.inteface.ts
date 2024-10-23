export interface TripWithParticipant {
  participants: {
    id: string;
    name?: string;
    email: string;
    is_confirmed: boolean;
    is_owner: boolean;
  }[];
  id: string;
  destination: string;
  starts_at: Date;
  ends_at: Date;
  is_confirmed: boolean;
  created_at: Date;
}
