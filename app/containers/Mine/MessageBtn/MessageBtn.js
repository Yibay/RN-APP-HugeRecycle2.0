import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';


class MessageBtn extends Component {
  render(){
    return <TouchableWithoutFeedback>
      <View style={[styles.container].concat(this.props.style)}>
        <Image style={styles.icon} source={require('./img/msg2x.png')}  resizeMode='contain' />
      </View>
    </TouchableWithoutFeedback>
  }
}

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    width: 32,
    height: 37
  }
});

export default MessageBtn;