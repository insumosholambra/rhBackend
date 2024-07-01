import { PartialType } from '@nestjs/mapped-types';
import { CreateVacationBalanceDto } from './create-vacation-balance.dto';

export class UpdateVacationBalanceDto extends PartialType(CreateVacationBalanceDto) {
    SALDO_FERIAS: number
}
