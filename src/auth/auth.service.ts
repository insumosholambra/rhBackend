import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService
  ) { }


  async signIn(ID: number, PASSWORD: string) {
    const user = await this.usersService.findOne(ID);
    console.log(user);
    
    if(user){
      Error('Erro, usuário não encontrado!')
    }

    if(user.PASSWORD === PASSWORD){
      const payload = { id: user.ID, username: user.NOME, subname: user.SOBRENOME, cargo: user.CARGO, departamento: user.DEPARTAMENTO };
      console.log(payload);
      
      return {
        id: user.ID, username: user.NOME, subname: user.SOBRENOME, cargo: user.CARGO, departamento: user.DEPARTAMENTO,
        access_token: await this.jwtService.signAsync(payload),
      };
      
    }
  }
}