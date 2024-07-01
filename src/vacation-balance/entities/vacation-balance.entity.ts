import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('SALDO_FERIAS')
export class VacationBalance {


    @PrimaryColumn()
    ID_FUNCIONARIO: number

    @Column()
    DIAS_ACUMULADOS: number

    @Column()
    DIAS_GOZADOS: number

    @Column()
    DIAS_RESTANTES: number
  STATUS_SOLICITACAO: any;
}
