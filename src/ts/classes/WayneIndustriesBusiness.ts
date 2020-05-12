import { BaseBusiness } from './BaseBusiness';

const NO_OF_UPGRADES_FOR_BATSIGN = 2;

export class WayneIndustriesBusiness extends BaseBusiness {
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
      (this.numberOfUpgrades % NO_OF_UPGRADES_FOR_BATSIGN) === 0
    ) {
      this.setUpBatsignUI(this.positionX + 40, this.positionY);
    } else {
      this.destroyBatsignUI();
    }
  }

  private answerToBatsign(): void {
    this._profit = this._profit * 1.2;
    this._price = this._price * 1.2;
  }

  private setUpBatsignUI(posX: number, posY: number): void {
    if (this.specialLogoImage) { return; }

    this.specialLogoImage = this._scene.add.image(posX - 90, posY - 100, this._specialLogo);

    this.specialLogoImage.setDisplayOrigin(posX - 90, posY - 70);
    this.specialLogoImage.displayHeight = 80;
    this.specialLogoImage.scaleX = this.specialLogoImage.scaleY;

    this.specialLogoImage.setInteractive();
    this.specialLogoImage
      .on('pointerup', () => this.answerToBatsign())
      .on('pointerover', () => {
        this.specialLogoImage.displayHeight = 100;
        this.specialLogoImage.scaleX = this.specialLogoImage.scaleY;
      })
      .on('pointerout', () => {
        this.specialLogoImage.displayHeight = 80;
        this.specialLogoImage.scaleX = this.specialLogoImage.scaleY;
      } );

    this._graphicStats.profit.setBackgroundColor('#efa');
    this._graphicStats.price.setBackgroundColor('#efa');
  }

  private destroyBatsignUI(): void {
    if (this.specialLogoImage) {
      this.specialLogoImage.destroy();
      this._graphicStats.profit.setBackgroundColor('#fff');
      this._graphicStats.price.setBackgroundColor('#fff');

      this.specialLogoImage = null;
    }
  }
}
