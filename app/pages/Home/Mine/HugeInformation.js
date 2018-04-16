import React,{Component} from 'react';
import {Dimensions, StyleSheet, View, WebView} from 'react-native';

import {Actions} from 'react-native-router-flux';


import config from '../../../util/request/config';

import Header from '../../../components/Header/Header';


let {width, height} = Dimensions.get('window');
let webViewHeight = height / width * 750 - 128; // Header 高度
// webView 放大倍数，因img有自适应，所以 主影响 字体大小
// 为防止 放大后，分辨率超过 设备分辨率，从而出现滚动条，这里仅 逆适配 设计稿750，
let scale = 750 / width;

class HugeInformation extends Component{

  constructor(props){
    super(props);

    this.state = {
      canGoBack: false
    };
  }

  render(){
    // 因为 全局适配 分辨率太高，网页字体显示小，此处 降低分辨率，放大字体。
    return <View style={styles.container}>
      <Header title='虎哥资讯' back={() => this.goBack()}/>
      <View style={styles.webView}>
        <WebView ref='webView' source={{uri: config.api.hugeInformation}} onNavigationStateChange={e => this.setGoBack(e)}/>
      </View>
    </View>
  }

  goBack(){
    if(this.state.canGoBack){
      this.refs.webView.goBack();
    }
    else{
      Actions.pop();
    }
  }

  setGoBack(e){
    this.setState({canGoBack: e.canGoBack});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    width: 750 / scale,
    height: webViewHeight / scale,
    transform: [
      {translateX: 750 / scale * -.5},
      {translateY: webViewHeight / scale * -.5},
      {scale},
      {translateX: 750 / scale * .5},
      {translateY: webViewHeight / scale * .5},
    ]
  }
});


export default HugeInformation;