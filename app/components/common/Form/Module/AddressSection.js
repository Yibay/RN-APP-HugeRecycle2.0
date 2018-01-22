/**
 * 地址表单组件
 * 切换有无户号 地址表单
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import PropTypes from 'prop-types';
import _ from 'lodash';


import SelectorPicker from '../Selector/SelectorPicker';


class AddressSection extends Component {

  static propTypes = {
    onChangeText: PropTypes.func.isRequired // 更新数据，把数据同步到外面
  };

  constructor(props){
    super(props);

    this.state = {
      options: [
        { label: '有户号', value: true },
        { label: '无户号', value: false }
      ],
      stateUpdateFlag: false,
      haveHouseNumber: true,
      address: '',
      building: '',
      unit: '',
      room: ''
    }
  }

  render(){
    return (<View style={styles.container}>
      {/* 切换 有无户号的 选择器 */}
      <SelectorPicker style={styles.SelectorPicker} selectedValue={this.state.haveHouseNumber} options={this.state.options} confirmPickerVal={val => this.selectHouseNumberType(val)} />
      {/* 有户号 地址模块 */}
      <View style={[this.state.haveHouseNumber ? styles.haveHouseNumberSection : styles.hide]}>
        <TextInput underlineColorAndroid="transparent" value={this.state.building} onChangeText={val => this.onlyEnterNumbersAndLetters({building: val.trim()})} keyboardType='numeric' style={[styles.msgText, styles.msgTextInput, styles.address]} />
        <Text style={styles.msgText}>栋</Text>
        <TextInput underlineColorAndroid="transparent" value={this.state.unit} onChangeText={val => this.onlyEnterNumbers({unit: val.trim()})} keyboardType='numeric' style={[styles.msgText, styles.msgTextInput, styles.address]} />
        <Text style={styles.msgText}>单元</Text>
        <TextInput underlineColorAndroid="transparent" value={this.state.room} onChangeText={val => this.onlyEnterNumbers({room: val.trim()})} keyboardType='numeric' style={[styles.msgText, styles.msgTextInput, styles.address]} />
        <Text style={styles.msgText}>室</Text>
      </View>
      {/* 无户号 地址模块 */}
      <TextInput underlineColorAndroid="transparent" value={this.state.address} onChangeText={val => this.setState({address: val.trim(), stateUpdateFlag: true})}  style={[this.state.haveHouseNumber ? styles.hide : styles.msgText, styles.msgTextInput, styles.address]}/>
    </View>)
  }

  componentDidUpdate(){
    // state数据更新后，同步给外部 (stateUpdateFlag 防止死循环： 父组件state更新会触发子组件update)
    if(this.state.stateUpdateFlag){
      this.props.onChangeText(_.omit(this.state, ['options', 'stateUpdateFlag']));
      this.setState({stateUpdateFlag: false});
    }
  }

  // 切换 有无户号
  selectHouseNumberType(val){
    this.setState({
      haveHouseNumber: val,
      stateUpdateFlag: true // flag标记 内部state更新了
    });
  }

  // 只能输入数字和字母
  onlyEnterNumbersAndLetters(valObj){
    // 过滤出，val为字母和数字的key值
    let validKeys = Reflect.ownKeys(valObj).filter(key => /^[0-9a-zA-Z]*$/.test(valObj[key]));
    // 仅保留val为字母和数字的key
    this.setState(_.merge(_.pick(valObj, validKeys), { stateUpdateFlag: true })); // flag标记 内部state更新了
  }

  // 只能输入数字
  onlyEnterNumbers(valObj){
    // 过滤出，val为数字的key值
    let validKeys = Reflect.ownKeys(valObj).filter(key => Number(valObj[key]) == valObj[key]);
    // 仅保留 val为数字的key
    this.setState(_.merge(_.pick(valObj, validKeys), { stateUpdateFlag: true })); // flag标记 内部state更新了
  }

}

const styles = StyleSheet.create({
  container: {
    height: 106,
    paddingHorizontal: 34,
    paddingVertical: 24,
    borderColor: '#e1e5e8',
    borderBottomWidth: 2,
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
    borderWidth: 1,
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


export default AddressSection;