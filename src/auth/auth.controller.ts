import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

//   @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body) {   
    return this.authService.signIn(body.ID, body.PASSWORD);
  }

  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validate(@Body() body: { token: string }) {
    const isValid = await this.authService.validateToken(body.token); // Extracting the token
    return { valid: isValid }; // Return a response indicating validity
  }
}