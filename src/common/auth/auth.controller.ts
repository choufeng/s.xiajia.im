import { Controller, Get, Body, Post, Query} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EncodePasswordPipe } from './encode-password.pipe';
import { log } from 'util';
import { CryptoService } from './crypto.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService, private readonly cryptos: CryptoService) {}
  @Get('/key')
  getKey() {
    return this.cryptos.createKey();
  }
  @Get('/encrypto')
  encrypto(@Query('t') text: string): string {
    return this.cryptos.encrypto(text);
  }
  @Get('/decrypto')
  decrypto(@Query('t') text: string): string {
    return this.cryptos.decrypto(text);
  }
  @Post()
  root(@Body('username') username, @Body('password', new EncodePasswordPipe()) passwrod): Promise<any> {
    return this.service.login(username, passwrod);
  }
}
