import * as logger from 'js-logger';
import { BUSINESS_INFO, BUSINESS_OPTIONS, BusinessInfo, BusinessOption } from '../config/business.config';

/**
 * Preloader Phaser scene.
 *
 * This is where we load all the assets including images, sounds and all relevant data
 * before starting the game.
 */
export default class Preloader extends Phaser.Scene {

  preload(): void {
    logger.info('Preloader enter');

    BUSINESS_INFO.forEach((businessInfo: BusinessInfo) => {
      this.load.image(businessInfo.logo, require(`../../assets/images/${businessInfo.logo}.png`));
    });

    BUSINESS_OPTIONS.forEach((businessOption: BusinessOption) => {
      this.load.image(businessOption.logo, require(`../../assets/images/${businessOption.logo}.png`));
    });
  }

  create(): void {
    logger.info('Preloader leave');

    this.scene.start('game');
  }

}
