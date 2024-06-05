import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('CARGOS')
export class Role {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    DESCRICAO: string
}
