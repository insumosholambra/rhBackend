import { Department } from 'src/departments/entities/department.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('FUNCIONARIOS')
export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  PASSWORD: string;

  @Column()
  NOME: string;

  @Column()
  SOBRENOME: string;

  @Column()
  CPF: string;

  @Column()
  RG: number;

  @Column({ type: 'date' })
  DATA_NASCTO: string;

  @Column()
  ENDERECO: string;

  @Column()
  BAIRRO: string;

  @Column()
  CIDADE: string;

  @Column()
  ESTADO: string;

  @Column()
  TELEFONE: string;

  @Column()
  TEL_COMERCIAL: string;

  @Column()
  RAMAL: number;

  @Column()
  EMAIL: string;

  @ManyToOne(() => Department, department => department.users)
  @JoinColumn({ name: 'DEPARTAMENTO' })
  DEPARTAMENTO: Department;

  @ManyToOne(() => Role, cargo => cargo.users)
  @JoinColumn({ name: 'CARGO' })
  CARGO: Role;

  @Column({ type: 'date' })
  DATA_CADASTRO: string;

  @Column({ type: 'date' })
  ULTIMO_PERIODO_FERIAS: string;

  @Column()
  SALDO_FERIAS: number;

  @Column()
  MATRICULA: number;

  @Column({ type: 'varbinary', length: 'max' })
  FOTO: Buffer;

}
