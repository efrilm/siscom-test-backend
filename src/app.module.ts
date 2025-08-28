import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceConfig } from './config/database.config';
import { CategoryModule } from './module/category/category.module';
import { ItemModule } from './module/item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDataSourceConfig,
      inject: [ConfigService],
    }),
    CategoryModule,
    ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
