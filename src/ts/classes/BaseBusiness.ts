import { BUSINESSES_GUI } from '../config/gui.config';
import {
  BUSINESS_INFO,
  UPGRADE_PROFIT_MULTIPLIER,
  UPGRADE_PRICE_MULTIPLIER,
  ACQUIRING_MULTIPLIER
} from '../config/business.config';

import { BusinessOperations } from '../interfaces/BusinessOperations.interface';
import { GraphicOperations, GraphicStats } from '../interfaces/common.interface';

const {
  leftSideBusinessX,
  rightSideBusinessX,
  firstRowBusinessY,
  statsOffsetX,
  statsOffsetY,
  progressBarHeight,
  progressBarWidth,
  businessesGap,
  logoDefaultAlpha,
  operationDefaultAlpha
} = BUSINESSES_GUI;

export class BaseBusiness implements BusinessOperations {
  protected _positionX: number;
  protected _positionY: number;
  protected _name: string;
  protected _price: number;
  protected _profit: number;
  protected _interval: number;
  protected _numberOfBranches: number;
  protected _managerHired: boolean;
  protected _running: boolean;
  protected _upgradePrice: number;
  protected _startTime: number;
  protected _endTime: number;
  protected _acquired: boolean;
  protected _managerPrice: number;

  protected _graphicStats: GraphicStats;
  protected _logo: Phaser.GameObjects.Image;
  protected _graphicOperations: GraphicOperations;

  protected businessValueFactor: number;
  protected totalMoney: number;

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

  get interval(): number {
    return this._interval;
  }

  get managerPrice(): number {
    return this._managerPrice;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get profit(): number {
    return this._profit;
  }

  set profit(profit: number) {
    this._profit = profit;
  }

  get upgradePrice(): number {
    return this._upgradePrice;
  }

  set upgradePrice(upgradePrice: number) {
    this._upgradePrice = upgradePrice;
  }

  get numberOfBranches(): number {
    return this._numberOfBranches;
  }

  set numberOfBranches(numberOfBranches: number) {
    this._numberOfBranches = numberOfBranches;
  }

  get managerHired(): boolean {
    return this._managerHired;
  }

  set managerHired(managerHired: boolean) {
    this._managerHired = managerHired;
  }

  get acquired(): boolean {
    return this._acquired;
  }

  set acquired(acquired: boolean) {
    this._acquired = acquired;
  }

  get startTime(): number {
    return this._startTime;
  }

  set startTime(startTime: number) {
    this._startTime = startTime;
  }

  get endTime(): number {
    return this._endTime;
  }

  set endTime(endTime: number) {
    this._endTime = endTime;
  }

  set graphicStats(stats: GraphicStats) {
    this._graphicStats = stats;
  }

  set graphicOperations(graphicOperations: GraphicOperations) {
    this._graphicOperations = graphicOperations;
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
    this._managerHired = false;
    this._running = false;
    this._upgradePrice = upgradePrice;
    this._acquired = false;
    this.businessValueFactor = businessValueFactor;
    this._managerPrice = managerPrice;
    this.totalMoneyEmitter = totalMoneyEmitter;

    this.calculateUIPosition();
  }

  update(totalMoney: number): void {
    this.totalMoney = totalMoney;

    if (this._managerHired) {
      this.produce(this.calculateProgress());
    }

    if (this._running) {
      this.displayProgress(this.calculateProgress());
    } else {
      this._graphicStats.progress.clear();
    }

    this.updateGraphicStats();
    this.updateGraphicOperations();
  }

  acquire(): void {
    if (this.totalMoney < this.price) { return; }

    const remainingMoney = this.totalMoney - this._price;

    this._numberOfBranches += 1;
    this._price = Math.round(this._price * ACQUIRING_MULTIPLIER * 100) / 100;
    this._acquired = true;
    this._graphicOperations.acquireActive.alpha = 1;

    this.emitTotalMoney(remainingMoney);
  }

  upgrade(): void {
    if (this.totalMoney < this._upgradePrice) { return; }

    const remainingMoney = this.totalMoney - this._upgradePrice;

    this._upgradePrice = Math.round(this._upgradePrice * UPGRADE_PRICE_MULTIPLIER * 100) / 100;
    this._profit = Math.round(this._profit * UPGRADE_PROFIT_MULTIPLIER * 100) / 100;
    this._graphicOperations.upgradeActive.alpha = 1;

    this.emitTotalMoney(remainingMoney);
  }

  hireManager(): void {
    if (
      this.totalMoney < this._managerPrice ||
      this._managerHired
    ) { return; }

    this._managerHired = true;
    this._graphicOperations.hireManagerActive.alpha = 1;

    this.emitTotalMoney(this.totalMoney - this._managerPrice);
  }

  produce(progressFraction: number): void {
    if (!this._acquired) { return; }

    if (this._running) { return; }

    this._running = true;
    this._startTime = new Date().getTime();
    this._endTime = this._startTime + this._interval;

    setTimeout(() => {
      this._running = false;
      this._startTime = 0;
      this._endTime = 0;

      this.emitTotalMoney(this.totalMoney + this._profit * this._numberOfBranches);
    }, this._interval * progressFraction);
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

  private calculateProgress(): number {
    let currentProgress;
    const timeDifference = this._endTime - new Date().getTime();

    if (timeDifference < 0) {
      currentProgress = (new Date().getTime() - this._endTime) % this._interval;
      this._endTime = new Date().getTime() + (this._interval - currentProgress);
    } else {
      currentProgress = timeDifference;
    }

    return (this.interval - currentProgress) / this.interval;
  }

  private displayProgress(progressFraction: number): void {
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
    this._graphicStats.upgradePrice.text = `Upgrade price: ${this._upgradePrice}`;
    this._graphicStats.managerPrice.text = `Manager price: ${this._managerPrice}`;
  }

  private emitTotalMoney(money: number): void {
    this.totalMoneyEmitter.emit('totalMoneyUpdated', money);
  }

  private updateGraphicOperations(): void {
    this._graphicOperations.acquire.alpha = this.totalMoney >= this._price ? 1 : operationDefaultAlpha;
    this._graphicOperations.upgrade.alpha = this.totalMoney >= this._upgradePrice ? 1 : operationDefaultAlpha;
    this._graphicOperations.hireManager.alpha = this.totalMoney >= this._managerPrice ? 1 : operationDefaultAlpha;
  }
}
