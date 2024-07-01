import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { VacationRequestRepository } from 'src/vacation-requests/vacation-requests.repository';
import { VacationRequest } from 'src/vacation-requests/entities/vacation-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, VacationRequest])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, VacationRequestRepository],
  exports: [UserRepository, UsersService, VacationRequestRepository]
})
export class UsersModule {}
