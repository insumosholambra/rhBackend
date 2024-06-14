import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateRequestException extends HttpException {
  constructor() {
    super('Já existe uma solicitação de férias para este funcionário.', HttpStatus.BAD_REQUEST);
  }
}
