import * as logger from 'js-logger';

import { canvasColor } from '../config/game.config';
import { SIDEMENU } from '../config/gui.config';
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
} = SIDEMENU;

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

    this.setBackground();
    this.setSideMenu();
    this.createBusinesses();
    this.setBusinessElements();
  }

  setBackground(): void {
    this.cameras.main.setBackgroundColor(canvasColor);

    this.background = this.add.image(
      (this.sys.game.config.width as number) / 2,
      (this.sys.game.config.height as number) / 2,
      'bg'
    );

    this.background.alpha = 0.05;
  }

  setSideMenu(): void {
    this.graphics = this.add.graphics();

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

  createBusinesses(): void {
    for (const Business of BUSINESS_INFO) {
      // @ts-ignore
      this.businesses.push(new Business.model(
        Business.price,
        Business.profit,
        Business.interval
      ));
    }
  }

  setBusinessElements(): void {
  }
}
