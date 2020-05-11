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
      .text(SIZE.x / 2, SIZE.y - 80, 'Back to game', { fill: '#7ab7c5' })
      .setInteractive()
      .on('pointerup', () => this.scene.switch('game'));

    const buyLegend = this.add.image(150, 150, 'buy');
    buyLegend.displayHeight = BUSINESSES_GUI.logoSize;
    buyLegend.scaleX = buyLegend.scaleY;

    this.add.text(
      220,
      150,
      'Buy businesses or new branches of a business when available (icon not semi-transparent)...',
      { fill: '#494848' }
      );

    const businessLegend = this.add.image(150, 250, 'convenience-store');
    businessLegend.displayHeight = BUSINESSES_GUI.logoSize;
    businessLegend.scaleX = businessLegend.scaleY;

    this.add.text(220, 250, 'Produce your business value and check on the progress...', { fill: '#494848' });

    const upgradeLegend = this.add.image(150, 350, 'upgrade');
    upgradeLegend.displayHeight = BUSINESSES_GUI.logoSize;
    upgradeLegend.scaleX = upgradeLegend.scaleY;

    this.add.text(220, 350, 'Upgrade your business to increase the profits per branch...', { fill: '#494848' });

    const managerLegend = this.add.image(150, 450, 'manager');
    managerLegend.displayHeight = BUSINESSES_GUI.logoSize;
    managerLegend.scaleX = managerLegend.scaleY;

    this.add.text(220, 450, 'Hire a manager to automatically produce benefits...', { fill: '#494848' });

    this.add.text(220, 550, 'Close the game at anytime without losing your progress...', { fill: '#494848' });

    this.add.text(SIZE.x / 2, 650, 'And get rich!!!', { fill: '#494848' });
  }
}
