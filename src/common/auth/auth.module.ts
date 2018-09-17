import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { CryptoService } from './crypto.service';
import { SECRET_KEY } from 'config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: SECRET_KEY,
      signOptions: {
        expiresIn: 7200,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CryptoService],
})
export class AuthModule {}
