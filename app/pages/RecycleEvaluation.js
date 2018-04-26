/**
 * 回收评价（评价虎哥）
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Alert, ScrollView } from 'react-native';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';


import { verifyLogin } from '../HOC/verifyLogin';
import request from '../util/request/request';
import config from '../util/request/config';
import {fetchRecycleRecordThunk} from '../redux/actions/user/recycleRecord';

import Header from '../components/Header/Header';
import GradeEvaluation from '../components/Form/Module/GradeEvaluation/GradeEvaluation';
import RecycleRecordItem from '../containers/RecycleRecord/RecycleRecordItem';
import SubmitBtn from '../components/Form/Btn/SubmitBtn';
import GradeTitle from "../components/Form/Module/GradeEvaluation/GradeTitle";
import Remark from "../components/Form/Input/Remark";


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
    borderRadius: 88,
    backgroundColor: '#ccc'
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
    recordItem: PropTypes.shape({
      id: PropTypes.number.isRequired // 订单号
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
    return (<View style={styles.container}>
      <Header title='评价虎哥'/>
      <ScrollView style={styles.content}>
        {/* 回收订单信息 */}
        <RecycleRecordItem style={styles.recycleRecordItem} firstSectionStyle={styles.firstSectionStyle} secondSectionStyle={styles.secondSectionStyle} recordItem={this.props.recordItem} authToken={this.props.identityToken.authToken} evaluable={false}/>
        {/* 虎哥信息 */}
        <Image style={styles.hugePhoto} source={{uri: this.props.recordItem.tServiceOrder.recyclerHeadPic}} resizeMode='contain'/>
        <Text style={styles.hugeName}>{`虎哥：${this.props.recordItem.tServiceOrder.recyclerName}`}</Text>
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
    </View>)
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
    const res = await request.post(`${config.api.rateOrder}/${this.props.recordItem.id}`,this.state,{'X-AUTH-TOKEN': this.props.identityToken.authToken});
    if(res){
      if(!res.status){
        Alert.alert('评价成功','感谢您的评价，虎哥会更加努力为您带来更好的服务',[
          {text: '返回', onPress: () => {
              // 刷新回收记录列表(上一页)
              this.props.fetchRecycleRecordThunk();
              // 返回上一页
              Actions.pop();
            }}
        ])
      }
      else{
        Alert.alert(res.message);
      }
    }
  }
}

export default verifyLogin(connect(null,{fetchRecycleRecordThunk})(RecycleEvaluation));