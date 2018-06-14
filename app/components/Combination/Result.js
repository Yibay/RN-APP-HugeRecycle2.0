import React,{PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';
import {Result} from 'antd-mobile-rn';


import TextAdaption from '../Text/TextAdaption';


class ResultDefault extends PureComponent{

  static propTypes = {
    img: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    title: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    // 样式
    imgIcon: Text.propTypes.style,
    titleStyle: Text.propTypes.style,
    messageStyle: Text.propTypes.style,
  };

  render(){
    let img = typeof this.props.img === 'string' ? <TextAdaption style={[styles.imgIcon].concat(this.props.imgIcon)}>{this.props.img}</TextAdaption> : this.props.img;
    let message = typeof this.props.message === 'string' ? <TextAdaption style={[styles.message].concat(this.props.messageStyle)}>{this.props.message}</TextAdaption> : this.props.message;
    return <View style={[styles.container].concat(this.props.styles)}>
      <Result img={img}
              title={<TextAdaption style={[styles.title].concat(this.props.titleStyle)}>{this.props.title}</TextAdaption>}
              message={message}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imgIcon: {
    fontFamily: 'iconfont',
    fontSize: 90,
  },
  title: {
    fontSize: 40,
  },
  message: {
    fontSize: 30,
  },
});

export default ResultDefault;