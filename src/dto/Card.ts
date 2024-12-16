import { CARD_TYPE } from 'src/enum/CardTypeEnum';

export class Card {
  cardNumber: string;
  expirationMonth: number;
  expirationYear: number;
  cvv: string;
  cardholderName: string;
  type: CARD_TYPE;

  constructor(
    cardNumber: string,
    expirationMonth: number,
    expirationYear: number,
    cvv: string,
    cardholderName: string,
    type: CARD_TYPE,
  ) {
    this.cardNumber = cardNumber;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
    this.cvv = cvv;
    this.cardholderName = cardholderName;
    this.type = type;
  }
}
