import { Controller, Get } from '@nestjs/common';
import { IHealthCheck } from '../../application/interfaces/health-check.interface';
import { HealthCheckService } from '../../application/services/health-check.service';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly appService: HealthCheckService) {}
  @Get()
  getHello(): IHealthCheck {
    return this.appService.getHealthCheck();
  }
}
