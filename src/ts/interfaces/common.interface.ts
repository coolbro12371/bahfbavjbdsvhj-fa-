export interface GraphicStats {
  name: Phaser.GameObjects.Text;
  profit: Phaser.GameObjects.Text;
  numberOfBranches: Phaser.GameObjects.Text;
  price: Phaser.GameObjects.Text;
  upgradePrice: Phaser.GameObjects.Text;
  managerPrice: Phaser.GameObjects.Text;
  progress: Phaser.GameObjects.Graphics;
}

export interface GraphicOperations {
  acquire: Phaser.GameObjects.Image;
  upgrade: Phaser.GameObjects.Image;
  hireManager: Phaser.GameObjects.Image;
  acquireActive: Phaser.GameObjects.Graphics;
  upgradeActive: Phaser.GameObjects.Graphics;
  hireManagerActive: Phaser.GameObjects.Graphics;
}

export interface BusinessState {
  name: string;
  price: number;
  profit: number;
  numberOfBranches: number;
  managerHired: boolean;
  upgradePrice: number;
  acquired: boolean;
  lastStartime: number;
}

export interface GameState {
  totalMoney: number;
  businesses: BusinessState[];
}
