import {DEFAULT_DATA_SOURCE} from '@modules/mysql/constants/database.constants'
import {IMysqlConfiguration} from '@modules/mysql/type/IMysqlConfiguration'
import {EnvConfigService} from '@src/config/EnvConfigService'
import {EnvConfigUtil} from '@src/config/util/EnvConfigUtil'
import * as path from 'path'
import {DataSource} from 'typeorm'

export const defaultConnectionConfig: IMysqlConfiguration = {
  type: 'mysql',
  charset: 'UTF8MB4_UNICODE_CI',
  extra: {
    connectionLimit: 30,
    queueLimit: 10,
  },
  autoLoadEntities: true,
}

export const databaseProviders = [
  {
    provide: DEFAULT_DATA_SOURCE,
    useFactory: async (): Promise<DataSource> => {
      const commonDatabaseConfig = getCommonTypeOrmConfiguration(
        '../../../**/*.entity{.ts,.js}',
      )

      const {default: nonTransactionalDatabaseConfig} =
        EnvConfigService.getOrLoad().database

      const dataSource = new DataSource({
        ...commonDatabaseConfig,
        ...nonTransactionalDatabaseConfig,
      })

      return dataSource.initialize()
    },
  },
]

export const getCommonTypeOrmConfiguration = (
  entitiesPath: string,
): IMysqlConfiguration => {
  const typeOrmDatabaseConfig = {
    ...defaultConnectionConfig,
    entities: [path.join(__dirname, entitiesPath)],
  }

  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.isTestMigrationsEnabled === true &&
    EnvConfigUtil.isTestEnvironment()
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    typeOrmDatabaseConfig.synchronize = true
  }
  return typeOrmDatabaseConfig
}
