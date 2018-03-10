import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, RefreshControl, Image, TouchableWithoutFeedback } from 'react-native';

import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';


import { verifyLogin } from '../../../HOC/verifyLogin';
import request from '../../../util/request/request';
import config from '../../../util/request/config';
import { changeIdentityToken } from '../../../util/task/IdentityToken';
import { emptyIdentityToken } from '../../../redux/actions/IdentityToken';

import Header from '../../../components/Header/Header';
import MsgBtn from '../../../containers/Mine/MessageBtn/MessageBtn';
import LineSection from '../../../components/LineSection/LineSection';
import SubmitBtn from '../../../components/Form/Btn/SubmitBtn';


class Mine extends Component {

  static propTypes = {
    identityToken: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.string.isRequired
      }),
      authToken: PropTypes.string.isRequired
    })
  };

  constructor(props){
    super(props);

    this.state = {
      customerScore: 0,
      isRefreshing: false
    };
  }

  render(){
    // 加密电话
    let encryptedPhones = this.props.identityToken.user.phone.slice(0,3);
    encryptedPhones += this.props.identityToken.user.phone.slice(3,-4).replace(/\d/g,'*');
    encryptedPhones += this.props.identityToken.user.phone.slice(-4);


    return (<View style={styles.container} ref='componentExisted'>
      <Header title='我的' hideBack={true} rightButton={<MsgBtn />} />
      <ScrollView style={styles.content} refreshControl={<RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={() => this.refreshCustomerScore()}
        title='下拉刷新'
      />}>
        {/* 基本信息 */}
        <View style={styles.basicFacts}>
          <Image style={styles.personalImage} source={require('../../../assets/img/personalImage2x.png')} resizeMode='contain' />
          <View style={styles.message}>
            <Text style={styles.name}>{this.props.identityToken.user.name}</Text>
            <Text style={styles.phone}>{encryptedPhones}</Text>
            <View style={styles.rightModule}>
              <TouchableWithoutFeedback onPress={() => {Actions.manageCustomerAccounts()}}>
                <View style={styles.securityCenter}>
                  <Text style={styles.securityCenterText}>安全中心</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        {/* 各模块 */}
        <LineSection title='环保金' icon={<Image style={styles.icon} source={require('../../../assets/iconImg/customerScore.png')} resizeMode='contain'/>} onPress={() => {Actions.customerScorePage()}} rightModule={<Text style={styles.customerScore}>{`¥${this.state.customerScore}`}</Text>}/>
        <LineSection title='地址管理' icon={<Image style={styles.icon} source={require('../../../assets/iconImg/location.png')} resizeMode='contain'/>} onPress={() => {Actions.addressManagementPage()}} />
        <LineSection title='环保记录' icon={<Image style={styles.icon} source={require('../../../assets/iconImg/recycleRecord.png')} resizeMode='contain'/>} onPress={() => Actions.environmentalRecordPage()}/>
        <LineSection title='消费记录' icon={<Image style={styles.icon} source={require('../../../assets/iconImg/recycleRecord.png')} resizeMode='contain'/>} onPress={() => Actions.mallOrderRecordPage()}/>
        <LineSection title='虎哥资讯' icon={<Image style={styles.icon} source={require('../../../assets/iconImg/hugeInformation.png')} resizeMode='contain'/>} onPress={() => Actions.hugeInformationPage()}/>
        {/*<LineSection title='在线客服' icon={<Image style={styles.icon} source={require('../../../assets/iconImg/onlineService.png')} resizeMode='contain'/>} />*/}
        <LineSection title='关于我们' icon={<Image style={styles.icon} source={require('../../../assets/iconImg/aboutUs.png')} resizeMode='contain'/>} onPress={() => Actions.aboutUsPage()} />
        <LineSection title='服务范围' icon={<Image style={styles.icon} source={require('../../../assets/iconImg/serviceScope.png')} resizeMode='contain'/>} onPress={() => Actions.coverageAreaPage()} />
        <SubmitBtn style={styles.logout} text='退出登录' submit={() => this.exitLogon()}/>
      </ScrollView>
    </View>)
  }

  async componentDidMount(){
    await this.refreshCustomerScore();
  }

  // 刷新环保金余额
  async refreshCustomerScore(){
    const res = await request.get(config.api.getCustomerScore,null,{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    // 异步后，验证 组件存在，再setState
    if(res && this.refs.componentExisted){
      if(!res.status){
        this.setState({customerScore: res.data, isRefreshing: false});
      }
      else {
        console.log(res);
        this.setState({isRefreshing: false});
      }
    }
  }

  // 退出登录
  exitLogon(){
    Alert.alert('确认退出登录？','',[
      {text: '取消', onPress: () => {}},
      {text: '确认', onPress: () => {

          Actions.jump('shoppingMall');
          Actions.jump('recycle');
          // 置空全局身份令牌
          changeIdentityToken(emptyIdentityToken);
          // 删除本地身份令牌
          storage.remove({key: 'identityToken'});
        }
      }
    ]);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // 页头
  rightButton: {
    fontSize: 24
  },
  // 内容区
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 基本信息
  basicFacts: {
    marginBottom: 12,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  // 个人头像
  personalImage: {
    alignSelf: 'center',
    width: 157,
    height: 157,
    marginHorizontal: 24
  },
  // 个人信息
  message: {
    position: 'relative',
    flex: 1,
    height: 188,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  // 个人名称
  name: {
    marginBottom: 24,
    fontSize: 32,
    fontWeight: '900',
    color: '#000'
  },
  phone: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000'
  },
  rightModule: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },
  securityCenter: {
    width: 128,
    height: 46,
    borderRadius: 22,
    backgroundColor: '#ffd100',
    justifyContent: 'center',
    alignItems: 'center'
  },
  securityCenterText: {
    fontSize: 22,
    fontWeight: '700'
  },
  // 行模块
  icon: {
    width: 54,
    height: 54
  },
  customerScore: {
    fontSize: 28,
    color: '#ef3300'
  },
  // 退出登录
  logout: {
    marginTop: 59,
    marginBottom: 50,
    backgroundColor: '#de2c10'
  }
});

// 此页面需验证身份
export default verifyLogin(Mine);