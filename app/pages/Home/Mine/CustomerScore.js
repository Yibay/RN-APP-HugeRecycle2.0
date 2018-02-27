import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Dimensions, Animated } from 'react-native';

import _ from 'lodash';


import { verifyLogin } from '../../../HOC/verifyLogin';
import request from '../../../util/request/request';
import config from '../../../util/request/config';

import Header from '../../../components/Header/Header';


const { width, height } = Dimensions.get('window');
const winSizeHeight = 750 / width * height;

class CustomerScore extends Component{

  constructor(props){
    super(props);

    this.state = {
      isRefreshing: false,
      customerScore: 0,
      customerScoreLog: [],
      customerScoreLogMaxHeight: new Animated.Value(0)
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='环保金余额'/>
      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshCustomerScoreLog()}/>}>
        <Text style={styles.prompt}>环保金余额可用于虎哥在线商城和虎哥便利店直接消费</Text>
        <Text style={styles.customerScore}>{`¥${this.state.customerScore}`}</Text>
        <Animated.ScrollView style={{maxHeight: this.state.customerScoreLogMaxHeight}}>
          {
            this.state.customerScoreLog.map((item, index) => {

              console.log(item);

              let income;

              switch(item.integralType){
                case 0: // 回收
                case 8: // 商场退货
                case 10: // 人工充值
                case 11: // 预注册送环保金
                case 12: // 福利送环保金
                  income = true;
                  break;
                case 7: // 商场消费
                case 9: // 回收退单
                case 13: // 合作服务站消耗
                  income = false;
                  break;
              }

              return <View key={index} style={styles.lineSection}>
                <Text style={[styles.icon, styles.text]}>{income ? '+' : '-'}</Text>
                <View style={styles.scoreLog}>
                  <View style={styles.firstSection}>
                    <Text style={[styles.text, income ? styles.incomeScore : styles.consumeScore]}>{`¥${item.customerScore}`}</Text>
                    <Text style={styles.text}>{item.times}</Text>
                  </View>
                  <Text style={[styles.secondSection, styles.text]}>{item.type}</Text>
                </View>
              </View>
            })
          }
        </Animated.ScrollView>
        <Text style={styles.listBtn} onPress={() => this.toggleCustomerScoreLog()}>展开明细</Text>
      </ScrollView>
    </View>);
  }

  componentDidMount(){
    this.refreshCustomerScoreLog();
  }

  async refreshCustomerScoreLog(){
    this.setState({ isRefreshing: true });

    const [customerScore, customerScoreLog] = await Promise.all([
      request.get(config.api.getCustomerScore,null,{'X-AUTH-TOKEN': this.props.identityToken.authToken}),
      request.get(config.api.getCustomerScoreLog, null, {'X-AUTH-TOKEN': this.props.identityToken.authToken})
    ]);

    this.setState(_.merge(
      {isRefreshing: false},
      (customerScore && !customerScore.status) ? {customerScore: customerScore.data} : {},
      (customerScoreLog && !customerScoreLog.status) ? {customerScoreLog: customerScoreLog.data} : {}
      ));
  }

  toggleCustomerScoreLog(){
    Animated.timing(
      this.state.customerScoreLogMaxHeight,
      {
        toValue: this.state.customerScoreLogMaxHeight._value ? 0 : winSizeHeight - 500,
      }
    ).start();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  prompt: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 24
  },
  customerScore: {
    marginTop: 20,
    marginBottom: 50,
    alignSelf: 'center',
    fontSize: 70,
    fontWeight: '700',
    color: 'red'
  },
  lineSection: {
    marginTop: 10,
    padding: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 30,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  scoreLog: {
    flex: 1
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 26
  },
  incomeScore: {
    color: 'red'
  },
  consumeScore: {
    color: 'green'
  },
  listBtn: {
    marginTop: 50,
    alignSelf: 'center',
    fontSize: 26
  }
});

export default verifyLogin(CustomerScore);