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

const ENV = process.env.NODE_ENV;


@Module({
  imports: [TypeOrmModule.forRoot(config),UsersModule, AuthModule, RoleModule, DepartmentsModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
