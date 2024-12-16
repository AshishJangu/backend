import { Card } from 'src/dto/Card';

export interface CardValidator {
  validate(card: Card): boolean;
}
