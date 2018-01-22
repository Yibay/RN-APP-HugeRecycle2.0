import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import AdaptLayoutWidth from '../../components/common/AdaptLayoutWidth';
import SelectorPicker from '../../components/common/Form/Selector/SelectorPicker';


class CallModal extends Component{

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideCallModal: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      haveHouseNumber: true, // 有无户号
      houseNumberPickerOptions: [
        { label: '有户号', value: true },
        { label: '无户号', value: false }
      ]
    }
  }

  render(){
    return (<Modal transparent={true} visible={this.props.visible} onRequestClose={() => this.onRequestClose()}>
      <AdaptLayoutWidth>
        <View style={styles.container}>
          <View style={styles.msgBox}>
            <Text style={styles.title}>您未选择可回收物，直接呼叫虎哥</Text>
            <View style={styles.lineSection}>
              <Text style={styles.msgText}>联系人</Text>
              <TextInput style={[styles.msgText, styles.msgTextInput, styles.linkman]} underlineColorAndroid="transparent" />
              <Text style={styles.msgText}>电话</Text>
              <TextInput style={[styles.msgText, styles.msgTextInput, styles.tel]} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.lineSection}>
              <Text style={styles.msgText}>小区名称 {this.props.currentLocation.communityName}</Text>
            </View>
            <View style={styles.lineSection}>
              {/* 有无户号 选择器 */}
              <SelectorPicker options={this.state.houseNumberPickerOptions} selectedValue={this.state.haveHouseNumber} confirmPickerVal={(val) => this.setHaveHouseNumber(val)} />
              <View style={[this.state.haveHouseNumber ? styles.haveHouseNumberSection : styles.hide]}>
                <TextInput style={[styles.msgText, styles.msgTextInput, styles.address]} underlineColorAndroid="transparent" />
                <Text style={styles.msgText}>栋</Text>
                <TextInput style={[styles.msgText, styles.msgTextInput, styles.address]} underlineColorAndroid="transparent" />
                <Text style={styles.msgText}>单元</Text>
                <TextInput style={[styles.msgText, styles.msgTextInput, styles.address]} underlineColorAndroid="transparent" />
                <Text style={styles.msgText}>室</Text>
              </View>
              <TextInput style={[this.state.haveHouseNumber ? styles.hide : styles.msgText, styles.msgTextInput, styles.address]} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.btnSection}>
              <TouchableOpacity style={[styles.btn, styles.btnConfirm]} onPress={() => this.confirmCall()}>
                <Text style={[styles.msgText, styles.btnConfirmText]}>确认呼叫</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => this.cancelCall()}>
                <Text style={styles.msgText}>取消呼叫</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </AdaptLayoutWidth>
    </Modal>);
  }

  cancelCall(){
    this.props.hideCallModal();
  }

  confirmCall(){
    // 检验数据

    // 发送请求
    console.log({
      communityId: this.props.currentLocation.communityId,
      communityName: this.props.currentLocation.communityName,
      haveHouseNumber: this.state.haveHouseNumber, // 有无户号
      isAerialWork: false  // 是否需要拆卸空调
    });

    // 发送成功后，关闭弹窗
    this.props.hideCallModal();
  }

  setHaveHouseNumber(haveHouseNumber){
     this.setState({
       haveHouseNumber: haveHouseNumber,
       // showHouseNumberPicker: false
     })
  }

  // Android Modal 必须属性
  onRequestClose(){}
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(215, 215, 215, 0.8)'
  },
  msgBox: {
    width: 700,
    paddingHorizontal:20,
    borderRadius: 50,
    alignItems: 'stretch',
    overflow: 'hidden',
    backgroundColor: '#eee'
  },
  title: {
    paddingVertical: 30,
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center'
  },
  lineSection: {
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  msgText: {
    fontSize: 30
  },
  btnSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    flex: 1,
    marginTop: 40,
    marginBottom: 50,
    paddingVertical: 20,
    alignItems: 'center'
  },
  btnConfirm: {
    marginRight: 30,
    backgroundColor: '#169bd5'
  },
  btnConfirmText: {
    color: '#fff'
  },
  btnCancel: {
    backgroundColor: 'rgba(249, 249, 249, 1)'
  },
  msgTextInput: {
    height: 50,
    padding: 0,
    borderWidth: 1
  },
  linkman: {
    flex: 2,
    marginLeft: 20,
    marginRight: 50
  },
  tel: {
    flex: 3,
    marginLeft: 20,
  },
  haveHouseNumberSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
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

function mapStateToProps(state){
  return {
    currentLocation: state.location.currentLocation
  }
}

export default connect(mapStateToProps)(CallModal);