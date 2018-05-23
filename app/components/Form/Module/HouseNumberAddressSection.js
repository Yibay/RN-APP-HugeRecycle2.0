/**
 * 门牌号地址 表单组件
 * 切换有无户号 地址表单
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import PropTypes from 'prop-types';
import _ from 'lodash';


import SelectorPicker from '../Selector/SelectorPicker';


class HouseNumberAddressSection extends Component {

  static propTypes = {
    onChangeText: PropTypes.func.isRequired, // 更新数据，把数据同步到外面
    currentLocation: PropTypes.object.isRequired // 里面的参数 在新定位小区时，可能都为空，所以不设shape
  };

  static defaultProps = {
    currentLocation: {}
  };

  constructor(props){
    super(props);

    this.state = {
      options: [
        { label: '有户号', value: true },
        { label: '无户号', value: false }
      ],
      stateUpdateFlag: false,
      haveHouseNumber: typeof this.props.currentLocation.haveHouseNumber !== 'undefined' ? this.props.currentLocation.haveHouseNumber : true,
      address: this.props.currentLocation.address ? this.props.currentLocation.address : '',
      building: this.props.currentLocation.building ? this.props.currentLocation.building : '',
      unit: this.props.currentLocation.unit ? this.props.currentLocation.unit : '',
      room: this.props.currentLocation.room ? this.props.currentLocation.room : ''
    }
  }

  render(){
    return (<View style={[styles.container].concat(this.props.style)}>
      {/* 切换 有无户号的 选择器 */}
      <SelectorPicker style={styles.SelectorPicker} selectedValue={this.state.haveHouseNumber} options={this.state.options} confirmPickerVal={val => this.selectHouseNumberType(val)} />
      {/* 有户号 地址模块 */}
      <View style={[this.state.haveHouseNumber ? styles.haveHouseNumberSection : styles.hide]}>
        <TextInput underlineColorAndroid="transparent" value={this.state.building} onChangeText={val => this.onlyEnterNumbersAndLetters({building: val.trim()})} keyboardType='default' style={[styles.msgText, styles.msgTextInput, styles.address]} />
        <Text style={styles.msgText}>栋</Text>
        <TextInput underlineColorAndroid="transparent" value={this.state.unit} onChangeText={val => this.onlyEnterNumbers({unit: val.trim()})} keyboardType='numeric' style={[styles.msgText, styles.msgTextInput, styles.address]} />
        <Text style={styles.msgText}>单元</Text>
        <TextInput underlineColorAndroid="transparent" value={this.state.room} onChangeText={val => this.onlyEnterNumbers({room: val.trim()})} keyboardType='numeric' style={[styles.msgText, styles.msgTextInput, styles.address]} />
        <Text style={styles.msgText}>室</Text>
      </View>
      {/* 无户号 地址模块 */}
      <TextInput underlineColorAndroid="transparent" value={this.state.address} onChangeText={val => this.setState({address: val.trim(),building:'',unit:'',room:'', stateUpdateFlag: true})}  style={[this.state.haveHouseNumber ? styles.hide : styles.msgText, styles.msgTextInput, styles.address]}/>
    </View>)
  }

  componentDidUpdate(){
    // state数据更新后，同步给外部 (stateUpdateFlag 防止死循环： 父组件state更新会触发子组件update)
    if(this.state.stateUpdateFlag){
      console.log(this.state);
      this.props.onChangeText(_.omit(this.state, ['options', 'stateUpdateFlag']));
      this.setState({stateUpdateFlag: false});
    }
  }

  // 切换 有无户号
  selectHouseNumberType(val){
    this.setState(
      {
        haveHouseNumber: val,
        stateUpdateFlag: true // flag标记 内部手动更新 state了
      }
    );
  }

  // 只能输入数字和字母
  onlyEnterNumbersAndLetters(valObj){
    // 过滤出，val为字母和数字的key值
    let validKeys = Object.keys(valObj).filter(key => /^[0-9a-zA-Z]*$/.test(valObj[key]));
    // 仅保留val为字母和数字的key
    this.setState(_.merge(_.pick(valObj, validKeys), { stateUpdateFlag: true })); // flag标记 内部手动更新 state了
  }

  // 只能输入数字
  onlyEnterNumbers(valObj){
    // 过滤出，val为数字的key值
    let validKeys = Object.keys(valObj).filter(key => Number(valObj[key]) == valObj[key]);
    // 仅保留 val为数字的key
    this.setState(_.merge(_.pick(valObj, validKeys), { stateUpdateFlag: true })); // flag标记 内部手动更新 state了
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  // 有无户号 选择器
  SelectorPicker: {
    height: 58
  },
  // 幢、单元、室 || 详细地址 模块
  haveHouseNumberSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  msgText: {
    fontSize: 26,
    color: '#888'
  },
  msgTextInput: {
    height: 58,
    padding: 0,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 10,
    color: '#000'
  },
  address: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center'
  },
  hide: {
    display: 'none'
  }
});


export default HouseNumberAddressSection;