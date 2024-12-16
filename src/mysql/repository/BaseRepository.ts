import {ObjectLiteral, QueryRunner, Repository} from 'typeorm'
import {BulkInsertService} from '../service/BulkInsertService'
import {BulkUpdateService} from '../service/BulkUpdateService'

export class BaseRepository<T extends ObjectLiteral> {
  constructor(private repository: Repository<T>) {}

  static CONFLICT_RESOLUTION_BY_ID = ['id']

  async bulkInsertWithOutCascade(
    entities: T[],
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (entities.length === 0) {
      return
    }
    const bulkInsertService = new BulkInsertService<T>()
    await bulkInsertService.bulkInsert(this.repository, entities, queryRunner)
  }

  async bulkUpdateWithOutCascade(
    entities: T[],
    conflictTarget: string[],
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (entities.length === 0) {
      return
    }

    const columnsMetadata = this.repository.metadata.columns
    await new BulkUpdateService<T>().bulkUpdate(
      this.repository,
      columnsMetadata,
      entities,
      conflictTarget,
      undefined,
      queryRunner,
    )
  }

  getQueryRunner(): QueryRunner {
    return this.repository.manager.connection.createQueryRunner()
  }
}
