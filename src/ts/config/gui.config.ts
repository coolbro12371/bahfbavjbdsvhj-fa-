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
  buttonFont: 'bold 20px Arial',
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
  businessesGap: 200,
  leftSideBusinessX: 300,
  rightSideBusinessX: 830,
  firstRowBusinessY: 80,
  businessFont: {
    font: '14px Arial',
    fill: '#494848'
  },
  logoSize: 64,
  nameOffsetY: 60,
  moneyIndicatorX: 250,
  moneyIndicatorY: 700,
  moneyIndicatorTitle: 'MONEY',
  moneyIndicatorFont: {
    font: '32px Tahoma',
    fill: '#000'
  },
  statsOffsetX: 75,
  statsOffsetY: 30,
  progressBarHeight: 20,
  progressBarWidth: 200,
  progressBarBorderColor: 0x000000,
  progressBarBorderAlpha: 1,
};
