import { Module } from '@nestjs/common';
import { VacationBalanceService } from './vacation-balance.service';
import { VacationBalanceController } from './vacation-balance.controller';
import { VacationBalanceRepository } from './vacation-balance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationBalance } from './entities/vacation-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VacationBalance])],
  controllers: [VacationBalanceController],
  providers: [VacationBalanceService, VacationBalanceRepository],
  exports: [VacationBalanceService, VacationBalanceRepository],

})
export class VacationBalanceModule {}
