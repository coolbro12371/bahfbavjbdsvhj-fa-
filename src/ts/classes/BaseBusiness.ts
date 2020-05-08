export class BaseBusiness {
  protected running: boolean = false;
  protected startedAt: number;
  protected endingAt: number;

  protected asset: any;
  protected price: any;
  protected profit: any;
  protected interval: any;
  protected game: any;
  protected index: any;

  constructor(
    price: number,
    profit: number,
    interval: number
  ) {
    console.log(price, profit, interval);
  }

  // protected indicators: {
  //   name: Phaser.,
  //   profit: Phaser.Text,
  //   interval: Phaser.Text,
  //   level: Phaser.Text,
  //   price: Phaser.Text,
  //   alert: Phaser.Text,
  //   alertBg: Phaser.Image,
  //   progressBg: Phaser.Image,
  //   progress: Phaser.Line
  // };

}
