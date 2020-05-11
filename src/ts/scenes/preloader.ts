import * as logger from 'js-logger';
import { BUSINESS_INFO, BUSINESS_OPERATIONS, BusinessInfo, BusinessOperation } from '../config/business.config';
import { GameState } from '../interfaces/common.interface';
import { StorageService } from '../services/storage.service';

/**
 * Preloader Phaser scene.
 *
 * This is where we load all the assets including images, sounds and all relevant data
 * before starting the game.
 */
export default class Preloader extends Phaser.Scene {

  preload(): void {
    logger.info('Preloader enter');

    this.load.image('game-bg', '../../assets/images/game-bg.png');

    BUSINESS_INFO.forEach((businessInfo: BusinessInfo) => {
      this.load.image(businessInfo.logo, require(`../../assets/images/${businessInfo.logo}.png`));
    });

    BUSINESS_OPERATIONS.forEach((businessOption: BusinessOperation) => {
      this.load.image(businessOption.logo, require(`../../assets/images/${businessOption.logo}.png`));
    });
  }

  create(): void {
    logger.info('Preloader leave');

    this.scene.start('game', { gameState: this.retrieveStorageBackup()});
  }

  retrieveStorageBackup(): GameState {
    // return StorageService.restoreGameState();
    return null;
  }
}
