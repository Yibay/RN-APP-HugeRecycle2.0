import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image, ViewPropTypes} from 'react-native';

import PropTypes from 'prop-types';


class PersonnelInformation extends PureComponent{

  static propTypes = {
    imgURL: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    name: PropTypes.string,
    phone: PropTypes.string,
    rightModule: PropTypes.element,
    imgStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    imgURL: require('../../assets/img/personalImage2x.png'),
  };

  render(){
    return <View style={[styles.basicFacts].concat(this.props.style)}>
      <Image style={[styles.personalImage].concat(this.props.imgStyle)} source={this.props.imgURL} resizeMode='contain' />
      <View style={styles.message}>
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.phone}>{this.props.phone}</Text>
        <View style={styles.rightModule}>
          {
            this.props.rightModule
          }
        </View>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  // 基本信息
  basicFacts: {
    marginBottom: 12,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  // 个人头像
  personalImage: {
    alignSelf: 'center',
    width: 157,
    height: 157,
    marginHorizontal: 24
  },
  // 个人信息
  message: {
    position: 'relative',
    flex: 1,
    height: 188,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  // 个人名称
  name: {
    marginBottom: 24,
    fontSize: 32,
    fontWeight: '900',
    color: '#000'
  },
  phone: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000'
  },
  rightModule: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },
});

export default PersonnelInformation;