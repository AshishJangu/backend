import {BulkUpdateUtil} from '@modules/mysql/util/BulkUpdateUtil'
describe('BulkUpdateUtil', () => {
  it('should return 1 when number of records is less than or equal to  the maximum allowed records in a chunk i.e 40', () => {
    expect(BulkUpdateUtil.getNumberOfChunks(40)).toBe(1)
    expect(BulkUpdateUtil.getNumberOfChunks(29)).toBe(1)
  })

  it('should return number of chunks when the number of records exceed the maximum allowed records in a chunk', () => {
    expect(BulkUpdateUtil.getNumberOfChunks(41)).toBe(2)
    expect(BulkUpdateUtil.getNumberOfChunks(600)).toBe(15)
    expect(BulkUpdateUtil.getNumberOfChunks(1015)).toBe(26)
  })
})
