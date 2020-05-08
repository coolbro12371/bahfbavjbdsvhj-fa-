import { ConvenienceStoreBusiness } from '../classes/ConvenienceStoreBusiness';
import { TechBusiness } from '../classes/TechBusiness';
import { PawnShopBusiness } from '../classes/PawnShopBusiness';
import { CarDealershipBusiness } from '../classes/CarDealershipBusiness';
import { ConstructionBusiness } from '../classes/ConstructionBusiness';
import { WayneIndustriesBusiness } from '../classes/WayneIndustriesBusiness';

export const BUSINESS_INFO = [
  {
    model: ConvenienceStoreBusiness,
    price: 100,
    profit: 85,
    interval: 12000
  },
  {
    model: PawnShopBusiness,
    price: 500,
    profit: 450,
    interval: 12000
  },
  {
    model: CarDealershipBusiness,
    price: 2000,
    profit: 1700,
    interval: 12000
  },
  {
    model: ConstructionBusiness,
    price: 50000,
    profit: 45000,
    interval: 12000
  },
  {
    model: TechBusiness,
    price: 1000000,
    profit: 800000,
    interval: 12000
  },
  {
    model: WayneIndustriesBusiness,
    price: 50000000,
    profit: 40000000,
    interval: 12000
  },
];
