import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityComplete {
  id: string;
  trip_id: string;
  title: string;
  occurs_at: Date;
  trip: {
    id: string;
    destination: string;
    starts_at: Date;
    ends_at: Date;
    is_confirmed: boolean;
    created_at: Date;
  };
}
