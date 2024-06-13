import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { format } from 'date-fns';
import { catchError } from 'rxjs';



@Injectable()
export class UsersService {
  findOneById(ID: number) {
      throw new Error('Method not implemented.');
  }


  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ){}


  // async create(user: User): Promise<User> {
  //   const generatedPassword = Math.random().toString(36).substring(2, 10);
  //   // const hashedPassword = await bcrypt.hash(generatedPassword, 10);
  //   user.PASSWORD = '123456';
  //   user.DATA_NASCTO = format(new Date(user.DATA_NASCTO), 'yyyy-MM-dd');
  //   user.DATA_CADASTRO = format(new Date(user.DATA_CADASTRO), 'yyyy-MM-dd');

  //   return await this.userRepository.save(user);
  // }

  async create(user: User): Promise<User> {

    const password = user.CPF
    const passOnlyNumbers = password.replace(/[^\d]/g, '');
    user.PASSWORD = passOnlyNumbers


    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: any) {
    const user = this.userRepository.findOneById(id);   
    return await user
  }

  async findUser(ID: number): Promise<User> {
    try{
      
      const user = this.userRepository.findOne({ where: { ID } });
      if(user){
        return user
      } else {
        Error('Erro, usuário não encontrado')
      }
    } catch {
      Error('Erro, usuário não encontrado')
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
