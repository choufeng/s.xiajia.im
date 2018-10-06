import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { log } from 'util';
import { CryptoService } from './crypto.service';
@Injectable()
export class EncodePasswordPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    const cy = new CryptoService();
    return cy.encrypto(value);
  }
}
