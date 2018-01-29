import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Header from '../../components/common/Header/Header';


class Mall extends Component{
  render(){
    return (<View style={styles.container}>
      <Header title='虎哥便利店' hideBack={true}/>
      <Text>商场</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Mall;