import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, TextInput, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';


import { verifyLogin } from '../HOC/verifyLogin';
import Header from '../components/common/Header/Header';
import AddressSection from '../containers/RecycleOrder/AddressSection/AddressSection';
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
      <AddressSection />
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

  createOrder(){
    let orderParams = _.pick(this.props.currentLocation,['communityId','communityName','haveHouseNumber','building','unit','room','address']);
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
    console.log(this.props.currentLocation); // 其id 不存在，认为 地址填写不完整
    console.log(orderParams);
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