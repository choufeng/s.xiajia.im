import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { AuthModule } from 'common/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), AuthModule],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
