import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { VacationRequestRepository } from 'src/vacation-requests/vacation-requests.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { VacationRequest } from 'src/vacation-requests/entities/vacation-request.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(VacationRequest)
    private readonly vacationRepository: VacationRequestRepository,
  ) {}

  async create(user: User): Promise<User> {
    const password = user.MATRICULA.toString();
    user.PASSWORD = password;

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['DEPARTAMENTO', 'CARGO'],
    });
  }

  async findAllNames(): Promise<
    { id: number; nome: string; departamento: string }[]
  > {
    const users = await this.userRepository.find({
      relations: ['DEPARTAMENTO'],
    });
    return users.map((user) => ({
      id: user.ID,
      nome: user.NOME + ' ' + user.SOBRENOME,
      departamento: user.DEPARTAMENTO.DESCRICAO,
    }));
  }

  async findInfoCompras() {
    return await this.userRepository.query(`
      SELECT 
    FUNCIONARIOS.ID, 
    CONCAT(FUNCIONARIOS.NOME,FUNCIONARIOS.SOBRENOME) AS FUNCIONARIO,
    YEAR (NFDE.DT_MOVTO) AS ANO,
    FORMAT(NFDE.DT_MOVTO, 'd', 'PT-BR') AS DT_MOVTO, 
    NFME.N_FISCAL, 
    NFDE.FORNEC AS CNPJ, 
    CRCL.RAZ_SOCIAL, 
    CRCL.CIDADE,
    CRCL.ESTADO,
    CASE 
        WHEN TPGR.GRUPO IN (80020000, 80020400, 80020500, 80020600, 80020700, 80020800, 80020900, 80021000, 80021100) THEN 'FERTILIZANTES'
        WHEN TPGR.GRUPO IN (80010000, 80010100, 80010101, 80010102, 80010103, 80010104, 80010105, 80010106, 80010107, 80010108, 80010109, 80010110, 80010111, 80010112, 80010500) THEN 'DEFENSIVOS'
        WHEN TPGR.GRUPO IN (80070000, 80080000, 80080100, 80080200, 80090000, 80090100, 80100000) THEN 'CX/EMB/POTES'
        WHEN TPGR.GRUPO IN (80050000, 80050100, 80050200, 80050300, 80050400, 80050500, 80050600, 80050700, 80050800, 80050900, 80051000, 80051100, 80051200, 80051300) THEN 'DIVERSOS'
        WHEN TPGR.GRUPO IN (80060000, 80060100, 80060101, 80060200, 80060300, 80060400, 80060500, 80060600, 80060700, 80060800, 80060900) THEN 'PLAST/TELAS/RAFIAS'
        WHEN TPGR.GRUPO IN (80030000, 80030100, 80030300, 80030400, 80030500) THEN 'SEMENTES'
    END AS GRUPO,
    NFDE.TIPO_MOVTO AS TM, 
    CASE 
        WHEN NFDE.TIPO_MOVTO IN (300, 310, 851, 850) THEN 'VENDAS'
        WHEN NFDE.TIPO_MOVTO IN (80, 81, 84, 86, 890, 891) THEN 'DEVOLUCAO'
    END AS MOVTO,
    SUM(CASE 
            WHEN NFDE.TIPO_MOVTO IN (300, 310, 851, 850) THEN VLR_TOTAL
            WHEN NFDE.TIPO_MOVTO IN (80, 81, 84, 86, 890, 891) THEN -VLR_TOTAL
        END) AS TOTAL_LIQUIDO,
    EPAXC.RESERVADO_19 AS FABRICANTE,
    RTRIM(NFDE.C_PROD) AS C_PROD, 
    ESTQ.DESCR_1 + ESTQ.DESCR_2 AS DESC_PROD, 
    NFDE.UNIDADE AS UN, 
    NFDE.QTDE, 
    NFDE.VLR_UNIT,
    NFDE.VLR_TOTAL,  
    NFME.VENDEDOR AS COD_VEN,
    CRVN.NOME AS VENDEDOR
FROM ABC71DB.dbo.NFDE 
INNER JOIN ABC71DB.dbo.CRCL ON ABC71DB.dbo.NFDE.FORNEC = ABC71DB.dbo.CRCL.CLIENTE 
INNER JOIN ABC71DB.dbo.ESTQ ON ABC71DB.dbo.NFDE.C_PROD = ABC71DB.dbo.ESTQ.C_PROD 
INNER JOIN ABC71DB.dbo.TPGR ON ABC71DB.dbo.ESTQ.GRUPO = ABC71DB.dbo.TPGR.GRUPO 
INNER JOIN ABC71DB.dbo.NFME ON ABC71DB.dbo.NFDE.N_FISCAL = ABC71DB.dbo.NFME.N_FISCAL  
FULL JOIN ABC71DB.dbo.EPAXC ON ABC71DB.dbo.EPAXC.C_PROD = ABC71DB.dbo.NFDE.C_PROD
FULL JOIN ABC71DB.dbo.EPTP ON ABC71DB.dbo.EPTP.COD_PROD = ABC71DB.dbo.EPAXC.RESERVADO_27 
INNER JOIN ABC71DB.dbo.CRVN ON ABC71DB.dbo.NFME.VENDEDOR = ABC71DB.dbo.CRVN.VENDEDOR
INNER JOIN INTRANET.dbo.FUNCIONARIOS ON FUNCIONARIOS.VENDEDOR = ABC71DB.dbo.NFME.VENDEDOR 
WHERE NFDE.EMP_FIL = 8180001 AND CRCL.EMP_FIL = 8180001 AND TPGR.EMPRESA = 818 AND ESTQ.EMP_FIL = 8180001 AND CRVN.EMP_FIL = 8180001 AND NFME.EMP_FIL = 8180001
AND NFDE.TIPO_MOVTO IN (300,310,850,851,80, 81, 84, 86, 890, 891) AND NFME.TIPO_MOVTO IN (300,310,850,851,80, 81, 84, 86, 890, 891) AND NFDE.DT_MOVTO >= '2023-01-01' AND NFME.ID_CANCEL NOT LIKE 'S' AND CRVN.NOME NOT LIKE 'SUPERVISOR'
GROUP BY NFDE.DT_MOVTO,NFME.N_FISCAL, NFDE.FORNEC,CRCL.RAZ_SOCIAL, NFDE.TIPO_MOVTO,EPAXC.RESERVADO_19,NFDE.C_PROD,ESTQ.DESCR_1 + ESTQ.DESCR_2, CRCL.CIDADE, CRCL.ESTADO,
NFDE.UNIDADE,NFDE.QTDE,NFDE.VLR_TOTAL,NFDE.VLR_UNIT,CRVN.NOME, TPGR.GRUPO,NFME.VENDEDOR, nfde.N_FISCAL, FUNCIONARIOS.ID, FUNCIONARIOS.NOME,FUNCIONARIOS.SOBRENOME
ORDER BY NFDE.DT_MOVTO DESC, NFDE.N_FISCAL, NFME.N_FISCAL DESC;
      `);
  }

  async findOne(ID: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ID },
      relations: ['DEPARTAMENTO', 'CARGO'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUser(ID: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { ID } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(ID: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ID },
      relations: ['DEPARTAMENTO', 'CARGO'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(ID: number) {
    const user = await this.findUser(ID);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const holidayRequests = await this.findHolidayRequests(ID);

    if (holidayRequests.length > 0) {
      await this.vacationRepository.remove(holidayRequests);
    }

    await this.userRepository.remove(user);
  }

  async findHolidayRequests(ID: number) {
    const result = await this.vacationRepository.find({
      where: { ID_FUNCIONARIO: ID },
    });
    return result;
  }

  async saveUserPhoto(userId: number, photo: Buffer): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ID: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    user.FOTO = photo;
    return this.userRepository.save(user);
  }

  async getUserPhoto(userId: number): Promise<Buffer> {
    const user = await this.userRepository.findOne({
      select: ['FOTO'],
      where: { ID: userId}
    });
    if (!user || !user.FOTO) {
      throw new Error('Photo not found');
    }
    return user.FOTO;
  }
}
