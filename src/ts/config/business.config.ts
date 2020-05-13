import { ConvenienceStoreBusiness } from '../classes/ConvenienceStoreBusiness';
import { TechBusiness } from '../classes/TechBusiness';
import { PawnShopBusiness } from '../classes/PawnShopBusiness';
import { CarDealershipBusiness } from '../classes/CarDealershipBusiness';
import { ConstructionBusiness } from '../classes/ConstructionBusiness';
import { WayneIndustriesBusiness } from '../classes/WayneIndustriesBusiness';

export interface BusinessInfo {
  model: any;
  name: string;
  price: number;
  profit: number;
  interval: number;
  managerPrice: number;
  upgradePrice: number;
  logo: string;
  enableSpecialOperation?: boolean;
  specialOperationLogo?: string;
}

export interface BusinessOperation {
  operationName: string;
  logo: string;
}

export const STARTING_MONEY = 400 ;
// For testig purposes
// export const STARTING_MONEY = 4200000000 ;
export const UPGRADE_PROFIT_MULTIPLIER = 1.25;
export const UPGRADE_PRICE_MULTIPLIER = 1.15;
export const ACQUIRING_MULTIPLIER = 1.15;

export const BUSINESS_INFO: BusinessInfo[] = [
  {
    model: ConvenienceStoreBusiness,
    name: 'Convenience Store',
    price: 100,
    profit: 85,
    interval: 1000,
    managerPrice: 500,
    upgradePrice: 500,
    logo: 'convenience-store'
  },
  {
    model: PawnShopBusiness,
    name: 'Pawn Shop',
    price: 500,
    profit: 450,
    interval: 5000,
    managerPrice: 2000,
    upgradePrice: 2000,
    logo: 'pawn-shop'
  },
  {
    model: CarDealershipBusiness,
    name: 'Car Dealership',
    price: 2000,
    profit: 1700,
    interval: 30000,
    managerPrice: 5000,
    upgradePrice: 5000,
    logo: 'car-dealership'
  },
  {
    model: ConstructionBusiness,
    name: 'Construction Company',
    price: 50000,
    profit: 45000,
    interval: 60000,
    managerPrice: 10000,
    upgradePrice: 1000,
    logo: 'construction'
  },
  {
    model: TechBusiness,
    name: 'Tech Hub',
    price: 1000000,
    profit: 800000,
    interval: 120000,
    managerPrice: 2000000,
    upgradePrice: 2000000,
    logo: 'tech',
    enableSpecialOperation: true,
    specialOperationLogo: 'stock-market'
  },
  {
    model: WayneIndustriesBusiness,
    name: 'Wayne Enterprises',
    price: 50000000,
    profit: 40000000,
    interval: 12000,
    managerPrice: 100000000,
    upgradePrice: 100000000,
    logo: 'wayne-enterprises',
    enableSpecialOperation: true,
    specialOperationLogo: 'batsign'
  },
];

/**
 * Array of definitions for business operations
 * Interfaces BusinessOperation and GraphicOperation props must match as follows:
 *   BusinessOperation.operatioName => operationName (key)
 *   GraphicOperation[propName] => operationName value: e.g.: acquire (key)
 * This is to have a dynamic operation generation flow based on this config file.
 * Check improvements on README.md
 */
export const BUSINESS_OPERATIONS: BusinessOperation[] = [
  {
    operationName: 'acquire',
    logo: 'buy'
  },
  {
    operationName: 'upgrade',
    logo: 'upgrade'
  },
  {
    operationName: 'hireManager',
    logo: 'manager'
  }
];
