import {validate} from 'class-validator'
import {BeforeInsert, BeforeUpdate} from 'typeorm'

export class BaseEntity {
  @BeforeUpdate()
  validateBeforeUpdate(): void {
    validate(this)
  }
  @BeforeInsert()
  validateBeforeInsert(): void {
    validate(this)
  }
}
