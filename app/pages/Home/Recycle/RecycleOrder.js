import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Switch } from 'react-native-switch';


import { createOrderValidator } from '../../../util/form/recycleOrderValidator';
import { fetchRecycleOrderThunk } from '../../../redux/actions/Recycle';

import { verifyLogin } from '../../../HOC/verifyLogin';
import Header from '../../../components/Header/Header';
import OrderAddressSection from '../../../containers/RecycleOrder/AddressSection/OrderAddressSection';
import RecycledItemsList from '../../../containers/RecycleOrder/RecycledItemsList';
import SubmitBtn from '../../../components/Form/Btn/SubmitBtn';
import Remark from "../../../components/Form/Input/Remark";


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
      remarks: '',
    };
  }

  render(){

    // 回收物中，是否有空调
    let hasAirConditioner = !!this.props.recycledItemsList.list.filter(item => item.categoryId === 5).length;

    return (<View style={styles.container} ref='componentExisted'>
      {/* 页头 */}
      <Header title='待回收物品'/>
      {/* 地址模块 */}
      <OrderAddressSection />
      <ScrollView style={styles.content}>
        {/* 回收物模块 */}
        <RecycledItemsList />
        {/* 拆卸空调模块 */}
        {
          hasAirConditioner ?
            <View style={styles.AerialWorkSection}>
              <Text style={styles.AerialWorkMsg}>是否需要拆卸空调<Text style={styles.AerialWorkPrice}>（拆卸费 50元）</Text></Text>
              <Switch containerStyle={styles.AerialWorkSwitch}
                  value={this.state.isAerialWork}
                  onValueChange={val => this.setState({isAerialWork: val})}
                  activeText='是' inActiveText='否'
                  backgroundActive='#fed309'
                  circleSize={40}
                  activeTextStyle={[styles.AerialWorkSwitchText, styles.activeTextStyle]}
                  inactiveTextStyle={styles.AerialWorkSwitchText}/>
            </View>
            :
            undefined
        }
        {/* 备注模块 */}
        <Remark title='如有特殊需求，请备注' value={this.state.remarks} onChangeText={val => this.setState({remarks: val})}/>
        {/* 服务时间 */}
        <View style={styles.serviceTimeSection}>
          <Icon name='ios-time-outline' size={40} color='#828282' />
          <Text style={styles.serviceTime}>服务时间：08:00 - 17:00</Text>
        </View>
        {/* 呼叫按钮 */}
        <SubmitBtn text={this.props.createOrderFetching ? '呼叫中' : '确认呼叫'} submit={() => this.createOrder()} style={styles.submitBtn} disable={this.props.createOrderFetching} />
      </ScrollView>
    </View>);
  }

  async createOrder(){
    if(this.props.createOrderFetching){
      return;
    }

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
      return;
    }
    console.log(orderParams);

    // 下回收订单
    this.props.fetchRecycleOrderThunk(_.omit(orderParams, ['id']));
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
  AerialWorkPrice: {
    color: 'red'
  },
  AerialWorkSwitch: {
    marginHorizontal: 20,
    overflow: 'hidden'
  },
  AerialWorkSwitchText: {
    fontSize: 25
  },
  activeTextStyle: {
    color: '#000'
  },
  // 备注模块
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
    recycledItemsList: state.recycle.recycledItemsList,
    createOrderFetching: state.recycle.recycleOrder.isFetching
  };
}

export default verifyLogin(connect(mapStateToProps, {fetchRecycleOrderThunk})(RecycleOrder));