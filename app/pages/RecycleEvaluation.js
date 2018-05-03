/**
 * 回收评价（评价虎哥）
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Alert, ScrollView, Keyboard } from 'react-native';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';


import { verifyLogin } from '../HOC/verifyLogin';
import {onEnter} from '../redux/actions/pagesLife/RecycleEvaluationLife';
import {evaluationRecycleOrder} from '../redux/actions/recycle/recycleOrder/evaluationOrder';

import Header from '../components/Header/Header';
import GradeEvaluation from '../components/Form/Module/GradeEvaluation/GradeEvaluation';
import RecycleRecordItem from '../containers/RecycleRecord/RecycleRecordItem';
import SubmitBtn from '../components/Form/Btn/SubmitBtn';
import GradeTitle from "../components/Form/Module/GradeEvaluation/GradeTitle";
import Remark from "../components/Form/Input/Remark";
import KeyboardAvoidingViewAdapt from '../components/KeyboardAvoidingViewAdapt';
import Loading from "../components/Alert/Loading";


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  // 回收订单信息
  recycleRecordItem: {
    backgroundColor: '#fff'
  },
  firstSectionStyle: {
    marginVertical: 0,
    marginTop: 20,
    marginBottom: 0,
  },
  secondSectionStyle: {
    borderTopWidth: 0,
    minHeight: 'auto',
  },
  // 虎哥信息
  hugePhoto: {
    alignSelf: 'center',
    width: 176,
    height: 176,
    marginTop: 26,
  },
  hugeName: {
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 46,
    fontSize: 28,
    fontWeight: '700',
    color: '#010101'
  },
  // 评价模块
  grade: {
    alignSelf: 'center',
  },
  rateSpeed: {
    marginBottom: 30
  },
  rateConvenience: {
    marginTop: 30
  },
  // 备注
  remark: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
  remarkInput:{
    height: 100,
    backgroundColor: '#fff',
  },
  // 提交评价按钮
  submitBtn: {
    marginTop: 80,
    marginBottom: 30,
  }
});

class RecycleEvaluation extends Component {

  static propTypes = {
    // 订单号
    orderId: PropTypes.number,
    onEnter: PropTypes.func.isRequired,
    evaluationRecycleOrder: PropTypes.func.isRequired,
    recycleEvaluationFetching: PropTypes.bool.isRequired,
    // 回收订单详情
    recordItem: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      dataSource: PropTypes.object.isRequired,
      data: PropTypes.shape({
        // 订单状态
        orderStatusId: PropTypes.number,
        gradeStatus: PropTypes.number,
        // 回收地址
        accountName: PropTypes.string,
        phone: PropTypes.string,
        addr: PropTypes.string,
        // 回收人员信息
        recyclerHeadPic: PropTypes.string,
        recyclerName: PropTypes.string,
        recyclerPhone: PropTypes.string,
        // 待回收物品
        recycleCategoryDesc: PropTypes.string,
        // 实际回收物品
        orderItems: PropTypes.arrayOf(
          PropTypes.shape({
            category: PropTypes.string,
            spec: PropTypes.string,
            quantity: PropTypes.number, // 回收物品数量
            integral: PropTypes.number, // 环保金单价
            amount: PropTypes.number, // 获得现金
          })
        ),
        // 环保金信息
        phoneScore: PropTypes.string, // 获得环保金 电话
        orderScore: PropTypes.number, // 获得环保金金额
        payAmount: PropTypes.number, // 获得现金金额
        orderTime: PropTypes.arrayOf(
          PropTypes.shape({
            status: PropTypes.string,
            time: PropTypes.number,
          })
        )
      }),
    }),
  };

  constructor(props){
    super(props);

    this.state = {
      rateSpeed: 0,
      rateService: 0,
      rateConvenience: 3,
      reviews: '', // 50个字
    };
  }

  render(){
    return (
      <View style={styles.container}>
        <Header title='评价虎哥'/>
        <KeyboardAvoidingViewAdapt style={styles.content} behavior='padding' onStartShouldSetResponder={(evt) => true} onResponderRelease={() => Keyboard.dismiss()}>
          <ScrollView style={styles.content}>
            {/* 回收订单信息 */}
            <RecycleRecordItem style={styles.recycleRecordItem} firstSectionStyle={styles.firstSectionStyle} secondSectionStyle={styles.secondSectionStyle} recordItem={this.props.recordItem.dataSource} evaluable={false}/>
            {/* 虎哥信息 */}
            <Image style={styles.hugePhoto} source={{uri: this.props.recordItem.data.recyclerHeadPic}} resizeMode='contain'/>
            <Text style={styles.hugeName}>{`虎哥：${this.props.recordItem.data.recyclerName}`}</Text>
            {/* 评价 */}
            <View style={styles.grade}>
              <GradeTitle titleArray={['不满意','一般','满意']}/>
              <GradeEvaluation style={styles.rateSpeed} label='上门时间' onChangeScore={score => this.setState({rateSpeed: score})}/>
              <GradeEvaluation label='服务态度' onChangeScore={score => this.setState({rateService: score})}/>
            </View>
            {/* 备注 */}
            <Remark style={styles.remark} inputStyle={styles.remarkInput} title='如有特殊说明，请备注 (50字以内)' value={this.state.reviews} onChangeText={reviews => {this.changeReviews(reviews)}}/>
            {/* 提交按钮 */}
            <SubmitBtn style={styles.submitBtn} text='完成评价' submit={() => this.submit()}/>
          </ScrollView>
        </KeyboardAvoidingViewAdapt>
        <Loading show={this.props.recycleEvaluationFetching}/>
      </View>
    )
  }

  componentDidMount(){
    this.props.onEnter(this.props.orderId);
  }

  changeReviews(reviews){
    if(reviews.length <= 50){
      this.setState({reviews});
    }
  }

  async submit(){
    if(!this.state.rateSpeed){ Alert.alert('请为上门时间打分'); return; }
    if(!this.state.rateService){ Alert.alert('请为服务态度打分'); return; }
    if(!this.state.rateConvenience){ Alert.alert('请为回收便捷度打分'); return; }
    const res = await this.props.evaluationRecycleOrder(this.props.orderId, this.state);
    if(res){
      if(!res.status){
        Alert.alert('评价成功','感谢您的评价，虎哥会更加努力为您带来更好的服务',[
          {text: '返回', onPress: () => {
              // 返回上一页
              Actions.pop();
            }}
        ])
      }
      else if(res.message){
        Alert.alert(res.message);
      }
    }
  }
}

function mapStateToProps(state){
  return {
    recordItem: state.user.recycleRecordDetail,
    recycleEvaluationFetching: state.recycle.recycleOrder.evaluationOrder.isFetching,
  };
}

export default verifyLogin(connect(mapStateToProps,{onEnter, evaluationRecycleOrder})(RecycleEvaluation));