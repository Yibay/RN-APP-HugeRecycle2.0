import React,{Component} from 'react';
import {StyleSheet, View, WebView, Dimensions} from 'react-native';

import PropTypes from 'prop-types';


import Header from "../../../components/Header/Header";

let scale = 2; // webView 放大倍数，因img有自适应，所以 主影响 字体大小
let {width, height} = Dimensions.get('window');
let webViewHeight = height / width * 750 - 128; // Header 高度

class HugeInformationDetail extends Component{

  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render(){
    // 因为 全局适配 分辨率太高，网页字体显示小，此处 降低分辨率，放大字体。
    return <View style={styles.container}>
      <Header title='虎哥资讯'/>
      <View style={styles.webView}>
        <WebView source={{uri: this.props.url}}/>
      </View>
    </View>
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

export default HugeInformationDetail;