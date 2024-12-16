import {getCommonTypeOrmConfiguration} from './DatabaseProvider'
import {DataSource} from 'typeorm'
import {Injectable, Logger, OnModuleDestroy, OnModuleInit} from '@nestjs/common'
import {DatabaseResultSourceEnum} from '@src/config/IDatabaseConfig'
import {EnvConfigService} from '@src/config/EnvConfigService'
import {EnvConfigUtil} from '@src/config/util/EnvConfigUtil'

@Injectable()
export class TransactionalDataSourceService
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger(TransactionalDataSourceService.name)
  private readonly resultDataSourceMap: Map<
    DatabaseResultSourceEnum,
    DataSource
  > = new Map<DatabaseResultSourceEnum, DataSource>()

  constructor() {}

  async onModuleInit(): Promise<void> {
    this.logger.debug(`Initializing Transactional Data Source...`)
    await this.init()
  }

  async getDataSourceObjectFor(
    resultSource: DatabaseResultSourceEnum,
  ): Promise<DataSource> {
    if (this.resultDataSourceMap.size === 0) {
      throw new Error('result data source is not initialized')
    }

    const dataSource = this.resultDataSourceMap.get(resultSource)
    if (!dataSource) {
      throw new Error(
        `result source is not initialized/registered ${resultSource}`,
      )
    }
    return dataSource
  }

  getTransactionalDataSourceEnumOrDefault(
    resultSource: string | undefined | null,
  ): DatabaseResultSourceEnum {
    if (!resultSource) {
      return this.getDefaultTransactionalDataSourceForDc()
    }
    const resultDataSource = Object.values(DatabaseResultSourceEnum).find(
      key => key === resultSource,
    )
    if (!resultDataSource) {
      throw new Error(`Invalid resultDataSource: ${resultSource}`)
    }
    return resultDataSource
  }

  private async init(): Promise<void> {
    const dataSourcesToInitialize = [
      DatabaseResultSourceEnum.ALT_1,
      DatabaseResultSourceEnum.ALT_2,
      DatabaseResultSourceEnum.RESULT_1,
      DatabaseResultSourceEnum.RESULT_2,
      DatabaseResultSourceEnum.RESULT_3,
      DatabaseResultSourceEnum.RESULT_4,
      DatabaseResultSourceEnum.RESULT_5,
      DatabaseResultSourceEnum.RESULT_6,
      DatabaseResultSourceEnum.RESULT_7,
      DatabaseResultSourceEnum.RESULT_8,
      DatabaseResultSourceEnum.RESULT_9,
      DatabaseResultSourceEnum.RESULT_10,
      DatabaseResultSourceEnum.RESULT_11,
      DatabaseResultSourceEnum.RESULT_12,
      DatabaseResultSourceEnum.RESULT_13,
      DatabaseResultSourceEnum.RESULT_14,
      DatabaseResultSourceEnum.RESULT_15,
      DatabaseResultSourceEnum.RESULT_16,
      DatabaseResultSourceEnum.RESULT_17,
      DatabaseResultSourceEnum.RESULT_18,
    ]

    const commonDatabaseConfig = getCommonTypeOrmConfiguration(
      '../../../**/*.trx.entity{.ts,.js}',
    )

    for (let i = 0; i < dataSourcesToInitialize.length; i++) {
      const databaseResultSource = dataSourcesToInitialize[i]

      const resultSourceConfig =
        EnvConfigService.getOrLoad().database[databaseResultSource]

      const resultDataSource = new DataSource({
        ...commonDatabaseConfig,
        ...resultSourceConfig,
      })

      await resultDataSource.initialize()
      this.resultDataSourceMap.set(dataSourcesToInitialize[i], resultDataSource)
    }
    this.logger.debug(`Initialized Transactional Data Sources`)
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.debug(`Destroying Transactional Data Source...`)

    if (this.resultDataSourceMap.size === 0) {
      return
    }

    for (const dataSource of this.resultDataSourceMap.values()) {
      if (dataSource.isInitialized) {
        await dataSource.destroy()
      }
    }
  }

  private getDefaultTransactionalDataSourceForDc(): DatabaseResultSourceEnum {
    const defaultDataSource = EnvConfigUtil.getStringValueOrThrow(
      'DATABASE_DEFAULT_DATA_SOURCE',
    )
    if (defaultDataSource === 'alt1') {
      return DatabaseResultSourceEnum.ALT_1
    }

    if (defaultDataSource === 'alt2') {
      return DatabaseResultSourceEnum.ALT_2
    }

    throw new Error(
      `Invalid default data source: ${defaultDataSource}, it must be either alt1 or alt2`,
    )
  }
}
