import { Injectable, Logger } from '@nestjs/common';
import { IHealthCheck } from '../interfaces/health-check.interface';

@Injectable()
export class HealthCheckService {
  constructor(private logger: Logger) {}

  getHealthCheck(): IHealthCheck {
    this.logger.log('Application TOP');
    return { message: 'ok' };
  }
}
