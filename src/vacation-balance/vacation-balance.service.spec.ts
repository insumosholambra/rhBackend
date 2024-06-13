import { Test, TestingModule } from '@nestjs/testing';
import { VacationBalanceService } from './vacation-balance.service';

describe('VacationBalanceService', () => {
  let service: VacationBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacationBalanceService],
    }).compile();

    service = module.get<VacationBalanceService>(VacationBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
