import { BUSINESSES_GUI } from '../config/gui.config';
import {
  BUSINESS_INFO,
  UPGRADE_PROFIT_MULTIPLIER,
  UPGRADE_PRICE_MULTIPLIER,
  ACQUIRING_MULTIPLIER
} from '../config/business.config';

import { BusinessOperations } from '../interfaces/BusinessOperations.interface';
import { GraphicStats } from '../interfaces/common.interface';

const {
  leftSideBusinessX,
  rightSideBusinessX,
  firstRowBusinessY,
  statsOffsetX,
  statsOffsetY,
  progressBarHeight,
  progressBarWidth,
  businessesGap,
  logoDefaultAlpha
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
  protected _numberOfBranches: number;

  protected businessValueFactor: number;
  protected startTime: number;
  protected endTime: number;
  protected totalMoney: number;
  protected acquired: boolean;
  protected running: boolean;
  protected managerHired: boolean;
  protected managerPrice: number;
  protected upgradePrice: number;

  protected totalMoneyEmitter: Phaser.Events.EventEmitter;

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

  get numberOfBranches(): number {
    return this._numberOfBranches;
  }

  set graphicStats(stats: GraphicStats) {
    this._graphicStats = stats;
  }

  constructor(
    name: string,
    price: number,
    profit: number,
    interval: number,
    managerPrice: number,
    upgradePrice: number,
    logo: Phaser.GameObjects.Image,
    businessValueFactor: number,
    totalMoneyEmitter: Phaser.Events.EventEmitter
  ) {
    this._name = name;
    this._logo = logo;
    this._price = price;
    this._profit = profit;
    this._interval = interval;
    this._numberOfBranches = 0;
    this.businessValueFactor = businessValueFactor;
    this.managerPrice = managerPrice;
    this.upgradePrice = upgradePrice;
    this.acquired = false;
    this.running = false;
    this.managerHired = false;
    this.totalMoneyEmitter = totalMoneyEmitter;

    this.calculateUIPosition();
  }

  update(totalMoney: number): void {
    this.totalMoney = totalMoney;

    if (this.running) {
      this.calculateProgress();
    } else {
      this._graphicStats.progress.clear();
    }

    this.updateGraphicStats();

    if (this.managerHired) {
      this.produce();
    }
  }

  acquire(): void {
    if (this.totalMoney < this.price) { return; }

    const remainingMoney = this.totalMoney - this._price;

    this._numberOfBranches += 1;
    this._price = Math.round(this._price * ACQUIRING_MULTIPLIER * 100) / 100;
    this.acquired = true;

    this.emitTotalMoney(remainingMoney);
  }

  upgrade(): void {
    if (this.totalMoney < this.upgradePrice) { return; }

    const remainingMoney = this.totalMoney - this.upgradePrice;

    this.upgradePrice = Math.round(this.upgradePrice * UPGRADE_PRICE_MULTIPLIER * 100) / 100;
    this._profit = Math.round(this._profit * UPGRADE_PROFIT_MULTIPLIER * 100) / 100;

    this.emitTotalMoney(remainingMoney);
  }

  hireManager(): void {
    if (
      this.totalMoney < this.managerPrice ||
      this.managerHired
    ) { return; }

    this.managerHired = true;

    this.emitTotalMoney(this.totalMoney - this.managerPrice);
  }

  produce(): number {
    if (!this.acquired) { return; }

    if (this.running) { return; }

    this.running = true;
    this.startTime = new Date().getTime();
    this.endTime = this.startTime + this._interval;

    setTimeout(() => {
      this.running = false;
      this.startTime = 0;
      this.endTime = 0;

      this.emitTotalMoney(this.totalMoney + this._profit * this._numberOfBranches);
    }, this._interval);
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

  private updateGraphicStats(): void {
    this._logo.alpha = this.totalMoney >= this._price ? 1 : logoDefaultAlpha;

    this._graphicStats.price.text = `Price: ${this._price}`;
    this._graphicStats.numberOfBranches.text = `No of branches: ${this._numberOfBranches}`;
    this._graphicStats.profit.text = `Profit: ${this._profit * this._numberOfBranches}`;
  }

  private emitTotalMoney(money: number): void {
    this.totalMoneyEmitter.emit('totalMoneyUpdated', money);
  }
}
