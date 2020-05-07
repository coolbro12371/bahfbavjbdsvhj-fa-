import * as logger from 'js-logger';

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {

  create(): void {
    logger.info('Game enter');

    this.add.image(
      (this.sys.game.config.width as number) / 2,
      (this.sys.game.config.height as number) / 2,
      'bg'
    );

    this.add.sprite(
      (this.sys.game.config.width as number) / 2 ,
      (this.sys.game.config.height as number) / 2,
      'logo'
    );
  }
}
