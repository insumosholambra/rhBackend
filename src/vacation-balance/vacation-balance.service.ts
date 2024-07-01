import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacationBalanceDto } from './dto/create-vacation-balance.dto';
import { UpdateVacationBalanceDto } from './dto/update-vacation-balance.dto';
import { VacationBalanceRepository } from './vacation-balance.repository';
import { VacationBalance } from './entities/vacation-balance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VacationRequest } from 'src/vacation-requests/entities/vacation-request.entity';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class VacationBalanceService {

  constructor(
    @InjectRepository(VacationBalance)
    private vacationBalanceRepository: VacationBalanceRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,
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


  async update(id: number, updateVacationBalanceDto: UpdateVacationBalanceDto){
    const queryBuilder = this.vacationBalanceRepository.query(`
        UPDATE FUNCIONARIOS SET ${updateVacationBalanceDto} WHERE ID = ${id}
      `);
    // const existingRequest = await queryBuilder
    //   .where('vacationRequest.ID_SOLICITACAO = :id', { id })
    //   .getOne();

    // if (!existingRequest) {
    //   throw new NotFoundException(`Solic  itação de férias com ID ${id} não encontrada.`);
    // }

    // const postWithDataSource = await this.dataSource
    // .createQueryBuilder()
    // .select("post")
    // .from(Post, "post")
    // .where("post.id= :postId", { postId: id })
    // .getOne()

    // await queryBuilder
    //   .update(User)
    //   .set({ SALDO_FERIAS: updateVacationBalanceDto.SALDO_FERIAS })
    //   .where('ID_SOLICITACAO = :id', { id })
    //   .execute();

    // return await queryBuilder.where('ID_SOLICITACAO = :id', { id }).getOne();
  }

  remove(id: number) {
    return `This action removes a #${id} vacationBalance`;
  }
}
