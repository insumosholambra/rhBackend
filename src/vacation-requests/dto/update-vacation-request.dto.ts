import { PartialType } from '@nestjs/mapped-types';
import { CreateVacationRequestDto } from './create-vacation-request.dto';

export class UpdateVacationRequestDto extends PartialType(CreateVacationRequestDto) {}
