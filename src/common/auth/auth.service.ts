import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Manager } from 'features/manager/manager.entity';
import { isNil, not, equals } from 'ramda';
import { NO_THIS_USER, PASSWORD_IS_WRONG } from '../errorcode.const';
import * as jwt from 'jsonwebtoken';
import { log } from 'util';
import { SECRET_KEY } from 'config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    return {};
  }

  async login(userName, passWord): Promise<any> {
    // 下面是三男中数据库读写的处理方式， 第一二中方法对应需要entity中 extends baseEntity, 第三种采用更为灵活的方式.
    // No.1 with Base
    // return Manager.findOne({username: data.username});
    // No.2
    // return Manager.createQueryBuilder('manager').where('manager.username = :username', {username: data.username}).getRawOne();
    // throw new HttpException(NOT_LOGIN, HttpStatus.NOT_FOUND);
    // No.3
    // return await getConnection()
    // .createQueryBuilder(Manager, 'manager')
    // .where('manager.username = :username', {username: data.username})
    // .getOne();
    // 这里应该对用户名，密码进行判断，对不同的结果给不同的报错信息提示
    log(passWord);
    const m = await Manager.findOne({
      relations: ['group'],
      where: { username: userName },
    });
    this.isNotHaveThisUser(m);
    this.isPasswordWrong(m.password, passWord);
    const t = this.getToken(m);
    return {
      token: t,
      name: m.username,
      nodes: m.group.nodekeys,
    };
  }

  private isNotHaveThisUser(m) {
    if (isNil(m)) {
      throw new HttpException(NO_THIS_USER, HttpStatus.BAD_REQUEST);
    }
  }

  private isPasswordWrong(m, i) {
    if (not(equals(m, i))) {
      throw new HttpException(PASSWORD_IS_WRONG, HttpStatus.BAD_REQUEST);
    }
  }

  private getToken(m) {
    const data = {
      id: m.id,
      name: m.name,
    };
    return jwt.sign(data, SECRET_KEY, { expiresIn: 7200 });
  }
}
