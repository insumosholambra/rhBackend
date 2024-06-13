import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('FUNCIONARIOS')
export class User {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    PASSWORD: string

    @Column()
    NOME: string

    @Column()
    SOBRENOME: string

    @Column()
    CPF: string

    @Column()
    RG: number

    @Column({ type: 'date' })
    DATA_NASCTO: string

    @Column()
    ENDERECO: string

    @Column()
    BAIRRO: string

    @Column()
    CIDADE: string

    @Column()
    ESTADO: string

    @Column()
    TELEFONE: string

    @Column()
    TEL_COMERCIAL: string

    @Column()
    RAMAL: number

    @Column()
    EMAIL: string

    @Column()
    DEPARTAMENTO: string

    @Column()
    CARGO: string

    @Column({ type: 'date' })
    DATA_CADASTRO: string

    @Column({ type: 'date' })
    ULTIMO_PERIODO_FERIAS: string

    @Column()
    SALDO_FERIAS: number

}
