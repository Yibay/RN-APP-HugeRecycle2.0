import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


class CallModule extends Component{
  render(){
    return (<View style={styles.container}>
      <View style={styles.callMsg}>
        <Text style={styles.callMsgText}>当前共有</Text>
        <Text style={styles.recyclablesNum}>2</Text>
        <Text style={styles.callMsgText}>项回收物</Text>
      </View>
      <TouchableOpacity>
        <View style={styles.callBtn}>
          <Text style={styles.callBtnText}>一键呼叫</Text>
        </View>
      </TouchableOpacity>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  callMsg: {
    height: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  callMsgText: {
    fontSize: 25
  },
  recyclablesNum: {
    paddingHorizontal: 15,
    fontSize: 30,
    color: 'red'
  },
  callBtn: {
    paddingVertical: 26,
    paddingHorizontal: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 102, 255, 1)'
  },
  callBtnText: {
    fontSize: 25,
    color: '#fff'
  }
});

export default CallModule;