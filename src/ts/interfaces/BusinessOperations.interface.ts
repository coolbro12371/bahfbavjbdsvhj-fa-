export interface BusinessOperations {
  buy(totalMoney: number): number;
  upgrade(totalMoney: number): number;
  hireManager(totalMoney: number): number;
}
