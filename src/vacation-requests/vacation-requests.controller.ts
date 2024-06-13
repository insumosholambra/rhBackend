import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacationRequestsService } from './vacation-requests.service';
import { CreateVacationRequestDto } from './dto/create-vacation-request.dto';
import { UpdateVacationRequestDto } from './dto/update-vacation-request.dto';

@Controller('vacation-requests')
export class VacationRequestsController {
  constructor(private readonly vacationRequestsService: VacationRequestsService) {}

  @Post()
  create(@Body() body) {
    return this.vacationRequestsService.create(body);
  }

  @Get()
  findAll() {
    return this.vacationRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacationRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacationRequestDto: UpdateVacationRequestDto) {
    return this.vacationRequestsService.update(+id, updateVacationRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacationRequestsService.remove(+id);
  }
}
