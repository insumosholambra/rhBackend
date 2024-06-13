import { Module } from '@nestjs/common';
import { VacationRequestsService } from './vacation-requests.service';
import { VacationRequestsController } from './vacation-requests.controller';
import { VacationRequestRepository } from './vacation-requests.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationRequest } from './entities/vacation-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VacationRequest])],

  controllers: [VacationRequestsController],
  providers: [VacationRequestsService, VacationRequestRepository],
  exports: [VacationRequestsService, VacationRequestRepository],

})
export class VacationRequestsModule {}
