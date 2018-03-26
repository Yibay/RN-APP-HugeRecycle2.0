import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback, NetInfo} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


class NetworkVerify extends Component {

  constructor(props){
    super(props);

    this.state = {
      isConnected: true
    }
  }

  componentWillMount(){
    // 初始化校正
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({isConnected});
    });

    // 动态监控
    this.connectionChange = isConnected => {
      this.setState({isConnected});
    };

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.connectionChange
    );
  }

  render(){
    return <View style={styles.container}>
      {
        this.state.isConnected ?
          this.props.children
          :
          <TouchableWithoutFeedback onPress={() => Actions.refresh()}>
            <View style={styles.noNetwork}>
              <Icons style={styles.icon} name='wifi-off' size={400} color='#eee' />
              <Text style={styles.noNetworkText}>你的网络被高智慧生物屏蔽了</Text>
              <Text style={styles.noNetworkText}>请开启网络</Text>
            </View>
          </TouchableWithoutFeedback>
      }
    </View>
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.connectionChange
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noNetwork: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  },
  icon: {
    marginBottom: -30
  },
  noNetworkText:{
    fontSize: 28,
    lineHeight: 56
  }
});

export default NetworkVerify;