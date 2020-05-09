import { BUSINESSES_GUI } from '../config/gui.config';
import {
  BUSINESS_INFO,
  UPGRADE_MULTIPLIER,
  ACQUIRING_MULTIPLIER
} from '../config/business.config';

import { BusinessOperations } from '../interfaces/BusinessOperations.interface';

interface GraphicStats {
  name: Phaser.GameObjects.Text;
  profit: Phaser.GameObjects.Text;
  interval: Phaser.GameObjects.Text;
  price: Phaser.GameObjects.Text;
  progress: Phaser.GameObjects.Graphics;
}

const {
  leftSideBusinessX,
  rightSideBusinessX,
  firstRowBusinessY,
  statsOffsetX,
  statsOffsetY,
  progressBarHeight,
  progressBarWidth,
  businessesGap
} = BUSINESSES_GUI;

export class BaseBusiness implements BusinessOperations {
  protected _logo: Phaser.GameObjects.Image;
  protected _positionX: number;
  protected _positionY: number;
  protected _graphicStats: GraphicStats;
  protected _name: string;
  protected _price: number;
  protected _profit: number;
  protected _interval: number;
  protected businessValueFactor: number;

  protected acquired = false;
  protected running = false;
  protected startTime: number;
  protected endTime: number;

  get positionX(): number {
    return this._positionX;
  }

  get positionY(): number {
    return this._positionY;
  }

  get logo(): Phaser.GameObjects.Image {
    return this._logo;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get profit(): number {
    return this._profit;
  }

  get interval(): number {
    return this._interval;
  }

  set graphicStats(stats: GraphicStats) {
    this._graphicStats = stats;
  }

  constructor(
    name: string,
    price: number,
    profit: number,
    interval: number,
    logo: Phaser.GameObjects.Image,
    businessValueFactor: number
  ) {
    this._name = name;
    this._logo = logo;
    this._price = price;
    this._profit = profit;
    this._interval = interval;
    this.businessValueFactor = businessValueFactor;
    this.calculateUIPosition();
  }

  buy(totalMoney: number): number {
    if (totalMoney >= this.price) {
      const remainingMoney = totalMoney - this._price;

      this._price = this._price * ACQUIRING_MULTIPLIER;
      this.acquired = true;
      this.logo.alpha = 1;

      return remainingMoney;
    }
  }

  upgrade(totalMoney: number): number {
    console.log('upgrade' + this.name);

    return 0;
  }

  hireManager(totalMoney: number): number {
    console.log('hireManager' + this.name);

    return 0;
  }

  update(): void {
    if (this.running) {
      this.calculateProgress();
    } else {
      this._graphicStats.progress.clear();
    }
  }

  async produce(totalMoney: number): Promise<number> {
    if (!this.acquired) { return; }

    if (this.running) { return; }

    this.running = true;
    this.startTime = new Date().getTime();
    this.endTime = this.startTime + this.interval;

    return new Promise((resolve) => {
      setTimeout(() => {
        this.running = false;
        this.startTime = 0;
        this.endTime = 0;

        resolve(totalMoney + this.profit);
      }, this.interval);
    });
  }

  private calculateUIPosition(): void {
    const businessColumnSize = BUSINESS_INFO.length / 2;
    this._positionX = this.businessValueFactor < businessColumnSize ?
      leftSideBusinessX :
      rightSideBusinessX;

    this._positionY = this.businessValueFactor < businessColumnSize ?
      (this.businessValueFactor) * businessesGap + firstRowBusinessY :
      (this.businessValueFactor % businessColumnSize ) * businessesGap + firstRowBusinessY;
  }

  private calculateProgress(): void {
    const currentTime = this.endTime - new Date().getTime();
    const progressFraction = (this.interval - currentTime) / this.interval;

    this._graphicStats.progress.clear();
    this._graphicStats.progress.fillRect(
      this.positionX + statsOffsetX,
      this.positionY - statsOffsetY,
      progressBarWidth * progressFraction,
      progressBarHeight
    );
  }
}
