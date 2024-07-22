import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitRepository } from './visit.repository';
import { Visit } from './entities/visit.entity';

@Injectable()
export class VisitService {

  constructor(
    @InjectRepository(VisitRepository)
    private visitRepository: VisitRepository,
  ) {}

  create(body) {
    if(body){
      return this.visitRepository.save(body)
    } else {
      return 'No data'
    }
  }

  async newVisit(visitData: any): Promise<Visit> {

    if (!visitData.DATA_VISITA) {
      visitData.DATA_VISITA = new Date().toISOString().split('T')[0];  // Data atual no formato yyyy-MM-dd
    }
    if (!visitData.NEW_DATE) {
      visitData.NEW_DATE = new Date().toISOString().split('T')[0];  // Data atual no formato yyyy-MM-dd
    }

    if (!visitData.DATA_FORM) {
      visitData.DATA_FORM = new Date().toISOString().split('T')[0];  // Data atual no formato yyyy-MM-dd
    }

    console.log(visitData);
    

    const newVisit = await this.visitRepository.query(
      `

        DECLARE @OutputTable TABLE (ID int);


      INSERT INTO VISITAS (
        NOME, SOBRENOME, DATA_VISITA, CLIENTE, PROPRIEDADE, CIDADE, CULTURA, OBJETIVO, 
        CHEGADA, SAIDA, CONTATO, MOTIVO, ASSUNTO, CONDICOES_PROP, PROBLEMAS, 
        MELHORIAS, VISITA_FUTU, NEW_DATE, ID, DATA_FORM
      ) OUTPUT INSERTED.ID INTO @OutputTable VALUES (
        '${visitData.NOME}', '${visitData.SOBRENOME}', '${visitData.DATA_VISITA}', '${visitData.CLIENTE}', '${visitData.PROPRIEDADE}', '${visitData.CIDADE}', '${visitData.CULTURA}', 
        '${visitData.OBJETIVO}', '${visitData.CHEGADA}', '${visitData.SAIDA}', '${visitData.CONTATO}', '${visitData.MOTIVO}', '${visitData.ASSUNTO}', '${visitData.CONDICOES_PROP}', 
        '${visitData.PROBLEMAS}', '${visitData.MELHORIAS}', '${visitData.VISITA_FUTU}', '${visitData.NEW_DATE}', '${visitData.ID}', '${visitData.DATA_FORM}'
      );   

        SELECT * FROM @OutputTable;

      `
    )

    return newVisit
  }

  private formatTime(time: string): string {
    return time.length === 5 ? time + ':00' : time;
  }

  async findAll() {
    try {
      const visits = await this.visitRepository.query(
        `
        SELECT * FROM VISITAS v 
        `
      );

      return visits
    } catch (error) {
      return {
        success: false,
        message: 'Error retrieving visits',
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    const user = await this.visitRepository.findOneBy({ ID: id });
    if (!user) {
      throw new NotFoundException('Visit not found');
    }
    return user;
  }
  

  update(id: number, updateVisitDto: UpdateVisitDto) {
    return `This action updates a #${id} visit`;
  }

  remove(id: number) {
    return this.visitRepository.delete(id)
  }
}
