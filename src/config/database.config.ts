import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppDataSource } from 'src/database/data-source';

export const getDataSourceConfig = (): TypeOrmModuleOptions => ({
  ...AppDataSource.options,
  autoLoadEntities: true,
});
