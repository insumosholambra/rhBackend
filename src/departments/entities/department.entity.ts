import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('DEPARTAMENTOS')
export class Department {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'nvarchar', length: 255 })
  DESCRICAO: string;

  @OneToMany(() => User, user => user.DEPARTAMENTO)
  users: User[];
}
