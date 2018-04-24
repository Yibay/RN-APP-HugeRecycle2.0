import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
import _ from 'lodash';


const countDown = (WrappedComponent, countDown=60) => class extends PureComponent{

  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    text: '',
    onPress: () => {console.log('未绑定函数')},
  };

  constructor(props){
    super(props);

    this.state={
      countDown: 0,
    };
  }

  render(){
    return <WrappedComponent {..._.omit(this.props,['text','onPress'])}
                             text={this.state.countDown ? `( ${this.state.countDown}秒 )` : this.props.text}
                             onPress={() => this.onPress()}
                             style={[this.props.style, this.state.countDown ? styles.disable : null]}
                             textStyle={[this.props.textStyle, this.state.countDown ? styles.disableText : null]}
    />;
  }

  componentWillUnmount(){
    this.setInterval && clearInterval(this.setInterval);
  }

  async onPress(){
    if(this.state.countDown){
      return;
    }

    let success = this.props.onPress();
    if(success instanceof Promise){
      success = await success; // 若onPress是异步函数，则获取其中结果
    }
    if(!success){return;} // 如 input格式错误，则success返回false，不进行倒计时

    this.setState({countDown});
    this.setInterval = setInterval(() => {
      this.setState(state => {
        if(state.countDown > 0){
          return {countDown: state.countDown - 1};
        }
        else {
          clearInterval(this.setInterval);
        }
      });
    }, 1000);
  }
};

const styles = StyleSheet.create({
  disable: {
    backgroundColor: '#888',
  },
  disableText: {
    color: '#fff',
  },
});

export default countDown;