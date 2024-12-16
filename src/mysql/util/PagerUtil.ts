export class PagerUtil<T> {
  private paginatedData: T[][] = []
  private numberOfPages = 0
  private currentPage = 0

  constructor(private chunkSize: number, private data: T[]) {
    if (chunkSize <= 0) {
      throw new Error('Invalid chunk size - must be greater than 0')
    }
    this.numberOfPages = this.computeNumberOfPages()
    this.paginateData(chunkSize, data)
  }

  hasNext(): boolean {
    return this.currentPage < this.numberOfPages
  }

  next(): T[] {
    if (!this.hasNext()) {
      throw new Error('No more pages')
    }
    return this.paginatedData[this.currentPage++]
  }

  getNumberOfPages(): number {
    return this.numberOfPages
  }

  private paginateData(chunkSize: number, data: T[]): void {
    if (data.length === 0) {
      return
    }
    for (let i = 0; i < this.numberOfPages; i++) {
      this.paginatedData.push(data.slice(i * chunkSize, (i + 1) * chunkSize))
    }
  }

  private computeNumberOfPages(): number {
    return Math.ceil(this.data.length / this.chunkSize)
  }
}
