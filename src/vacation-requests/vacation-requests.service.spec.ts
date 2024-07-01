import { Test, TestingModule } from '@nestjs/testing';
import { VacationRequestsService } from './vacation-requests.service';
import { VacationRequestRepository } from './vacation-requests.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VacationRequest } from './entities/vacation-request.entity';

describe('VacationRequestsService', () => {
  let service: VacationRequestsService;
  let repository: VacationRequestRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacationRequestsService,
        {
          provide: getRepositoryToken(VacationRequest),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              getMany: jest.fn().mockResolvedValue([]),
              getOne: jest.fn().mockResolvedValue(null),
              where: jest.fn().mockReturnThis(),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<VacationRequestsService>(VacationRequestsService);
    repository = module.get<VacationRequestRepository>(
      getRepositoryToken(VacationRequest),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vacation request', async () => {
      const body = {
        ID_SOLICITACAO: 1, // Adicione ID_SOLICITACAO aqui se for uma propriedade obrigatória
        ID_FUNCIONARIO: 1,
        DATA_SOLICITACAO: new Date(),
        DATA_INICIO_FERIAS: new Date(),
        DATA_FIM_FERIAS: new Date(),
        STATUS_SOLICITACAO: 'PENDING'
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'save').mockResolvedValue(body as VacationRequest);

      const result = await service.create(body);
      expect(result).toEqual(body);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { ID_FUNCIONARIO: body.ID_FUNCIONARIO },
      });
      expect(repository.save).toHaveBeenCalledWith(body);
    });

    // it('should throw DuplicateRequestException if request already exists', async () => {
    //   const body = {
    //     ID_FUNCIONARIO: 1,
    //     DATA_SOLICITACAO: new Date(),
    //     DATA_INICIO_FERIAS: new Date(),
    //     DATA_FIM_FERIAS: new Date(),
    //     STATUS_SOLICITACAO: 'PENDING'
    //   };
    //   jest.spyOn(repository, 'findOne').mockResolvedValue(body as VacationRequest);

    //   await expect(service.create(body)).rejects.toThrow(
    //     'ERRO',
    //   );
    //   expect(repository.findOne).toHaveBeenCalledWith({
    //     where: { ID_FUNCIONARIO: body.ID_FUNCIONARIO },
    //   });
    // });
  });

  describe('findAll', () => {
    it('should return an array of vacation requests', async () => {
      const result = [];
      jest.spyOn(repository.createQueryBuilder(), 'getMany').mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(repository.createQueryBuilder().getMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single vacation request', async () => {
      const id = 1;
      const result = { ID_FUNCIONARIO: id } as VacationRequest;
      jest.spyOn(repository.createQueryBuilder(), 'getOne').mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(repository.createQueryBuilder().where).toHaveBeenCalledWith('SOLICITACOES_FERIAS.ID_FUNCIONARIO = :id', { id });
      expect(repository.createQueryBuilder().getOne).toHaveBeenCalled();
    });
  });
});
