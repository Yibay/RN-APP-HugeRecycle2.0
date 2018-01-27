import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, TextInput, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';


import { createOrderValidator } from '../util/form/recycleOrderValidator';
import request from '../util/request/request';
import config from '../util/request/config';

import { verifyLogin } from '../HOC/verifyLogin';
import Header from '../components/common/Header/Header';
import OrderAddressSection from '../containers/RecycleOrder/AddressSection/OrderAddressSection';
import RecycledItemsList from '../containers/RecycleOrder/RecycledItemsList';
import SubmitBtn from '../components/common/Form/Btn/SubmitBtn';


class RecycleOrder extends Component{

  static propTypes = {
    recyclableGoods: PropTypes.object.isRequired,
    currentLocation: PropTypes.object.isRequired,
    recycledItemsList: PropTypes.object.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      isAerialWork: false,
      remarks: ''
    };
  }

  render(){
    return (<View style={styles.container}>
      {/* 页头 */}
      <Header title='待回收物品'/>
      {/* 地址模块 */}
      <OrderAddressSection />
      <ScrollView style={styles.content}>
        {/* 回收物模块 */}
        <RecycledItemsList />
        {/* 拆卸空调模块 */}
        <View style={styles.AerialWorkSection}>
          <Text style={styles.AerialWorkMsg}>是否需要拆卸空调</Text>
          <View style={styles.AerialWorkSwitchSection}>
            <Text style={styles.AerialWorkMsg}>否</Text>
            <Switch style={styles.AerialWorkSwitch} value={this.state.isAerialWork} onValueChange={val => this.setState({isAerialWork: val})} />
            <Text style={styles.AerialWorkMsg}>是</Text>
          </View>
        </View>
        {/* 备注模块 */}
        <View style={styles.remarkSection}>
          <Text style={styles.remarksTitle}>如有特殊需求，请备注</Text>
          <TextInput style={styles.remarks} multiline={true} onChangeText={val => this.setState({remarks: val})} value={this.state.remarks} />
        </View>
        {/* 服务时间 */}
        <View style={styles.serviceTimeSection}>
          <Icon name='ios-time-outline' size={40} color='#828282' />
          <Text style={styles.serviceTime}>服务时间：08:00 - 17:00</Text>
        </View>
        {/* 呼叫按钮 */}
        <SubmitBtn text='确认呼叫' submit={() => this.createOrder()} style={styles.submitBtn} />
      </ScrollView>
    </View>);
  }

  async createOrder(){
    // 检验 地址一系列属性时，通过id，一步检验
    let orderParams = _.pick(this.props.currentLocation,['id','communityId','communityName','haveHouseNumber','building','unit','room','address']);
    orderParams.accountName = this.props.currentLocation.customerName;
    orderParams.phone = this.props.currentLocation.telNo;
    orderParams.isAerialWork = this.state.isAerialWork;
    orderParams.remarks = this.state.remarks;
    orderParams.orderSource = Platform.select({ios: 5, android: 4});
    orderParams.items = this.props.recycledItemsList.list.map(item => ({
      id: item.specsId,
      name: this.props.recyclableGoods.AllProductsObj[`sort${item.sort}`].subCategoryObj[`id${item.categoryId}`].name
        + ' ' + this.props.recyclableGoods.AllProductsObj[`sort${item.sort}`].subCategoryObj[`id${item.categoryId}`].specsObj[`id${item.specsId}`].name,
      num: item.itemNum
    }));

    // 检验 回收订单数据
    if(!createOrderValidator(orderParams)){
      // 未通过检验，则不执行下面 上传数据
      return;
    }

    // 最终上传参数，不需要传 id
    const res = await request.post(config.api.createOrder, _.omit(orderParams, ['id']), {'X-AUTH-TOKEN': this.props.identityToken.authToken})
    if(res && !res.status){
      Actions.callSuccessPage({alreadyLogged: true}); // 通知 呼叫成功页 已登录
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 拆卸空调模块
  AerialWorkSection: {
    height: 78,
    paddingHorizontal: 33,
    borderBottomWidth: 2,
    borderBottomColor: '#e4e5e7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  AerialWorkMsg: {
    fontSize: 26,
    fontWeight: '500'
  },
  AerialWorkSwitchSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  AerialWorkSwitch: {
    marginHorizontal: 20
  },
  // 备注模块
  remarkSection: {
    paddingHorizontal: 30,
    paddingTop: 36
  },
  remarksTitle: {
    fontSize: 22,
    color: '#888'
  },
  remarks: {
    height: 245,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#d5d5d5',
    borderRadius: 10,
    fontSize: 28,
    fontWeight: '700'
  },
  // 服务时间
  serviceTimeSection: {
    height: 76,
    paddingHorizontal: 30,
    marginBottom: 26,
    flexDirection: 'row',
    alignItems: 'center'
  },
  serviceTime: {
    marginLeft: 15,
    fontSize: 28,
    color: '#828282'
  },
  // 呼叫按钮
  submitBtn: {
    marginBottom: 130
  }
});

function mapStateToProps(state){
  return {
    recyclableGoods: state.recycle.recyclableGoods,
    currentLocation: state.location.currentLocation,
    recycledItemsList: state.recycle.recycledItemsList
  };
}

export default verifyLogin(connect(mapStateToProps)(RecycleOrder));