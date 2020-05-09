import * as logger from 'js-logger';

import { canvasColor } from '../config/game.config';
import { BUSINESSES_GUI, SIDEMENU_GUI } from '../config/gui.config';
import { BUSINESS_INFO } from '../config/business.config';

import { BaseBusiness } from '../classes/BaseBusiness';

const {
  buttonWidth,
  buttonHeight,
  buttonOffsetX,
  buttonOffsetY,
  buttonGap,
  buttonColor,
  buttonAlpha,
  buttonOriginX,
  buttonOriginY,
  buttonFont,
  buttonFontFill,
  borderWidth,
  menuBgColor,
  menuBgAlpha,
  menuX,
  menuY,
  menuHeight,
  menuWidth,
} = SIDEMENU_GUI;

export default class Game extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private graphics: Phaser.GameObjects.Graphics;

  private businesses: BaseBusiness[] = [];
  private menuOptions: string[] = [
    'Managers',
    'Upgrades',
    'Stock market',
  ];

  create(): void {
    logger.info('Game enter');

    this.graphics = this.add.graphics();

    this.setBackground();
    this.setSideMenu();
    this.createMoneyIndicator();
    this.createBusinesses();
    this.createBusinessLogos();
    this.createBusinessStats();
  }

  private setBackground(): void {
    this.cameras.main.setBackgroundColor(canvasColor);

    this.background = this.add.image(
      (this.sys.game.config.width as number) / 2,
      (this.sys.game.config.height as number) / 2,
      'bg'
    );

    this.background.alpha = 0.05;
  }

  private setSideMenu(): void {
    this.graphics.lineStyle(borderWidth, menuBgColor, menuBgAlpha);
    this.graphics.fillStyle(menuBgColor, menuBgAlpha);
    this.graphics.fillRect(menuX, menuY, menuWidth, menuHeight);

    this.menuOptions.forEach((option, i) => {
      const position = {
        x: buttonOffsetX,
        y: buttonOffsetY + (i * buttonGap)
      };

      this.graphics.fillStyle(buttonColor, buttonAlpha);
      this.graphics.fillRoundedRect(position.x, position.y, buttonWidth, buttonHeight);

      const text = this.add.text(
        position.x + (buttonWidth / 2),
        position.y + (buttonHeight / 2),
        option,
        {
          font: buttonFont,
          fill: buttonFontFill
        }
      );

      text.setOrigin(buttonOriginX, buttonOriginY);
    });
  }

  private createMoneyIndicator(): void {
    this.add.text(
      BUSINESSES_GUI.moneyIndicatorX,
      BUSINESSES_GUI.moneyIndicatorY,
      BUSINESSES_GUI.moneyIndicatorTitle,
      BUSINESSES_GUI.moneyIndicatorFont
    );
  }

  private createBusinesses(): void {
    BUSINESS_INFO.forEach((business, index: number) => {
      this.businesses.push(new business.model(
        business.name,
        business.price,
        business.profit,
        business.interval,
        business.logo,
        index
      ));
    });
  }

  private createBusinessLogos(): void {
    this.businesses.forEach((business: BaseBusiness) => {
      const businessLogo = this.add.image(
        business.positionX,
        business.positionY,
        business.logo
      );

      businessLogo.setInteractive();
      businessLogo.on('pointerup', () => business.onClick());

      businessLogo.displayHeight = BUSINESSES_GUI.logoSize;
      businessLogo.scaleX = businessLogo.scaleY;
    });
  }

  private createBusinessStats(): void {
    this.businesses.forEach((business: BaseBusiness) => {
      const stats = {
        name: this.add.text(
          business.positionX - (BUSINESSES_GUI.logoSize / 2),
          business.positionY - BUSINESSES_GUI.nameOffsetY,
          business.name,
          BUSINESSES_GUI.businessFont
        ),
        profit: this.add.text(
          business.positionX + BUSINESSES_GUI.statsOffsetX,
          business.positionY,
          `Profit: ${business.profit}`,
          BUSINESSES_GUI.businessFont
        ),
        interval: this.add.text(
          business.positionX + BUSINESSES_GUI.statsOffsetX,
          business.positionY + BUSINESSES_GUI.statsOffsetY,
          `Remaining: ${business.interval}`,
          BUSINESSES_GUI.businessFont
        ),
        price: this.add.text(
          business.positionX + BUSINESSES_GUI.statsOffsetX,
          business.positionY + (2 * BUSINESSES_GUI.statsOffsetY),
          `Price: ${ business.price.toString()}`,
          BUSINESSES_GUI.businessFont
        ),
        progress: this.graphics.fillRect(
          business.positionX + BUSINESSES_GUI.statsOffsetX,
          business.positionY - BUSINESSES_GUI.statsOffsetY,
          BUSINESSES_GUI.progressBarWidth,
          BUSINESSES_GUI.progressBarHeight,
         )
      };

      this.graphics.lineStyle(borderWidth, BUSINESSES_GUI.progressBarBorderColor, BUSINESSES_GUI.progressBarBorderAlpha);
      this.graphics.strokeRect(
        business.positionX + BUSINESSES_GUI.statsOffsetX,
        business.positionY - BUSINESSES_GUI.statsOffsetY,
        BUSINESSES_GUI.progressBarWidth + 1,
        BUSINESSES_GUI.progressBarHeight + 1,
      );

      business.graphicStats = stats;
    });
  }
}
