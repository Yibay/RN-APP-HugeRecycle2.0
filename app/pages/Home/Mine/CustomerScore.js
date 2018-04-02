import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, Dimensions, Animated } from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import { verifyLogin } from '../../../HOC/verifyLogin';
import {onEnter} from '../../../redux/actions/pagesLife/CustomerScoreLife'

import Header from '../../../components/Header/Header';
import ScoreLogItem from "../../../containers/CustomerScore/ScoreLogItem";


const { width, height } = Dimensions.get('window');
const winSizeHeight = 750 / width * height;

class CustomerScore extends Component{

  static propTypes = {
    customerScore: PropTypes.shape({
      data: PropTypes.number.isRequired,
      isFetching: PropTypes.bool.isRequired
    }),
    customerScoreLog: PropTypes.shape({
      data: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired
    }),
    onEnter: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      customerScoreLogMaxHeight: new Animated.Value(0),
      listBtnText: '展开明细'
    };
  }

  render(){
    return (<View style={styles.container}>
      <Header title='环保金余额'/>
      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={this.props.customerScoreLog.isFetching && this.props.customerScore.isFetching} onRefresh={() => this.props.onEnter()}/>}>
        <View style={styles.customerScoreSection}>
          <Text style={styles.customerScore}>{`¥${this.props.customerScore.data.toFixed(2)}`}</Text>
        </View>
        <Animated.ScrollView style={{maxHeight: this.state.customerScoreLogMaxHeight}}>
          {
            this.props.customerScoreLog.data.map((item, index) => {

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
    this.props.onEnter();
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

function mapStateToProps(state){
  return {
    customerScore: state.user.customerScore,
    customerScoreLog: state.user.customerScoreLog,
  }
}

export default verifyLogin(connect(mapStateToProps,{onEnter})(CustomerScore));