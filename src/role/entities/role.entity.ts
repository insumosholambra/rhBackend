import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('CARGOS')
export class Role {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'nvarchar', length: 255 })
  DESCRICAO: string;

  @OneToMany(() => User, user => user.CARGO)
  users: User[];
}
