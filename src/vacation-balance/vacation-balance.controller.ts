import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacationBalanceService } from './vacation-balance.service';
import { CreateVacationBalanceDto } from './dto/create-vacation-balance.dto';
import { UpdateVacationBalanceDto } from './dto/update-vacation-balance.dto';

@Controller('vacation-balance')
export class VacationBalanceController {
  constructor(private readonly vacationBalanceService: VacationBalanceService) {}

  @Post()
  create(@Body() createVacationBalanceDto: CreateVacationBalanceDto) {
    return this.vacationBalanceService.create(createVacationBalanceDto);
  }

  @Get()
  findAll() {
    return this.vacationBalanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacationBalanceService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateVacationBalanceDto: UpdateVacationBalanceDto) {
    return this.vacationBalanceService.update(+id, updateVacationBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacationBalanceService.remove(+id);
  }
}
