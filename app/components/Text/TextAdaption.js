import React, {PureComponent} from 'react';
import {Text} from 'react-native';

/** 禁止系统字体大小 控制 app字体大小 */
class TextAdaption extends PureComponent{
  render(){
    return <Text {...this.props} allowFontScaling={false} />
  }
}

export default TextAdaption;