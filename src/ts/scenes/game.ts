import * as logger from 'js-logger';

import { CANVAS_COLOR, IDLE_BACKUP_INTERVAL } from '../config/game.config';
import { BUSINESSES_GUI, SIDEMENU_GUI } from '../config/gui.config';
import {
  BUSINESS_INFO,
  BUSINESS_OPERATIONS,
  BusinessOperation,
  STARTING_MONEY
} from '../config/business.config';

import { BaseBusiness } from '../classes/BaseBusiness';
import { BusinessState, GameState, GraphicStats } from '../interfaces/common.interface';
import { StorageService } from '../services/storage.service';

const {
  buttonWidth,
  buttonHeight,
  buttonOffsetX,
  buttonOffsetY,
  buttonGap,
  buttonColor,
  buttonAlpha,
  buttonOriginX,
  buttonOriginY,
  buttonFont,
  buttonFontFill,
  borderWidth,
  menuBgColor,
  menuBgAlpha,
  menuX,
  menuY,
  menuHeight,
  menuWidth,
} = SIDEMENU_GUI;

const {
  businessTitleFont,
  businessFont,
  logoSize,
  logoDefaultAlpha,
  nameOffsetY,
  moneyIndicatorX,
  moneyIndicatorY,
  moneyIndicatorTitle,
  moneyIndicatorFont,
  statsOffsetX,
  statsOffsetY,
  progressBarHeight,
  progressBarWidth,
  progressBarBorderColor,
  progressBarBorderAlpha,
  operationOffsetX,
  operationOffsetY,
  operationLogoSize
} = BUSINESSES_GUI;

