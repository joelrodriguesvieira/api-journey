import { Logger, Module } from '@nestjs/common';
import { HealthCheckController } from '../../presentation/controllers/health-check.controller';
import { HealthCheckService } from '../../application/services/health-check.service';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [
    HealthCheckService,
    {
      provide: Logger,
      useValue: new Logger('health-check'),
    },
  ],
})
export class HealthCheckModule {}
