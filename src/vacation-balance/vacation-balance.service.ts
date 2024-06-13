import { Injectable } from '@nestjs/common';
import { CreateVacationBalanceDto } from './dto/create-vacation-balance.dto';
import { UpdateVacationBalanceDto } from './dto/update-vacation-balance.dto';
import { VacationBalanceRepository } from './vacation-balance.repository';
import { VacationBalance } from './entities/vacation-balance.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VacationBalanceService {

  constructor(
    @InjectRepository(VacationBalance)
    private vacationBalanceRepository: VacationBalanceRepository
  ){}


  create(createVacationBalanceDto: CreateVacationBalanceDto) {
    return 'This action adds a new vacationBalance';
  }

  async findAll(): Promise<VacationBalance[]> {
    return await this.vacationBalanceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} vacationBalance`;
  }

  update(id: number, updateVacationBalanceDto: UpdateVacationBalanceDto) {
    return `This action updates a #${id} vacationBalance`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacationBalance`;
  }
}
