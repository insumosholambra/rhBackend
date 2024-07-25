import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('VISITAS')
export class Visit {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  NOME: string;

  @Column()
  SOBRENOME: string;

  @Column({ type: 'date' })
  DATA_VISITA: string;

  @Column()
  CLIENTE: string;

  @Column()
  PROPRIEDADE: string;

  @Column()
  CIDADE: string;

  @Column()
  CULTURA: string;

  @Column()
  OBJETIVO: string;

  @Column()
  CHEGADA: string;

  @Column()
  SAIDA: string;

  @Column()
  CONTATO: string;

  @Column()
  MOTIVO: string;

  @Column()
  ASSUNTO: string;

  @Column()
  CONDICOES_PROP: string;

  @Column()
  PROBLEMAS: string;

  @Column()
  MELHORIAS: string;

  @Column()
  VISITA_FUTU: string;

  @Column({ type: 'date' })
  NEW_DATE: string;

  @Column()
  FUNCIONARIO_ID: number;

  @Column({ type: 'date' })
  DATA_FORM: string;

  @Column()
  TIPO_CLI: string;
}
