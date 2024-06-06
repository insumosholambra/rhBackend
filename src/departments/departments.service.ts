import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from './departments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {


  constructor(
    @InjectRepository(Department)

    private readonly departmentsRepository: DepartmentRepository
  ){}


  async create(department: any): Promise<any> {
    return await this.departmentsRepository.save(department);
  }


  async findAll() {    
    return await this.departmentsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
