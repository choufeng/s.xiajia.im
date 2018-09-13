import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  root(@Body() data): Promise<any> {
    return this.service.login(data);
  }
}
