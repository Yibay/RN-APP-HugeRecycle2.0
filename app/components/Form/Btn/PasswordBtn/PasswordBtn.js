import React,{Component} from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';

import PropTypes from 'prop-types';


class PasswordBtn extends Component {

  static propTypes = {
    secureTextEntry: PropTypes.bool.isRequired,
    setSecure: PropTypes.func.isRequired // 返回 可见结果
  };

  static defaultProps = {
    secureTextEntry: false,
    setSecure: val => {}
  };

  render(){
    return <View>
      {
        this.props.secureTextEntry ?
          <TouchableWithoutFeedback onPress={() => this.props.setSecure(false)}>
            <Image style={styles.icon} source={require('./img/notSeePassword2x.png')} resizeMode='contain'/>
          </TouchableWithoutFeedback>
          :
          <TouchableWithoutFeedback onPress={() => this.props.setSecure(true)}>
            <Image style={styles.icon} source={require('./img/seePassword2x.png')} resizeMode='contain'/>
          </TouchableWithoutFeedback>
      }
    </View>
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
  }
});

export default PasswordBtn;