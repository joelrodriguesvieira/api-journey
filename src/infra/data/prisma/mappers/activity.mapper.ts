import { Injectable } from '@nestjs/common';
import { ActivityComplete } from '../../../interfaces/activity.interface';

@Injectable()
export class ActivtyMapper {
  toDomain(data: ActivityComplete) {
    return {
      title: data.title,
      occurs_at: data.occurs_at,
    };
  }
}
