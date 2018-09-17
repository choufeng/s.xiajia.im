import { Injectable } from '@nestjs/common';
import { log } from 'util';
import * as Crypto from 'crypto';
import { SECRET_KEY } from 'config';

@Injectable()
export class CryptoService {
  createKey() {
    const crypto = Crypto.randomBytes(32);
    return crypto.toString('hex');
  }

  hmacCode(text) {
    return Crypto.createHmac('sha256', SECRET_KEY);
  }

  encrypto(text) {
    const c = Crypto.createCipher('aes192', SECRET_KEY);
    const d = c.update(text, 'utf8', 'hex');
    const e = d + c.final('hex');
    return e;
  }

  decrypto(code) {
    const c = Crypto.createDecipher('aes192', SECRET_KEY);
    const d = c.update(code, 'hex', 'utf8');
    const e = d + c.final('utf8');
    return e;
  }
}