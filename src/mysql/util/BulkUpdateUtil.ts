const MAX_NUMBER_OF_RECORDS_IN_CHUNK = 40

/**
 * When we are updating a large number of records in a single transaction, we need to break it down into chunks
 * otherwise we might face issues like:
 * 1. transaction could fail if the number of allowed parameter length exceeds the limit configured in the database
 * 2. performance will be slow as having a large number of records in a single transaction will have adverse affect on performance
 *
 * IAfter performing some tests with survey with 50, 100, 500 and 1000+ questions, setting the maximum number of records in a chunk to 40
 * seems to be a good number and increasing it to 100 or higher took longer time to update the records and reducing the size did not have
 * any considerable performance improvement.
 *
 * https://github.com/typeorm/typeorm/issues/1115#issuecomment-348469601
 * chunk: is a workaround for performance
 */
const getNumberOfChunks = (numberOfRecords: number): number => {
  if (numberOfRecords <= MAX_NUMBER_OF_RECORDS_IN_CHUNK) {
    return 1
  }
  return (
    Math.floor(numberOfRecords / MAX_NUMBER_OF_RECORDS_IN_CHUNK) +
    (numberOfRecords % MAX_NUMBER_OF_RECORDS_IN_CHUNK > 0 ? 1 : 0)
  )
}

export const BulkUpdateUtil = {
  getNumberOfChunks,
}
