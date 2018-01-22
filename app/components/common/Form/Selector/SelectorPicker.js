/**
 *  选择器组件
 *  兼容 iOS, android
 *  调用 iOS, android 各自平台的原生 选择器
 */
import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, Picker, Modal, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';


class SelectorPicker extends Component {

  static propTypes = {
    options: PropTypes.arrayOf( // options 列表
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
          PropTypes.number
        ])
      })
    ),
    selectedValue: PropTypes.oneOfType([ // 选中options value值
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number
    ]),
    confirmPickerVal: PropTypes.func.isRequired // 选中 某options后，回调函数
  };

  constructor(props){
    super(props);

    this.state={
      selectedValue: props.selectedValue, // 主要供iOS使用
      VisibleOfPickerIOS: false, // 是否显示 iOS Modal
    }
  }

  render(){
    return Platform.select({
      ios: (<View>
        {/* 选择器 按钮 */}
        <TouchableWithoutFeedback onPress={() => this.showPickerIOS()}>
          <View style={[styles.selectorIOS].concat(this.props.style)}>
            <Text style={styles.pickerTextIOS}>{this.props.options.filter(item => item.value === this.props.selectedValue)[0].label}</Text>
            <Icon style={styles.arrowIcon} name='md-arrow-dropdown' size={50} />
          </View>
        </TouchableWithoutFeedback>
        {/* iOS 选择器弹窗 */}
        <Modal transparent={true} visible={this.state.VisibleOfPickerIOS} onRequestClose={() => this.onRequestClose()}>
          <View style={styles.containerIOS}>
            <View style={styles.pickerIOS}>
              {/* iOS原生滚动选择器 */}
              <Picker selectedValue={this.state.selectedValue} onValueChange={val => this.setState({selectedValue: val})}>
                {
                  this.props.options.map((item, index) => (<Picker.Item key={index} label={item.label} value={item.value} />))
                }
              </Picker>
              {/* 确认、取消按钮 */}
              <Text style={styles.confirmPickerValIOS} onPress={() => this.confirmPickerValIOS(this.state.selectedValue)}>确认</Text>
              <Text style={styles.cancelPickerValIOS} onPress={() => this.hidePickerIOS()}>取消</Text>
            </View>
          </View>
        </Modal>
      </View>),
      android: (<View style={[styles.containerAndroid].concat(this.props.style)}>
        {/* 伪装的选择器 按钮 */}
        <Text style={styles.pickerTextAndroid}>{this.props.options.filter(item => item.value === this.props.selectedValue)[0].label}</Text>
        <Icon style={styles.arrowIcon} name='md-arrow-dropdown' size={50} />
        {/* android真实的选择器 按钮透明化 */}
        <Picker style={styles.pickerAndroid} selectedValue={this.state.selectedValue} onValueChange={val => this.confirmPickerValAndroid(val)}>
          {
            this.props.options.map((item, index) => (<Picker.Item key={index} label={item.label} value={item.value} />))
          }
        </Picker>
      </View>)
    });
  }

  showPickerIOS(){
    this.setState({
      VisibleOfPickerIOS: true
    })
  }

  hidePickerIOS(){
    this.setState({
      VisibleOfPickerIOS: false
    })
  }

  confirmPickerValIOS(value){
    this.props.confirmPickerVal(value);
    this.hidePickerIOS();
  }

  // Android Modal 必须属性
  onRequestClose(){}

  confirmPickerValAndroid(value){
    this.props.confirmPickerVal(value);
    this.setState({ selectedValue: value });
  }
}

const styles = StyleSheet.create({
  selectorIOS: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: 150,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  pickerTextIOS: {
    fontSize: 26
  },
  containerIOS: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  pickerIOS: {
    backgroundColor: '#fff'
  },
  confirmPickerValIOS: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 18
  },
  cancelPickerValIOS: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 18
  },
  containerAndroid: {
    position: 'relative',
    alignSelf: 'stretch',
    width: 150,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflow: 'hidden'
  },
  pickerAndroid: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent', // 隐藏 Android下 Picker 自带 selector
    color: 'transparent' // 隐藏 Android下 Picker 自带 selector
  },
  pickerTextAndroid: {
    fontSize: 26,
    color: '#000'
  },
  arrowIcon: {
    marginLeft: 10
  }
});

export default SelectorPicker;