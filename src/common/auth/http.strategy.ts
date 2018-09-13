import { Strategy } from 'passport-http-bearer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ManagerService } from 'features/manager/manager.service';
import { NO_THIS_USER } from '../errorcode.const';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly managerService: ManagerService) {
    super();
  }

  async validate(token: any) {
    const user = await this.managerService.findOneByToken(token);
    if (!user) {
      throw new HttpException(NO_THIS_USER, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
