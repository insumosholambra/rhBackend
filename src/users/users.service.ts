import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { VacationRequestRepository } from 'src/vacation-requests/vacation-requests.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { VacationRequest } from 'src/vacation-requests/entities/vacation-request.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(VacationRequest)
    private readonly vacationRepository: VacationRequestRepository,
  ) {}

  async create(user: User): Promise<User> {
    const password = user.MATRICULA.toString();
    user.PASSWORD = password;
  
    return await this.userRepository.save(user);
  }
  

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['DEPARTAMENTO', 'CARGO'] });
  }

  async findAllNames(): Promise<{ id: number; nome: string; departamento: string }[]> {
    const users = await this.userRepository.find({ relations: ['DEPARTAMENTO'] });
    return users.map(user => ({
      id: user.ID,
      nome: user.NOME + ' ' + user.SOBRENOME,
      departamento: user.DEPARTAMENTO.DESCRICAO 
    }));
  }
  
  

  
  async findOne(ID: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { ID }, relations: ['DEPARTAMENTO', 'CARGO'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUser(ID: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { ID } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(ID: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { ID }, relations: ['DEPARTAMENTO', 'CARGO'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(ID: number) {
    const user = await this.findUser(ID);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const holidayRequests = await this.findHolidayRequests(ID);

    if (holidayRequests.length > 0) {
      await this.vacationRepository.remove(holidayRequests);
    }

    await this.userRepository.remove(user);
  }

  async findHolidayRequests(ID: number) {
    const result = await this.vacationRepository.find({
      where: { ID_FUNCIONARIO: ID },
    });
    return result;
  }
}
