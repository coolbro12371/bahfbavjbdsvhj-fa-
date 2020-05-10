export interface GraphicStats {
  name: Phaser.GameObjects.Text;
  profit: Phaser.GameObjects.Text;
  numberOfBranches: Phaser.GameObjects.Text;
  price: Phaser.GameObjects.Text;
  progress: Phaser.GameObjects.Graphics;
}

export interface BusinessState {
  name: string;
  price: number;
  profit: number;
  numberOfBranches: number;
  managerHired: boolean;
  upgradePrice: number;
  acquired: boolean;
  startTime: number;
  endTime: number;
}

export interface GameState {
  totalMoney: number;
  businesses: BusinessState[];
}
