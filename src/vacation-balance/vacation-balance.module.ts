import { Module } from '@nestjs/common';
import { VacationBalanceService } from './vacation-balance.service';
import { VacationBalanceController } from './vacation-balance.controller';
import { VacationBalanceRepository } from './vacation-balance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationBalance } from './entities/vacation-balance.entity';
import { UserRepository } from 'src/users/user.repository';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VacationBalance, User])],
  controllers: [VacationBalanceController],
  providers: [VacationBalanceService, VacationBalanceRepository, UserRepository],
  exports: [VacationBalanceService, VacationBalanceRepository, UserRepository],
})

export class VacationBalanceModule {}
