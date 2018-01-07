import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';


/* 回收页 nav 右侧按钮组件 */
class NavBarRightButton extends Component{
  render(){
    return(<TouchableOpacity style={styles.container} onPress={() => Actions.locationPage()}>
      <Image style={styles.icon} resizeMode='contain' source={require('./img/location.png')} />
      <Text style={styles.text}>{this.props.currentLocation}</Text>
    </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 45,
    height: 45
  },
  text: {
    fontSize: 28
  }
});


// 过滤出有用state映射给props
function mapStateToProps(state){
  return {
    currentLocation: state
  }
}

export default connect(mapStateToProps)(NavBarRightButton);