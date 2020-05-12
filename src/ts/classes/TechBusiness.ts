import { BaseBusiness } from './BaseBusiness';

const NO_OF_UPGRADES_FOR_SPECIAL_OP = 3;

export class TechBusiness extends BaseBusiness {
  _scene: Phaser.Scene;
  _specialLogo: string;

  specialLogoImage: Phaser.GameObjects.Image;

  set scene(scene: Phaser.Scene) {
    this._scene = scene;
  }

  set specialLogo(specialLogo: string) {
    this._specialLogo = specialLogo;
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
    totalMoneyEmitter: Phaser.Events.EventEmitter,
    scene: Phaser.Scene,
    specialLogo: string
  ) {
    super(
      name,
      price,
      profit,
      interval,
      managerPrice,
      upgradePrice,
      logo,
      businessValueFactor,
      totalMoneyEmitter
    );

    this._scene = scene;
    this._specialLogo = specialLogo;
  }

  update(totalMoney: number): void {
    super.update(totalMoney);

    if (
      this.numberOfUpgrades &&
      (this.numberOfUpgrades % NO_OF_UPGRADES_FOR_SPECIAL_OP) === 0
    ) {
      this.setUpStockMarketUI(this.positionX + 40, this.positionY);
    } else {
      this.destroyStockMarketUI();
    }
  }

  private openToStockMarket(): void {
    const unrounded = (Math.random() * 2) * this._profit;

    this._profit = Math.round(unrounded * 100) / 100;
  }

  private setUpStockMarketUI(posX: number, posY: number): void {
    if (this.specialLogoImage) { return; }

    this.specialLogoImage = this._scene.add.image(posX - 40, posY + 70, this._specialLogo);

    this.specialLogoImage.displayHeight = 36;
    this.specialLogoImage.scaleX = this.specialLogoImage.scaleY;

    this.specialLogoImage.setInteractive();
    this.specialLogoImage
      .on('pointerup', () => this.openToStockMarket())
      .on('pointerover', () => this.specialLogoImage.angle -= 30 )
      .on('pointerout', () => this.specialLogoImage.angle += 30 );

    this._graphicStats.profit.setBackgroundColor('#efa');
  }

  private destroyStockMarketUI(): void {
    if (this.specialLogoImage) {
      this.specialLogoImage.destroy();
      this._graphicStats.profit.setBackgroundColor('#fff');

      this.specialLogoImage = null;
    }
  }
}
