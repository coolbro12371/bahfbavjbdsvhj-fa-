import { BUSINESSES_GUI } from '../config/gui.config';
import { BUSINESS_INFO } from '../config/business.config';

export class BaseBusiness {
  protected price: number;
  protected profit: number;
  protected interval: number;
  protected _logo: string;
  protected businessValueFactor: number;

  protected _positionX: number;
  protected _positionY: number;

  get positionX(): number {
    return this._positionX;
  }

  get positionY(): number {
    return this._positionY;
  }

  get logo(): string {
    return this._logo;
  }

  constructor(
    price: number,
    profit: number,
    interval: number,
    logo: string,
    businessValueFactor: number
  ) {
    this.price = price;
    this.profit = profit;
    this.interval = interval;
    this._logo = logo;
    this.businessValueFactor = businessValueFactor;
    this.calculateUIPosition();
  }

  private calculateUIPosition(): void {
    const businessColumnSize = BUSINESS_INFO.length / 2;
    this._positionX = this.businessValueFactor < businessColumnSize ?
      BUSINESSES_GUI.leftSideBusinessX :
      BUSINESSES_GUI.rightSideBusinessX;

    this._positionY = this.businessValueFactor < businessColumnSize ?
      (this.businessValueFactor) * BUSINESSES_GUI.businessesGap + BUSINESSES_GUI.firstRowBusinessY :
      (this.businessValueFactor % businessColumnSize ) * BUSINESSES_GUI.businessesGap + BUSINESSES_GUI.firstRowBusinessY;
  }
}
