import {PixelRatio} from 'react-native';

export function noScale(number){
  // 字体未 标准时，PixelRatio.get() / PixelRatio.getFontScale() = 1
  return number * PixelRatio.get() / PixelRatio.getFontScale();
}