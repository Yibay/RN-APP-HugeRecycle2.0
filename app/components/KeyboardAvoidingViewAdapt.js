import React from 'react';
import {KeyboardAvoidingView, LayoutAnimation} from 'react-native';

import PropTypes from 'prop-types';


import config from '../util/request/config';


// 屏幕适配 缩放比例
let adaptionScale = config.adaptionScale;

class KeyboardAvoidingViewAdapt extends KeyboardAvoidingView{

  static propTypes = {
    behavior: PropTypes.oneOf(['height', 'position', 'padding']), // 最好不建议用 'height'
  };

  constructor(props){

    super(props);

    // (b): behavior为'height'时，保存上一次keyboardHeight；
    this.keyboardHeight = 0;

    // 按适配后 比例，覆写
    this.onKeyboardChange = event => {

      if (!event) {
        this.setState({bottom: 0});
        return;
      }

      const {duration, easing, endCoordinates} = event;

      // (a): behavior为'padding'、'position'时, 按屏幕适配缩放比例 修正键盘高度 --start
      let endCoordinatesAdapt = {};
      Object.keys(endCoordinates).forEach(key => {
        endCoordinatesAdapt[key] = endCoordinates[key] * adaptionScale;
      });
      // --end

      let height = this.relativeKeyboardHeight(endCoordinatesAdapt);

      // (b): 修复 behavior为'height'时，height 不能恢复到初始值 Bug。
      if(this.props.behavior === 'height'){
        if(height){
          this.keyboardHeight += height; // 弹出软键盘，保存键盘高度
        }
        else {
          height = this.keyboardHeight * -1; //关闭软键盘、还原容器初始值
          this.keyboardHeight = 0;
        }
      }

      if (duration && easing) {
        LayoutAnimation.configureNext({
          duration: duration,
          update: {
            duration: duration,
            type: LayoutAnimation.Types[easing] || 'keyboard',
          },
        });
      }
      this.setState({bottom: height});

    };
  }

}

// 绑定默认props
export default KeyboardAvoidingViewAdapt;