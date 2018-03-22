import React,{Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';


class DigitItem extends Component{

  static propTypes = {
    code: PropTypes.string, // 数据
    encode: PropTypes.bool // 是否加密显示
  };

  static defaultProps = {
    encode: false
  };

  render(){
    return <View style={styles.digit}>
      {
        this.props.encode ?
          // 加密
          this.props.code ? <Icon size={30} name='circle' /> : undefined
          :
          // 不加密
          <Text style={styles.digitNum}>{this.props.code}</Text>
      }
    </View>;
  }
}

const styles = StyleSheet.create({
  digit: {
    position: 'relative',
    width: 106,
    height: 106,
    borderWidth: 2,
    borderColor: '#e7e7e7',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitNum: {
    fontSize: 50,
    textAlign: 'center'
  }
});


export default DigitItem;