/**
 * Game entry point
 */

import '../css/style.css'; // loading css

import 'phaser'; // loading Phaser with dependencies

import * as logger from 'js-logger';

import * as gameConfig from './config/game.config';

import PhaserStatsGame from './classes/PhaserStatsGame';

import Preloader from './scenes/preloader';
import Game from './scenes/game';
import Help from './scenes/help';

/**
 * Setup logger
 */
logger.useDefaults();
logger.setLevel(gameConfig.LOG_LEVEL);

/**
 * Phaser game config
 * @type {Phaser.Types.Core.GameConfig}
 */
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'container',     // parent id - '' means  no container
  width: gameConfig.SIZE.x,
  height: gameConfig.SIZE.y
};

/**
 * Phaser game instance
 * Choosing implementation based on 'stats' app config setting
 * @type {Phaser.Game}
 */
let game: Phaser.Game;

if (gameConfig.STATS && process.env.NODE_ENV !== 'production') {
  game = new PhaserStatsGame(config);
} else {
  game = new Phaser.Game(config);
}

/**
 * Registering game scenes
 */
const initialScenes = {
  help: Help,
  preloader: Preloader,
  game: Game
};

Object.entries(initialScenes).forEach((entry: any[]) => {
  game.scene.add(entry[0], entry[1]);
});

game.scene.start('preloader');
