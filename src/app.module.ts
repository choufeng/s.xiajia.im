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
import { CategoryModule } from 'features/category/category.module';
import { CategoryController } from 'features/category/category.controller';
import { CategoryService } from 'features/category/category.service';
import { ArticleModule } from 'features/article/article.module';
import { ArticleController } from 'features/article/article.controller';
import { ArticleService } from 'features/article/article.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PhotoModule,
    AuthModule,
    NodeModule,
    GroupModule,
    MenuModule,
    ManagerModule,
    CategoryModule,
    ArticleModule,
  ],
  controllers: [
    AppController,
    PhotoController,
    NodeController,
    GroupController,
    MenuController,
    ManagerController,
    CategoryController,
    ArticleController,
  ],
  providers: [
    AppService,
    PhotoService,
    NodeService,
    GroupService,
    MenuService,
    ManagerService,
    CategoryService,
    ArticleService,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
