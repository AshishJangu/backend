import { Card } from 'src/dto/Card';
import { CardValidator } from './CardValidator';

export class CreditCardValidator implements CardValidator {
  validate(dto: Card): boolean {
    if (!this.validateCardNumber(dto.cardNumber)) return false;
    if (!this.validateExpirationDate(dto.expirationMonth, dto.expirationYear))
      return false;
    if (!this.validateCVV(dto.cvv)) return false;
    if (!this.validateCardholderName(dto.cardholderName)) return false;
    return true;
  }

  private validateCardNumber(cardNumber: string): boolean {
    // Implement card number validation logic here (e.g. Luhn algorithm)
    // For simplicity, let's just check if it's a 16-digit number
    return /^\d{16}$/.test(cardNumber);
  }

  private validateExpirationDate(month: number, year: number): boolean {
    // Implement expiration date validation logic here (e.g. check if it's in the future)
    // For simplicity, let's just check if the month is between 1 and 12 and the year is a 4-digit number
    return month >= 1 && month <= 12 && /^\d{4}$/.test(year.toString());
  }

  private validateCVV(cvv: string): boolean {
    // Implement CVV validation logic here (e.g. check if it's a 3- or 4-digit number)
    // For simplicity, let's just check if it's a 3- or 4-digit number
    return /^\d{3,4}$/.test(cvv);
  }

  private validateCardholderName(name: string): boolean {
    // Implement cardholder name validation logic here (e.g. check if it's a string with at least 2 characters)
    // For simplicity, let's just check if it's a non-empty string
    return name.trim() !== '';
  }
}
