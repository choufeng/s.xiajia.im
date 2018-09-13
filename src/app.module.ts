import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  PhotoController,
  PhotoModule,
  PhotoService,
} from './features/photo/index';
import { AuthModule } from 'common/auth/auth.module';
import { NodeController } from 'features/node/node.controller';
import { NodeService } from 'features/node/node.service';
import { NodeModule } from 'features/node/node.module';
import { GroupModule } from 'features/group/group.module';
import { GroupController } from 'features/group/group.controller';
import { GroupService } from 'features/group/group.service';
import { MenuModule } from 'features/menu/menu.module';
import { MenuController } from 'features/menu/menu.controller';
import { MenuService } from 'features/menu/menu.service';
import { ManagerModule } from 'features/manager/manager.module';
import { ManagerController } from 'features/manager/manager.controller';
import { ManagerService } from 'features/manager/manager.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PhotoModule,
    AuthModule,
    NodeModule,
    GroupModule,
    MenuModule,
    ManagerModule,
  ],
  controllers: [
    AppController,
    PhotoController,
    NodeController,
    GroupController,
    MenuController,
    ManagerController,
  ],
  providers: [
    AppService,
    PhotoService,
    NodeService,
    GroupService,
    MenuService,
    ManagerService,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
