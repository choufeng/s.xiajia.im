import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from 'common/logger';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  const options = new DocumentBuilder()
    .setTitle('BSF Example')
    .setDescription('在线文档')
    .setVersion('1.0.0 beta')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs_xj', app, document);
  app.enableCors();
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }));
  await app.listen(3000);
}
bootstrap();
