import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';


import RecycledItemsList from '../containers/RecycleOrder/RecycledItemsList';


class RecycleOrder extends Component{

  render(){
    return (<ScrollView style={styles.container}>
      <RecycledItemsList />
    </ScrollView>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default RecycleOrder;