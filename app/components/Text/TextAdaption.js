import React, {PureComponent} from 'react';
import {Text} from 'react-native';


class TextAdaption extends PureComponent{
  render(){
    return <Text {...this.props} allowFontScaling={false} />
  }
}

export default TextAdaption;