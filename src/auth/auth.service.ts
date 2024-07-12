import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(ID: number, PASSWORD: string) {
    const user = await this.usersService.findOne(ID);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    if (user.PASSWORD !== PASSWORD) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: user.ID,
      username: user.NOME,
      subname: user.SOBRENOME,
      cargo: user.CARGO,
      departamento: user.DEPARTAMENTO,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '60s', // Token expiration time
    });

    return {
      id: user.ID,
      username: user.NOME,
      subname: user.SOBRENOME,
      cargo: user.CARGO,
      departamento: user.DEPARTAMENTO,
      access_token,
    };
  }

  async validateToken(token: string): Promise<boolean> {
    // Ensure the token is a string
    if (!token || typeof token !== 'string') {
      console.error('Invalid token format:', token);
      return false;
    }
  
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log('Decoded token:', decoded);
  
      if (decoded && 'exp' in decoded) {
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime; // Check if the token is not expired
      }
  
      return false; // Token is valid but does not contain expiration
    } catch (error) {
      console.error('Token validation error:', error);
      return false; // Token is invalid or expired
    }
  }
  
}
