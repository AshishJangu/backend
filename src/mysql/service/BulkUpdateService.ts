import {ObjectLiteral, QueryRunner, Repository} from 'typeorm'
import {ColumnMetadata} from 'typeorm/metadata/ColumnMetadata'
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity'
import {DEFAULT_CHUNK_SIZE} from '../constants/database.constants'
import {PagerUtil} from '../util/PagerUtil'

export class BulkUpdateService<T extends ObjectLiteral> {
  constructor(private chunkSize = DEFAULT_CHUNK_SIZE) {}

  async bulkUpdate(
    repository: Repository<T>,
    columnMetadata: ColumnMetadata[],
    values: QueryDeepPartialEntity<T>[],
    conflictTarget: string[],
    alias?: string,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    const pager = new PagerUtil(this.chunkSize, values)
    while (pager.hasNext()) {
      const chunk = pager.next()

      await repository
        .createQueryBuilder(alias, queryRunner)
        .insert()
        .into(repository.target)
        .values(chunk)
        .orUpdate(this.getColumnNames(columnMetadata), conflictTarget)
        .updateEntity(false)
        .execute()
      /**
       * updateEntity(false)  - this is important as typeorm increments primary key value even when we explicitly set it while updating, on the entity object
       *  (actual row in  mysql data is not affected). Also, the default behaviour of typeorm is to return InsertResult which fires a select query after updating the records
       *  and setting this to false will help with performance as well as an additional select query is not fired.
       * */
    }
  }

  getColumnNames(columnMetadata: ColumnMetadata[]): string[] {
    const columns = columnMetadata.map(column => column.databaseName)
    return columns
  }
}
