import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  findOneById(ID: number) {
      throw new Error('Method not implemented.');
  }


  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ){}


  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: any) {
    const user = this.userRepository.findOneById(id);   
    return await user
  }

  async findUser(id: number, password: string) {
    const user = this.userRepository.createQueryBuilder(
      `
      SELECT * FROM FUNCIONARIOS WHERE ID = ${id} AND PASSWORD = '${password}'
      
      `
    )  
    return await user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
