import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { VisitRepository } from './visit.repository';

@Module({
  controllers: [VisitController],
  providers: [VisitService, VisitRepository],
  exports: [VisitService, VisitRepository],
})
export class VisitModule {}
