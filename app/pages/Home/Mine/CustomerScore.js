import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Dimensions, Animated } from 'react-native';

import _ from 'lodash';


import { verifyLogin } from '../../../HOC/verifyLogin';
import request from '../../../util/request/request';
import config from '../../../util/request/config';

import Header from '../../../components/Header/Header';
import ScoreLogItem from "../../../containers/CustomerScore/ScoreLogItem";


const { width, height } = Dimensions.get('window');
const winSizeHeight = 750 / width * height;

class CustomerScore extends Component{

  constructor(props){
    super(props);

    this.state = {
      isRefreshing: false,
      customerScore: 0,
      customerScoreLog: [],
      customerScoreLogMaxHeight: new Animated.Value(0),
      listBtnText: '展开明细'
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='环保金余额'/>
      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.refreshCustomerScoreLog()}/>}>
        <View style={styles.customerScoreSection}>
          <Text style={styles.customerScore}>{`¥${this.state.customerScore.toFixed(2)}`}</Text>
        </View>
        <Animated.ScrollView style={{maxHeight: this.state.customerScoreLogMaxHeight}}>
          {
            this.state.customerScoreLog.map((item, index) => {

              let income; // 收入or消费

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

              return <ScoreLogItem key={index} income={income} item={item}/>
            })
          }
        </Animated.ScrollView>
        <View style={styles.listBtn}>
          <Text style={styles.listBtnText} onPress={() => this.toggleCustomerScoreLog()}>{this.state.listBtnText}</Text>
        </View>
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
    this.setState({
      listBtnText: this.state.customerScoreLogMaxHeight._value ? '展开明细' : '收起明细'
    })
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
  customerScoreSection: {
    height: 228,
    justifyContent: 'center',
    alignItems: 'center'
  },
  customerScore: {
    fontSize: 72,
    fontWeight: '700',
    color: '#000'
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
  text: {
    fontSize: 26
  },
  listBtn: {
    borderTopWidth: 2,
    borderTopColor: '#e4e5e7',
  },
  listBtnText: {
    marginTop: 50,
    alignSelf: 'center',
    fontSize: 24,
    color: '#888'
  }
});

export default verifyLogin(CustomerScore);