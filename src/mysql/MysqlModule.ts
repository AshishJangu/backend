import { Module } from '@nestjs/common';
import { databaseProviders } from './domain/providers/DatabaseProvider';
import { TransactionalDataSourceService } from './domain/providers/TransactionalDataSourceService';
import { globalDatabaseProvider } from './domain/providers/GlobalDataSourceProvider';

@Module({
  imports: [],
  providers: [
    ...databaseProviders,
    ...globalDatabaseProvider,
    TransactionalDataSourceService,
  ],
  exports: [
    ...databaseProviders,
    ...globalDatabaseProvider,
    TransactionalDataSourceService,
  ],
})
export class MysqlModule {}
