import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import { verifyLogin } from '../../../HOC/verifyLogin';

import Header from '../../../components/common/Header/Header';
import OrderAddressSection from '../../../containers/RecycleOrder/AddressSection/OrderAddressSection';


class MallCart extends Component {

  render(){
    return <View style={styles.container}>
      <Header title='订单结算'/>
      {/* 地址模块 */}
      <OrderAddressSection />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default verifyLogin(MallCart);