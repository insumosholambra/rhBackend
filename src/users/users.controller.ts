import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('names')
  findUserNames() {
    return this.usersService.findAllNames();
  }

  // @Get('info-compras')
  // findInfoCompras(@Query('page') page = 1, @Query('limit') limit = 100) {
  //   const offset = (page - 1) * limit;
  //   return this.usersService.findInfoCompras(limit, offset);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }

  @Post(':id/upload-photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Param('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const savedUser = await this.usersService.saveUserPhoto(
      userId,
      file.buffer,
    );
    return {
      message: 'Photo uploaded successfully!',
      user: savedUser,
    };
  }

  @Get(':id/photo')
  async getPhoto(@Param('id') userId: number, @Res() res: Response) {
    try {
      const photo = await this.usersService.getUserPhoto(userId);
      if (!photo) {
        throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
      }
      res.setHeader('Content-Type', 'image/jpeg'); // Ajuste conforme o tipo real da imagem
      res.send(photo);
    } catch (error) {
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
