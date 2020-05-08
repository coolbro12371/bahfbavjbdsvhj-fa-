import { BUSINESSES_GUI } from '../config/gui.config';
import { BUSINESS_INFO } from '../config/business.config';

interface GraphicStats {
  name: Phaser.GameObjects.Text;
  profit: Phaser.GameObjects.Text;
  interval: Phaser.GameObjects.Text;
  level: Phaser.GameObjects.Text;
  price: Phaser.GameObjects.Text;
  alert: Phaser.GameObjects.Text;
  progress: Phaser.GameObjects.Line;
}

export class BaseBusiness {
  protected _logo: string;
  protected _positionX: number;
  protected _positionY: number;
  protected _graphicStats: GraphicStats;
  protected _name: string;

  protected price: number;
  protected profit: number;
  protected interval: number;
  protected businessValueFactor: number;

  get positionX(): number {
    return this._positionX;
  }

  get positionY(): number {
    return this._positionY;
  }

  get logo(): string {
    return this._logo;
  }

  get name(): string {
    return this._name;
  }

  set graphicStats(stats: GraphicStats) {
    this._graphicStats = stats;
  }

  constructor(
    name: string,
    price: number,
    profit: number,
    interval: number,
    logo: string,
    businessValueFactor: number
  ) {
    this._name = name;
    this._logo = logo;
    this.price = price;
    this.profit = profit;
    this.interval = interval;
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
