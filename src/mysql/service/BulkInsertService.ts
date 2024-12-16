import {ObjectLiteral, QueryRunner, Repository} from 'typeorm'
import {DEFAULT_CHUNK_SIZE} from '../constants/database.constants'
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity'
import {PagerUtil} from '../util/PagerUtil'

export class BulkInsertService<T extends ObjectLiteral> {
  constructor(private chunkSize = DEFAULT_CHUNK_SIZE) {}

  async bulkInsert(
    repository: Repository<T>,
    values: QueryDeepPartialEntity<T>[],
    queryRunner?: QueryRunner,
  ): Promise<void> {
    const pager = new PagerUtil<QueryDeepPartialEntity<T>>(
      this.chunkSize,
      values,
    )
    while (pager.hasNext()) {
      await repository
        .createQueryBuilder(undefined, queryRunner)
        .insert()
        .into(repository.target)
        .values(pager.next())
        .execute()
    }
  }
}
