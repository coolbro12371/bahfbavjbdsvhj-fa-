import { BaseBusiness } from '../classes/BaseBusiness';
import { GameState } from '../interfaces/common.interface';

const GAME_BACKUP_KEY = 'gameBackup';

export class StorageService {
  static backupGameState(businesses: BaseBusiness[], totalMoney: number): void {
    const backupObject = {
      totalMoney,
      businesses: businesses.map((business: BaseBusiness) => {
        return {
          name: business.name,
          price: business.price,
          profit: business.profit,
          numberOfBranches: business.numberOfBranches,
          running: business.running,
          managerHired: business.managerHired,
          upgradePrice: business.upgradePrice,
          acquired: business.acquired,
          startTime: business.startTime,
          endTime: business.endTime
        };
      })
    };

    localStorage.setItem(GAME_BACKUP_KEY, JSON.stringify(backupObject));
  }

  static restoreGameState(): GameState {
    return JSON.parse(localStorage.getItem(GAME_BACKUP_KEY));
  }
}