export default class Game extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private sceneGraphics: Phaser.GameObjects.Graphics;
  private totalMoneyIndicator: Phaser.GameObjects.Text;

  private totalMoney = STARTING_MONEY;
  private businesses: BaseBusiness[] = [];
  private menuOptions: string[] = [
    'Managers',
    'Upgrades',
    'Stock market',
  ];

  private totalMoneyListener: Phaser.Events.EventEmitter;

  create(gameData: any): void {
    logger.info('Game enter');

    const { totalMoney, businesses } = this.retrieveGameState(gameData);

    this.totalMoney = totalMoney;
    this.sceneGraphics = this.add.graphics();

    this.setBackground();
    this.setSideMenu();
    this.createMoneyIndicator();
    this.initTotalMoneyListener();
    this.createDefaultBusinesses();
    this.restoreBusinesses(businesses);
    this.createBusinessLogos();
    this.createBusinessOperations();
    this.createBusinessStats();
    this.setIdleGameBackup();
  }

  update() {
    if (this.totalMoney) {
      this.totalMoneyIndicator.text = this.totalMoney.toFixed(2);
    }

    this.businesses.forEach(async (business: BaseBusiness) => {
      business.update(this.totalMoney);
    });
  }

  private retrieveGameState({ gameState }: any): { totalMoney: number, businesses: BusinessState[] } {
    if (gameState && gameState.totalMoney && gameState.businesses) {
      return { totalMoney: gameState.totalMoney, businesses: gameState.businesses };
    } else {
      return { totalMoney: STARTING_MONEY, businesses: [] };
    }
  }

  private setBackground(): void {
    this.cameras.main.setBackgroundColor(CANVAS_COLOR);

    this.background = this.add.image(
      (this.sys.game.config.width as number) / 2,
      (this.sys.game.config.height as number) / 2,
      'bg'
    );

    this.background.alpha = 0.05;
  }

  private setSideMenu(): void {
    this.sceneGraphics.lineStyle(borderWidth, menuBgColor, menuBgAlpha);
    this.sceneGraphics.fillStyle(menuBgColor, menuBgAlpha);
    this.sceneGraphics.fillRect(menuX, menuY, menuWidth, menuHeight);

    this.menuOptions.forEach((option, i) => {
      const position = {
        x: buttonOffsetX,
        y: buttonOffsetY + (i * buttonGap)
      };

      this.sceneGraphics.fillStyle(buttonColor, buttonAlpha);
      this.sceneGraphics.fillRoundedRect(position.x, position.y, buttonWidth, buttonHeight);

      const text = this.add.text(
        position.x + (buttonWidth / 2),
        position.y + (buttonHeight / 2),
        option,
        {
          font: buttonFont,
          fill: buttonFontFill
        }
      );

      text.setOrigin(buttonOriginX, buttonOriginY);
    });
  }

  private createMoneyIndicator(): void {
    this.add.text(
      moneyIndicatorX,
      moneyIndicatorY,
      moneyIndicatorTitle,
      moneyIndicatorFont
    );

    this.totalMoneyIndicator = this.add.text(
      moneyIndicatorX + 150,
      moneyIndicatorY,
      STARTING_MONEY.toString(),
      moneyIndicatorFont
    );
  }

  private createDefaultBusinesses(): void {
    BUSINESS_INFO.forEach((business, index: number) => {
      this.businesses.push(new business.model(
        business.name,
        business.price,
        business.profit,
        business.interval,
        business.managerPrice,
        business.upgradePrice,
        this.add.image( 0, 0, business.logo),
        index,
        this.totalMoneyListener
      ));
    });
  }

  private restoreBusinesses(backedUpBusinesses: BusinessState[]): void {
    if (!backedUpBusinesses || !backedUpBusinesses.length) { return; }

    this.businesses.forEach((defaultBusiness: BaseBusiness, index: number) => {
      const {
        price,
        profit,
        numberOfBranches,
        managerHired,
        upgradePrice,
        acquired,
        startTime,
        endTime
      } = backedUpBusinesses[index];

      defaultBusiness.price = price;
      defaultBusiness.profit = profit;
      defaultBusiness.upgradePrice = upgradePrice;
      defaultBusiness.numberOfBranches = numberOfBranches;
      defaultBusiness.managerHired = managerHired;
      defaultBusiness.acquired = acquired;
      defaultBusiness.startTime = startTime;
      defaultBusiness.endTime = endTime;
    });
  }

  private createBusinessLogos(): void {
    this.businesses.forEach((business: BaseBusiness) => {
      business.logo.setPosition(business.positionX, business.positionY);

      business.logo.alpha = logoDefaultAlpha;
      business.logo.setInteractive();
      business.logo.on(
        'pointerup',
        async () => business.produce(1)
      );

      business.logo.displayHeight = logoSize;
      business.logo.scaleX = business.logo.scaleY;
    });
  }

  private createBusinessOperations(): void {
    this.businesses.forEach((business: BaseBusiness) => {
      BUSINESS_OPERATIONS.forEach((businessOperation: BusinessOperation, index: number) => {
        const operation = this.add.image(
          business.positionX - operationOffsetX,
          business.positionY - logoSize / 2 + operationOffsetY * index,
          businessOperation.logo
        );

        operation.setInteractive();
        operation.on(
          'pointerup',
          // @ts-ignore
          () => business[businessOperation.operationName]()
        );

        operation.displayHeight = operationLogoSize;
        operation.scaleX = operation.scaleY;
      });
    });
  }

  private createBusinessStats(): void {
    this.businesses.forEach((business: BaseBusiness) => {
      const stats: GraphicStats = {
        name: this.add.text(
          business.positionX - (logoSize / 2),
          business.positionY - nameOffsetY,
          business.name,
          businessTitleFont
        ),
        profit: this.add.text(
          business.positionX + statsOffsetX,
          business.positionY,
          `${business.profit}`,
          businessFont
        ),
        numberOfBranches: this.add.text(
          business.positionX + statsOffsetX,
          business.positionY + statsOffsetY,
          `${business.numberOfBranches}`,
          businessFont
        ),
        price: this.add.text(
          business.positionX + statsOffsetX,
          business.positionY + (2 * statsOffsetY),
          `${ business.price.toString()}`,
          businessFont
        ),
        progress: this.add.graphics()
      };

      this.sceneGraphics.lineStyle(borderWidth, progressBarBorderColor, progressBarBorderAlpha);
      this.sceneGraphics.strokeRect(
        business.positionX + statsOffsetX,
        business.positionY - statsOffsetY,
        progressBarWidth,
        progressBarHeight + 1,
      );

      business.graphicStats = stats;
    });
  }

  private initTotalMoneyListener(): void {
    this.totalMoneyListener = new Phaser.Events.EventEmitter();

    this.totalMoneyListener.addListener('totalMoneyUpdated', (value: any) => {
      this.totalMoney = value;
    });
  }

  private setIdleGameBackup(): void {
    setInterval(
      () => StorageService.backupGameState(this.businesses, this.totalMoney),
      IDLE_BACKUP_INTERVAL
    );
  }
}
