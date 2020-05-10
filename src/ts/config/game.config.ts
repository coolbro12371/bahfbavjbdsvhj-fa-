import * as logger from 'js-logger';

/**
 * Game title used for page title tag.
 * @type {string}
 */
export const TITLE = 'Adventure Capitalist';
/**
 * Game description used for html page metadata.
 * @type {string}
 */
export const DESCRIPTION = 'TODO add description';
/**
 * Setting which enables us to quickly mute game sounds.
 * @type {boolean}
 */
export const MUTE = false;
/**
 * Setting which determines if stats should be enabled in game.
 * Based on this setting we choose which Phaser.Game implementation we want to use.
 * @type {boolean}
 */
export const STATS = true;
/**
 * Setting defining the global logging filter level.
 * @type {ILogLevel}
 */
export const LOG_LEVEL = process.env.NODE_ENV !== 'production' ? logger.DEBUG : logger.ERROR;
/**
 * Game dimensions
 * @type {{x: number; y: number}}
 */
export const SIZE: {
  readonly x: number;
  readonly y: number;
} = {
  x: 1300,
  y: 800
};

/**
 * Game bg color
 * @type string
 */
export const CANVAS_COLOR = '#ffffff';

/**
 * Game orientation
 * @type {{forceLandscape: boolean; forcePortrait: boolean}}
 */
export const ORIENTATION: {
  readonly forceLandscape: boolean;
  readonly forcePortrait: boolean;
} = {
  forceLandscape: false,
  forcePortrait: false
};

/**
 * Interval for periodical backups to local storage
 * @type number
 */
export const IDLE_BACKUP_INTERVAL = 1000;
