import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('SOLICITACOES_FERIAS')
export class VacationRequest {

    @PrimaryGeneratedColumn()
    ID_SOLICITACAO: number

    @Column()
    ID_FUNCIONARIO: number

    @Column()
    DATA_SOLICITACAO: Date

    @Column()
    DATA_INICIO_FERIAS: Date

    @Column()
    DATA_FIM_FERIAS: Date

    @Column()
    STATUS_SOLICITACAO: string
}
