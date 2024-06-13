import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {config} from 'ormconfig'
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { DepartmentsModule } from './departments/departments.module';
import { PdfModule } from './pdf/pdf.module';
import { VacationBalanceModule } from './vacation-balance/vacation-balance.module';
import { VacationRequestsModule } from './vacation-requests/vacation-requests.module';

const ENV = process.env.NODE_ENV;


@Module({
  imports: [TypeOrmModule.forRoot(config),UsersModule, AuthModule, RoleModule, DepartmentsModule, PdfModule, VacationBalanceModule, VacationRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
