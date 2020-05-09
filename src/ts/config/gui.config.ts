import { size } from './game.config';

export const SIDEMENU_GUI = {
  buttonWidth: 150,
  buttonHeight: 60,
  buttonOffsetX: 10,
  buttonOffsetY: 50,
  buttonGap: 100,
  buttonColor: 0x7ab7c5,
  buttonAlpha: 0.9,
  buttonOriginX: 0.5,
  buttonOriginY: 0.5,
  buttonFont: 'bold 20px Georgia',
  buttonFontFill: '#000',
  borderWidth: 1,
  menuBgColor: 0xe7f1f7,
  menuBgAlpha: 0.5,
  menuX: 0,
  menuY: 0,
  menuHeight: size.y,
  menuWidth: 200,
};

export const BUSINESSES_GUI = {
  businessesGap: 250,
  leftSideBusinessX: 350,
  rightSideBusinessX: 830,
  firstRowBusinessY: 80,
  businessTitleFont: {
    font: 'bold 16px Georgia',
    fill: '#494848'
  },
  businessFont: {
    font: '14px Georgia',
    fill: '#494848'
  },
  logoSize: 64,
  logoDefaultAlpha: 0.4,
  nameOffsetY: 60,
  moneyIndicatorX: 250,
  moneyIndicatorY: 700,
  moneyIndicatorTitle: 'MONEY',
  moneyIndicatorFont: {
    font: 'bold 32px Georgia',
    fill: '#000'
  },
  statsOffsetX: 75,
  statsOffsetY: 30,
  progressBarHeight: 20,
  progressBarWidth: 200,
  progressBarBorderColor: 0x000000,
  progressBarFillColor: 0x0f0a55,
  progressBarBorderAlpha: 1,
  operationOffsetX: 60,
  operationOffsetY: 35,
  operationLogoSize: 24
};
