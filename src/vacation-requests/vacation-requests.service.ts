import { Injectable } from '@nestjs/common';
import { CreateVacationRequestDto } from './dto/create-vacation-request.dto';
import { UpdateVacationRequestDto } from './dto/update-vacation-request.dto';
import { VacationRequestRepository } from './vacation-requests.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { VacationRequest } from './entities/vacation-request.entity';

@Injectable()
export class VacationRequestsService {

  constructor(
    @InjectRepository(VacationRequest)
    private vacationRequestRepository: VacationRequestRepository
  ){}


  create(body) {
    return this.vacationRequestRepository.save(body);
  }

  findAll() {
    return this.vacationRequestRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} vacationRequest`;
  }

  update(id: number, updateVacationRequestDto: UpdateVacationRequestDto) {
    return `This action updates a #${id} vacationRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacationRequest`;
  }
}
