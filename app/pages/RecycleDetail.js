import React, {PureComponent} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';


import Header from "../components/Header/Header";
import OrderStatusBar from "../containers/RecycleDetail/OrderStatusBar";
import Section from "../containers/RecycleDetail/Section";
import PersonnelInformation from "../components/Section/PersonnelInformation";
import RecordBtn from "../components/Form/Btn/RecordBtn";
import RecycledItemsList from "../containers/RecycleDetail/RecycledItemsList";


class RecycleDetail extends PureComponent{

  static propTypes = {
    recordItem: PropTypes.shape({
      // 订单状态
      orderStatusId: PropTypes.number,
      gradeStatus: PropTypes.number,
      // 回收地址
      phone: PropTypes.string,
      addr: PropTypes.string,
      // 待回收物品
      recycleCategoryDesc: PropTypes.string,
      // 回收人员信息
      tServiceOrder: PropTypes.shape({
        recyclerHeadPic: PropTypes.string,
        recyclerName: PropTypes.string,
        recyclerPhone: PropTypes.string,
        // 实际回收物品
        orderItems: PropTypes.arrayOf(
          PropTypes.shape({
            category: PropTypes.string,
            spec: PropTypes.string,
            quantity: PropTypes.number, // 回收物品数量
            integral: PropTypes.number, // 环保金单价
            amount: PropTypes.number, // 获得现金
          })
        ),
        // 环保金信息
        phone: PropTypes.string, // 获得环保金 电话
        orderScore: PropTypes.number, // 获得环保金金额
        payAmount: PropTypes.number, // 获得现金金额
      }),
      // 订单号
      id: PropTypes.number,
    }),
  };

  render(){
    return <View style={styles.container}>
      <Header title='回收单详情'/>
      <ScrollView style={styles.content}>
        {/* 订单状态 */}
        <OrderStatusBar statusText={'待评价'}/>
        {/* 回收人员信息 */}
        <Section title='回收人员信息'>
          <PersonnelInformation style={styles.personnelInformation} imgStyle={styles.personalImage} name={'张三'} phone={'13512341234'} rightModule={
            <RecordBtn text='评价' onPress={() => {Actions.recycleDetailPage()}} />
          } />
        </Section>
        {/* 实际回收物品 */}
        <Section title='回收物品'>
          <RecycledItemsList />
        </Section>
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  content: {
    flex: 1,
  },
  // 回收人员信息
  personnelInformation: {
    marginTop: 10,
    marginBottom: 0,
  },
  personalImage: {
    marginLeft: 0,
  },
});

export default RecycleDetail;