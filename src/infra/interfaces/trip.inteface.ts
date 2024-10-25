export interface TripComplete {
  id: string;
  destination: string;
  starts_at: Date;
  ends_at: Date;
  is_confirmed: boolean;
  created_at: Date;
  participants: {
    id: string;
    name?: string;
    email: string;
    is_confirmed: boolean;
    is_owner: boolean;
  }[];
  activities: {
    id: string;
    title: string;
    occurs_at: Date;
  }[];
  links: {
    id: string;
    title: string;
    url: string;
  }[];
}
