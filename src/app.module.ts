import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './infra/modules/health-check.module';
import { TripModule } from './infra/modules/trip.module';

@Module({
  imports: [HealthCheckModule, TripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
