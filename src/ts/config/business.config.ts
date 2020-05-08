import { BaseBusiness } from '../classes/BaseBusiness';
import { ConvenienceStoreBusiness } from '../classes/ConvenienceStoreBusiness';
import { TechBusiness } from '../classes/TechBusiness';
import { PawnShopBusiness } from '../classes/PawnShopBusiness';
import { CarDealershipBusiness } from '../classes/CarDealershipBusiness';
import { ConstructionBusiness } from '../classes/ConstructionBusiness';
import { WayneIndustriesBusiness } from '../classes/WayneIndustriesBusiness';

export interface BusinessInfo {
  model: typeof BaseBusiness;
  price: number;
  profit: number;
  interval: number;
  logo: string;
}

export const BUSINESS_INFO: BusinessInfo[] = [
  {
    model: ConvenienceStoreBusiness,
    price: 100,
    profit: 85,
    interval: 12000,
    logo: 'convenience-store'
  },
  {
    model: PawnShopBusiness,
    price: 500,
    profit: 450,
    interval: 12000,
    logo: 'pawn-shop'
  },
  {
    model: CarDealershipBusiness,
    price: 2000,
    profit: 1700,
    interval: 12000,
    logo: 'car-dealership'
  },
  {
    model: ConstructionBusiness,
    price: 50000,
    profit: 45000,
    interval: 12000,
    logo: 'construction'
  },
  {
    model: TechBusiness,
    price: 1000000,
    profit: 800000,
    interval: 12000,
    logo: 'tech'
  },
  {
    model: WayneIndustriesBusiness,
    price: 50000000,
    profit: 40000000,
    interval: 12000,
    logo: 'wayne-enterprises'
  },
];
