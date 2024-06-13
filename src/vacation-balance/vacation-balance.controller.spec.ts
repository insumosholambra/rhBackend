import { Test, TestingModule } from '@nestjs/testing';
import { VacationBalanceController } from './vacation-balance.controller';
import { VacationBalanceService } from './vacation-balance.service';

describe('VacationBalanceController', () => {
  let controller: VacationBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacationBalanceController],
      providers: [VacationBalanceService],
    }).compile();

    controller = module.get<VacationBalanceController>(VacationBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
