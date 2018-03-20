import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Platform, Alert } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Actions } from "react-native-router-flux";


import { createOrderValidator } from '../../util/form/recycleOrderValidator';
import request from '../../util/request/request';
import config from '../../util/request/config';
import validator from "../../util/form/validator";
import {showRecycleOrderError} from "../../util/alertError";
import {resetRecycledItem} from "../../redux/actions/Recycle";

import AdaptLayoutWidth from '../../components/AdaptLayoutWidth';
import HouseNumberAddressSection from '../../components/Form/Module/HouseNumberAddressSection';
import InputSection from '../../components/Form/Input/InputSection';
import RecordBtn from '../../components/Form/Btn/RecordBtn';


class CallModal extends Component{

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideCallModal: PropTypes.func.isRequired
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
      code: '',
      createOrderFetching: false // 呼叫中
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState(
      _.assign(
        {},
        nextProps.currentLocation.customerName ? { accountName: nextProps.currentLocation.customerName } : {},
        nextProps.currentLocation.telNo ? { phone: nextProps.currentLocation.telNo } : {},
        typeof nextProps.currentLocation.haveHouseNumber !== 'undefined' ? { haveHouseNumber: nextProps.currentLocation.haveHouseNumber } : {},
        nextProps.currentLocation.address ? { address: nextProps.currentLocation.address } : {},
        nextProps.currentLocation.building ? { building: nextProps.currentLocation.building } : {},
        nextProps.currentLocation.unit ? { unit: nextProps.currentLocation.unit } : {},
        nextProps.currentLocation.room ? { room: nextProps.currentLocation.room } : {},
      )
    );
  }

  render(){
    return (<Modal transparent={true} visible={this.props.visible} onRequestClose={() => this.onRequestClose()}>
      <AdaptLayoutWidth>
        <View style={styles.container}>
          <View style={styles.msgBox}>
            <Text style={styles.title}>您未选择可回收物，直接呼叫虎哥</Text>
            <InputSection style={styles.lineSection} value={this.state.accountName} onChangeText={val => this.setState({accountName: val.trim()})} label='联系人' placeholder='请输入联系人姓名'/>
            <InputSection style={styles.lineSection} value={this.state.phone} onChangeText={val => this.setState({phone: val.trim()})} label='电话' placeholder='请输入联系人电话'/>
            {
              !this.props.authToken ?
                <InputSection style={styles.lineSection} value={this.state.code} onChangeText={val => this.setState({code: val.trim()})} label='短信验证码' placeholder='请输入验证码' rightButton={<RecordBtn text='获取验证码' submit={() => {this.getCode()}}/>}/>
                :
                null
            }
            <InputSection style={styles.lineSection} value={this.props.currentLocation.communityName} label='小区名称' editable={false}/>
            <View style={styles.lineSection}>
              {/* 有无户号 选择器 */}
              <HouseNumberAddressSection onChangeText={valObj => this.setState(valObj)} currentLocation={this.props.currentLocation} />
            </View>
            <View style={styles.btnSection}>
              <TouchableOpacity style={[styles.btn, styles.btnConfirm, this.state.createOrderFetching ? styles.disable : undefined]} onPress={() => this.confirmCall()}>
                <Text style={[styles.msgText, styles.btnConfirmText]}>{this.state.createOrderFetching ? '呼叫中' : '确认呼叫'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => this.cancelCall()}>
                <Text style={styles.msgText}>取消</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </AdaptLayoutWidth>
    </Modal>);
  }

  // 取消呼叫
  cancelCall(){
    if(this.state.createOrderFetching){return;}

    this.props.hideCallModal();
  }

  // 确认呼叫
  async confirmCall(){
    if(this.state.createOrderFetching){return;}

    this.setState({createOrderFetching: true});

    // 请求数据
    let params = _.assign(
      {},
      _.pick(this.props.currentLocation, ['communityId', 'communityName']), // 小区信息
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

    // 检验数据
    if(!createOrderValidator(params)){
      this.setState({createOrderFetching: false});
      return;
    }

    // 发送请求
    // 若已登录
    if(this.props.authToken){
      // 带 X-AUTH-TOKEN 发送请求
      let res = await request.post(config.api.createOrder, params, {'X-AUTH-TOKEN': this.props.authToken});
      if(res && !res.status){
        Actions.callSuccessPage({alreadyLogged: true}); // 通知 呼叫成功页 已登录
      }
      else{
        this.setState({createOrderFetching: false});
        showRecycleOrderError(res);
        return;
      }
    }
    // 若未登录
    else {
      // 带验证码 发送请求
      if(validator.isEmpty(this.state.code)){
        Alert.alert('请输入验证码');
        this.setState({createOrderFetching: false});
        return;
      }
      // 带 code 短信验证码 发送请求
      params.code = this.state.code;
      let res = await request.post(config.api.createOrder, params);
      if(res && !res.status){
        Actions.callSuccessPage({alreadyLogged: false}); // 通知 呼叫成功页 已登录
      }
      else{
        this.setState({createOrderFetching: false});
        showRecycleOrderError(res);
        return;
      }
    }
    // 清空 回收物品列表
    const products = await request.get(config.api.getProducts);
    if(products && !products.status){
      this.props.resetRecycledItem(products.data);
    }

    // 发送成功后，关闭弹窗
    this.props.hideCallModal();
    this.setState({createOrderFetching: false});
  }

  // 获取验证码
  async getCode(){
    if(!validator.isPhone(this.state.phone)){
      Alert.alert('请填写正确的手机号码');
      return;
    }
    const res = await request.post(config.api.getCode, {phone:this.state.phone});
    // 发送成功 status 为 0，弹出 返回的data信息
    if(res && !res.status){
      Alert.alert(res.data);
    }
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
    recyclableGoods: state.recycle.recyclableGoods
  }
}

export default connect(mapStateToProps, {resetRecycledItem})(CallModal);