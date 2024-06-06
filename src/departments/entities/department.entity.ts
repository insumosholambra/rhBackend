import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('DEPARTAMENTOS')
export class Department {
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    DESCRICAO: string
}
