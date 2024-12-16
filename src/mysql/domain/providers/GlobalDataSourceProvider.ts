import {getCommonTypeOrmConfiguration} from './DatabaseProvider'
import {GLOBAL_DATA_SOURCE} from '@modules/mysql/constants/database.constants'
import {DataSource} from 'typeorm'
import {EnvConfigService} from '@src/config/EnvConfigService'

export const globalDatabaseProvider = [
  {
    provide: GLOBAL_DATA_SOURCE,
    useFactory: async (): Promise<DataSource> => {
      const commonDatabaseConfig = getCommonTypeOrmConfiguration(
        '../../../**/*.global.entity{.ts,.js}',
      )
      const {global: globalDatabaseConfig} =
        EnvConfigService.getOrLoad().database

      const dataSource = new DataSource({
        ...commonDatabaseConfig,
        ...globalDatabaseConfig,
      })

      return dataSource.initialize()
    },
  },
]
