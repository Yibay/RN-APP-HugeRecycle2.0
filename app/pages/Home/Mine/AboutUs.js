import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';


import config from '../../../util/request/config';

import Header from "../../../components/Header/Header";


class AboutUs extends Component{
  render(){
    return <View style={styles.container}>
      <Header title='关于我们'/>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Image style={styles.logo} source={require('../../../assets/img/hugeLogo2x.png')} resizeMode='contain' />
        </View>
        <Text style={styles.intro}>
          虎哥回收回收是浙江九仓再生资源开发有限公司自主打造的废旧物资回收平台，通过线上平台和线下物流体系相结合，搭建再生资源"互联网＋回收"的立体服务平台，回收社会可再生资源。
        </Text>
        <Text style={styles.version}>
          软件版本号：v{config.version}
        </Text>
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
    lineHeight: 44
  },
  version: {
    fontSize: 24,
    color: '#888'
  }
});

export default AboutUs;