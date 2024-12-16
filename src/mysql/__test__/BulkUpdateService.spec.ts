import {PagerUtil} from '../util/PagerUtil'

describe('BulkUpdateService', () => {
  it('Pagination', () => {
    let pager = new PagerUtil(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(pager.getNumberOfPages()).toBe(3)
    expect(pager.hasNext()).toBe(true)
    expect(pager.next()).toEqual([1, 2, 3])
    expect(pager.hasNext()).toBe(true)
    expect(pager.next()).toEqual([4, 5, 6])
    expect(pager.hasNext()).toBe(true)
    expect(pager.next()).toEqual([7, 8, 9])

    expect(pager.hasNext()).toBe(false)

    // test with empty data
    pager = new PagerUtil(3, [])
    expect(pager.getNumberOfPages()).toBe(0)
    expect(pager.hasNext()).toBe(false)

    // test with invalid chunk size
    expect(() => new PagerUtil(0, [])).toThrowError(
      'Invalid chunk size - must be greater than 0',
    )

    // test with one page
    pager = new PagerUtil(3, [1, 2])
    expect(pager.getNumberOfPages()).toBe(1)
    expect(pager.hasNext()).toBe(true)
    expect(pager.next()).toEqual([1, 2])
    expect(pager.hasNext()).toBe(false)

    // test with uneven data
    pager = new PagerUtil(3, [1, 2, 3, 4, 5, 6, 7, 8])
    expect(pager.getNumberOfPages()).toBe(3)
    expect(pager.hasNext()).toBe(true)
    expect(pager.next()).toEqual([1, 2, 3])
    expect(pager.hasNext()).toBe(true)
    expect(pager.next()).toEqual([4, 5, 6])
    expect(pager.hasNext()).toBe(true)
    expect(pager.next()).toEqual([7, 8])
    expect(pager.hasNext()).toBe(false)
  })
})
