import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Platform, Alert, Keyboard } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';


import { createOrderValidator } from '../../util/form/recycleOrderValidator';
import validator from "../../util/form/validator";
import {fetchRecycleOrderThunk} from "../../redux/actions/Recycle";
import {getCode,clearData} from '../../redux/actions/verificationCode/createRecycleOrder';

import AdaptLayoutWidth from '../../components/AdaptLayoutWidth';
import HouseNumberAddressSection from '../../components/Form/Module/HouseNumberAddressSection';
import InputSection from '../../components/Form/Input/InputSection';
import CountDownBtn from '../../components/Form/Btn/CountDownBtn';
import Loading from "../../components/Alert/Loading";
import KeyboardAvoidingViewAdapt from '../../components/KeyboardAvoidingViewAdapt';


class CallModal extends Component{

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideCallModal: PropTypes.func.isRequired,
    createOrderFetching: PropTypes.bool.isRequired,
    verificationCode: PropTypes.shape({
      data: PropTypes.string.isRequired,
      isFetching: PropTypes.bool.isRequired,
    }),
    fetchRecycleOrderThunk: PropTypes.func.isRequired,
    getCode: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);

    this.state = {
      accountName: props.currentLocation.customerName ? props.currentLocation.customerName : '',
      phone: props.currentLocation.telNo ? props.currentLocation.telNo : '',
      haveHouseNumber: typeof props.currentLocation.haveHouseNumber !== 'undefined' ? props.currentLocation.haveHouseNumber : true, // 有无户号
      address: props.currentLocation.address ? props.currentLocation.address : '',
      building: props.currentLocation.building ? props.currentLocation.building : '',
      unit: props.currentLocation.unit ? props.currentLocation.unit : '',
      room: props.currentLocation.room ? props.currentLocation.room : '',
      code: ''
    }
  }

  componentWillReceiveProps(nextProps){
    // 更新过地址
    if(nextProps.currentLocation.communityId !== this.props.currentLocation.communityId){
      this.setState(
        _.assign(
          {},
          nextProps.currentLocation.customerName ? {accountName: nextProps.currentLocation.customerName} : {accountName: ''},
          nextProps.currentLocation.telNo ? {phone: nextProps.currentLocation.telNo} : {phone: ''},
          typeof nextProps.currentLocation.haveHouseNumber !== 'undefined' ? {haveHouseNumber: nextProps.currentLocation.haveHouseNumber} : {haveHouseNumber: true},
          nextProps.currentLocation.address ? {address: nextProps.currentLocation.address} : {address: ''},
          nextProps.currentLocation.building ? {building: nextProps.currentLocation.building} : {building: ''},
          nextProps.currentLocation.unit ? {unit: nextProps.currentLocation.unit} : {unit:''},
          nextProps.currentLocation.room ? {room: nextProps.currentLocation.room} : {room:''},
        )
      );
    }
  }

  render(){
    return (<Modal transparent={true} visible={this.props.visible} onRequestClose={() => this.onRequestClose()}>
      <AdaptLayoutWidth>
        {/* 关闭软键盘，触发input失焦 */}
        <KeyboardAvoidingViewAdapt style={styles.container} behavior='padding' onStartShouldSetResponder={evt => true} onResponderRelease={evt => Keyboard.dismiss()}>
          <View style={styles.msgBox}>
            <Text style={styles.title}>确认您的联系方式，呼叫虎哥</Text>
            <InputSection style={styles.lineSection} value={this.state.accountName} onChangeText={val => this.setState({accountName: val.trim()})} label='联系人' placeholder='请输入联系人姓名'/>
            <InputSection style={styles.lineSection} value={this.state.phone} onChangeText={val => this.setState({phone: val.trim()})} label='电话' placeholder='请输入联系人电话' keyboardType='phone-pad'/>
            {
              !this.props.authToken ?
                <InputSection style={styles.lineSection} value={this.state.code} onChangeText={val => this.setState({code: val.trim()})} label='短信验证码' placeholder='请输入验证码' rightButton={<CountDownBtn text='获取验证码' onPress={() => this.getCode()}/>}/>
                :
                null
            }
            <InputSection style={styles.lineSection} value={this.props.currentLocation.communityName} label='小区名称' editable={false}/>
            <View style={styles.lineSection}>
              {/* 有无户号 选择器 */}
              <HouseNumberAddressSection onChangeText={valObj => this.setState(valObj)} currentLocation={this.props.currentLocation} />
            </View>
            <View style={styles.btnSection}>
              <TouchableOpacity style={[styles.btn, styles.btnConfirm, this.props.createOrderFetching ? styles.disable : undefined]} onPress={() => this.confirmCall()}>
                <Text style={[styles.msgText, styles.btnConfirmText]}>{this.props.createOrderFetching ? '呼叫中' : '确认呼叫'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => this.cancelCall()}>
                <Text style={styles.msgText}>取消</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingViewAdapt>
        <Loading show={this.props.verificationCode.isFetching}/>
      </AdaptLayoutWidth>
    </Modal>);
  }

  componentDidUpdate(){
    // 请求验证码 结果显示
    if(!this.props.verificationCode.isFetching && this.props.verificationCode.data){
      Alert.alert(this.props.verificationCode.data);
      this.props.clearData();
    }
  }

  // 取消呼叫
  cancelCall(){
    if(this.props.createOrderFetching){return;}

    this.props.hideCallModal();
  }

  // 确认呼叫
  async confirmCall(){
    if(this.props.createOrderFetching){return;}

    // 构造请求数据
    let params = _.assign(
      {},
      _.pick(this.props.currentLocation, ['id','cityId','city','regionId','region','streetId','street','communityId', 'communityName']), // 小区信息
      _.omit(this.state,['createOrderFetching']) // 联系人、电话、有无户号等信息
    );
    params.isAerialWork = false; // 是否需要拆卸空调
    params.orderSource = Platform.select({ android: 4, ios: 5 });
    if(params.haveHouseNumber){
      params.address = `${params.building}-${params.unit}-${params.room}`;
    }
    params.items = this.props.recycledItemsList.list.map(item => ({
      id: item.specsId,
      name: this.props.recyclableGoods.AllProductsObj[`sort${item.sort}`].subCategoryObj[`id${item.categoryId}`].name
      + ' ' + this.props.recyclableGoods.AllProductsObj[`sort${item.sort}`].subCategoryObj[`id${item.categoryId}`].specsObj[`id${item.specsId}`].name,
      num: item.itemNum
    }));
    console.log(params);
    console.log(this.props.currentLocation);

    // 检验数据
    if(!createOrderValidator(params)){
      return;
    }
    // 调整格式
    if(params.haveHouseNumber){
      params.building.toUpperCase(); // 统一转成 大写字母
      params.unit = Number(params.unit);
      params.room = Number(params.room);
    }


    // 若已登录
    if(this.props.authToken){
      let res = await this.props.fetchRecycleOrderThunk(params);
      if(res.status){return;}
    }
    // 若未登录
    else {
      // 带验证码 发送请求
      if(validator.isEmpty(this.state.code)){
        Alert.alert('请输入验证码');
        return;
      }
      // 带 code 短信验证码 发送请求
      params.code = this.state.code;
      // 发送请求
      let res = await this.props.fetchRecycleOrderThunk(params);
      if(res.status){return;}
    }

    // 发送成功后，关闭弹窗
    this.props.hideCallModal();
  }

  // 获取验证码
  async getCode(){
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('请填写正确的手机号码');
      return false;
    }
    const res = await this.props.getCode(this.state.phone);
    return res;
  }

  // Android Modal 必须属性
  onRequestClose(){}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(215, 215, 215, 0.8)',
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
    backgroundColor: '#ffd101'
  },
  btnConfirmText: {
    fontWeight: '700',
    color: '#fff'
  },
  disable: {
    backgroundColor: '#888'
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
    currentLocation: state.location.currentLocation,
    authToken: state.identityToken.authToken,
    recycledItemsList: state.recycle.recycledItemsList,
    recyclableGoods: state.recycle.recyclableGoods,
    createOrderFetching: state.recycle.recycleOrder.isFetching,
    verificationCode: state.verificationCode.createRecycleOrder,
  }
}

export default connect(mapStateToProps, {fetchRecycleOrderThunk, getCode, clearData})(CallModal);