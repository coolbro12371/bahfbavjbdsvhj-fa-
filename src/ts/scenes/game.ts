import * as logger from 'js-logger';

import { canvasColor, size } from '../game.config';

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private graphics: Phaser.GameObjects.Graphics;

  private menuOptions: string[] = [
    'Managers',
    'Upgrades',
    'Stock market',
  ];

  create(): void {
    logger.info('Game enter');

    this.setBackground();
    this.setSideMenu();
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
    this.graphics.lineStyle(1, 0xe7f1f7, 0.5);
    this.graphics.fillStyle(0xe7f1f7, 0.5);
    this.graphics.fillRect(0, 0, 200, size.y);

    this.menuOptions.forEach((option, i) => {
      const position = {
        x: 10,
        y: 50 + (i * 100)
      };

      const buttonSize = { x: 150, y: 60 };

      this.graphics.fillStyle(0x7ab7c5, 0.9);
      this.graphics.fillRoundedRect(position.x, position.y, buttonSize.x, buttonSize.y);

      const text = this.add.text(
        position.x + (buttonSize.x / 2),
        position.y + (buttonSize.y / 2),
        option,
        {
          font: 'bold 20px Arial',
          fill: '#000'
        }
      );

      text.setOrigin(0.5, 0.5);
    });
  }

  setBusinessElements(): void {
  }
}
