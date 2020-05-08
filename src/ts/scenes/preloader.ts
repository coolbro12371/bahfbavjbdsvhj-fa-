import * as logger from 'js-logger';

/**
 * Preloader Phaser scene.
 *
 * This is where we load all the assets including images, sounds and all relevant data
 * before starting the game.
 */
export default class Preloader extends Phaser.Scene {

  preload(): void {
    logger.info('Preloader enter');

    // TODO preload assets

    this.load.image('bg', require('../../assets/images/game-bg.jpg'));
    this.load.image('logo', require('../../assets/images/convenience-store.png'));
    this.load.image('logo', require('../../assets/images/pawn-shop.png'));
    this.load.image('logo', require('../../assets/images/car-dealership.png'));
    this.load.image('logo', require('../../assets/images/construction.png'));
    this.load.image('logo', require('../../assets/images/tech.png'));
    this.load.image('logo', require('../../assets/images/wayne-enterprises.png'));
  }

  create(): void {
    logger.info('Preloader leave');

    this.scene.start('game');
  }

}
