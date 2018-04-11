import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';


import config from '../../../util/request/config';

import Header from "../../../components/Header/Header";
import TextAdaption from "../../../components/Text/TextAdaption";


class AboutUs extends Component{
  render(){
    return <View style={styles.container}>
      <Header title='关于我们'/>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Image style={styles.logo} source={require('../../../assets/img/hugeLogo2x.png')} resizeMode='contain' />
        </View>
        <TextAdaption style={styles.intro}>
          “虎哥回收”是浙江九仓再生资源开发有限公司旗下的“互联网+生活垃圾分类回收”品牌特色项目，专注于城市居民生活垃圾分类和再生资源回收，通过互联网、物联网、大数据与信息管理公共平台等现代信息技术手段，打造了一条“家庭垃圾袋—小区服务站—清运车—分选总仓”的垃圾分类处置高速公路，开创了中国城市垃圾分类回收和再生资源综合利用的新模式，实现生活垃圾减量化、资源化、无害化处理，为城市生态文明建设和循环经济发展贡献力量。。
        </TextAdaption>
        <TextAdaption style={styles.version}>
          软件版本号：v{config.versionIOS}
        </TextAdaption>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center'
  },
  logoSection: {
    paddingVertical: 70,
    width: 682,
    borderBottomWidth: 2,
    borderBottomColor: '#dedfe1',
    alignItems: 'center'
  },
  intro: {
    paddingTop: 35,
    paddingBottom: 55,
    width: 620,
    fontSize: 26,
    color: '#000',
    lineHeight: 44,
    textAlign: 'justify'
  },
  version: {
    fontSize: 24,
    color: '#888'
  }
});

export default AboutUs;