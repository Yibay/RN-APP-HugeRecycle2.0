import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';


import Header from '../components/common/Header/Header';
import AddressSection from '../containers/RecycleOrder/AddressSection';
import RecycledItemsList from '../containers/RecycleOrder/RecycledItemsList';
import { verifyLogin } from '../HOC/verifyLogin';


class RecycleOrder extends Component{

  render(){
    return (<View style={styles.container}>
      <Header title='待回收物品'/>
      <AddressSection />
      <ScrollView style={styles.container}>
        <RecycledItemsList />
      </ScrollView>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default verifyLogin(RecycleOrder);