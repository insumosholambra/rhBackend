import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacationRequestDto } from './dto/create-vacation-request.dto';
import { UpdateVacationRequestDto } from './dto/update-vacation-request.dto';
import { VacationRequestRepository } from './vacation-requests.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { VacationRequest } from './entities/vacation-request.entity';
import { DuplicateRequestException } from 'src/exceptions/duplicate-request.exception';

@Injectable()
export class VacationRequestsService {


  constructor(
    @InjectRepository(VacationRequest)
    private vacationRequestRepository: VacationRequestRepository
  ){}


  async create(body) {
    const existingRequest = await this.vacationRequestRepository.findOne({ where: { ID_FUNCIONARIO: body.ID_FUNCIONARIO } });
  
    if (existingRequest) {
      throw new DuplicateRequestException();
    }
    return this.vacationRequestRepository.save(body);
  }


  async updateStatus(id: number, updateStatusDto: UpdateVacationRequestDto) {
    const queryBuilder = this.vacationRequestRepository.createQueryBuilder('vacationRequest');
    const existingRequest = await queryBuilder
      .where('vacationRequest.ID_SOLICITACAO = :id', { id })
      .getOne();

    if (!existingRequest) {
      throw new NotFoundException(`Solicitação de férias com ID ${id} não encontrada.`);
    }

    existingRequest.STATUS_SOLICITACAO = updateStatusDto.STATUS_SOLICITACAO;

    return this.vacationRequestRepository.save(existingRequest);
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
