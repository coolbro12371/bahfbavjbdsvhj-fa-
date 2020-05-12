import { CANVAS_COLOR, SIZE } from '../config/game.config';
import { BUSINESSES_GUI, SIDEMENU_GUI } from '../config/gui.config';

export default class Help extends Phaser.Scene {
  backButton: Phaser.GameObjects.Text;
  sceneGraphics: Phaser.GameObjects.Graphics;

  create() {
    this.sceneGraphics = this.add.graphics();

    this.cameras.main.setBackgroundColor(CANVAS_COLOR);

    const background = this.add.image(
      (this.sys.game.config.width as number) / 2,
      (this.sys.game.config.height as number) / 2,
      'game-bg'
    );

    background.alpha = 0.04;

    this.sceneGraphics.fillStyle(SIDEMENU_GUI.menuBgColor, 0.5);
    this.sceneGraphics.fillRoundedRect(20, 20 , SIZE.x - 40, SIZE.y - 40);

    this.backButton = this.add
      .text(SIZE.x / 2, SIZE.y - 180, 'Back to game', { fill: '#7ab7c5' })
      .setInteractive()
      .on('pointerup', () => this.scene.switch('game'));

    const buyLegend = this.add.image(150, 70, 'buy');
    buyLegend.displayHeight = BUSINESSES_GUI.logoSize;
    buyLegend.scaleX = buyLegend.scaleY;

    this.add.text(
      220,
      70,
      'Buy businesses or new branches of a business when available (icon not semi-transparent)...',
      { fill: '#494848' }
      );

    const businessLegend = this.add.image(150, 150, 'convenience-store');
    businessLegend.displayHeight = 58;
    businessLegend.scaleX = businessLegend.scaleY;

    this.add.text(220, 150, 'Produce your business value and check on the progress...', { fill: '#494848' });

    const upgradeLegend = this.add.image(150, 230, 'upgrade');
    upgradeLegend.displayHeight = 58;
    upgradeLegend.scaleX = upgradeLegend.scaleY;

    this.add.text(220, 230, 'Upgrade your business to increase the profits per branch...', { fill: '#494848' });

    const managerLegend = this.add.image(150, 310, 'manager');
    managerLegend.displayHeight = 58;
    managerLegend.scaleX = managerLegend.scaleY;

    this.add.text(220, 310, 'Hire a manager to automatically produce benefits...', { fill: '#494848' });

    this.add.text(220, 390, 'Keep an eye out for susprises when upgrading your business ;)', { fill: '#494848' });

    this.add.text(220, 470, 'Close the game at anytime without losing your progress...', { fill: '#494848' });

    this.add.text(SIZE.x / 2, 560, 'And get rich!!!', { fill: '#494848' });
  }
}
