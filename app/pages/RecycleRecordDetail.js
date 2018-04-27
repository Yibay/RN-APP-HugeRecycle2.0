import React, {PureComponent} from 'react';
import {StyleSheet, View, ScrollView, Alert, Linking} from 'react-native';

import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import {onEnter} from "../redux/actions/pagesLife/RecycleRecordDetailLife";

import Header from "../components/Header/Header";
import OrderStatusBar from "../containers/RecycleRecordDetail/OrderStatusBar";
import Section from "../containers/RecycleRecordDetail/Section";
import PersonnelInformation from "../components/Section/PersonnelInformation";
import RecordBtn from "../components/Form/Btn/RecordBtn";
import RecycledItemsList from "../containers/RecycleRecordDetail/RecycledItemsList";
import TextAdaption from "../components/Text/TextAdaption";
import config from "../util/request/config";
import request from "../util/request/request";
import {formatDate} from "../util/format";


class RecycleRecordDetail extends PureComponent{

  static propTypes = {
    // 订单号
    orderId: PropTypes.number,
    onEnter: PropTypes.func.isRequired,
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
        ),
        orderGrade: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            evaluate: PropTypes.string,
          })
        ),
      }),
    }),
  };

  constructor(props){
    super(props);

    this.state = {
      showOrderGrade: false,
    };
  }

  render(){

    let recordBtn;
    let statusDesc;
    switch(this.props.recordItem.data.orderStatusId){
      case 0: // 未审
      case 1: // 待确认
      case 2: // 已审／未派
      case 4: // 已派／未接
        statusDesc = '等待虎哥接单';
        recordBtn = <View/>;
        break;
      case 5: // 已接
      case 6: // 到达
        statusDesc = '等待虎哥上门回收';
        recordBtn = <RecordBtn style={styles.btnMargin} text='联系虎哥' onPress={() => this.contactHuge(this.props.orderId)} />;
        break;
      case 7:
        statusDesc = '已完成';
        // gradeStatus 5 未回访
        if(this.props.recordItem.data.gradeStatus === 5){
          recordBtn = <RecordBtn text='评价' onPress={() => {Actions.recycleEvaluationPage({orderId: this.props.orderId})}} />;
        }
        else{
          recordBtn = <RecordBtn text='查看评价' onPress={() => {this.setState({showOrderGrade: true})}} />;
        }
        break;
      case 3: // 撤单
      case 8: // 打回
      case 9: // 退回
        statusDesc = '已取消';
        recordBtn = <View/>;
        break;
      default:
        statusDesc = '';
        recordBtn = <View/>;
    }

    let phoneScore = this.props.recordItem.data.phoneScore;
    let orderScore = this.props.recordItem.data.orderScore;
    let payAmount = this.props.recordItem.data.payAmount;
    console.log(this.props.recordItem.data);

    return <View style={styles.container}>
      <Header title='回收单详情'/>
      <ScrollView style={styles.content}>
        {/* 订单状态 */}
        <OrderStatusBar statusText={statusDesc}/>
        {/* 回收地址 */}
        <Section title='回收地址'>
          <TextAdaption style={styles.sectionText}>{[this.props.recordItem.data.accountName, this.props.recordItem.data.phone, this.props.recordItem.data.addr].filter(item => item).join(', ')}</TextAdaption>
        </Section>
        {/* 回收人员信息 */}
        <Section title='回收人员信息'>
          <PersonnelInformation style={styles.personnelInformation} imgStyle={styles.personalImage} hugeImg={true} imgURL={{uri: this.props.recordItem.data.recyclerHeadPic}} name={this.props.recordItem.data.recyclerName} phone={this.props.recordItem.data.recyclerPhone} rightModule={
            recordBtn
          } />
          {/* 评价详情 */}
          <View style={this.state.showOrderGrade ? styles.orderGrade : styles.hidden}>
            {
              this.props.recordItem.data.orderGrade ?
                this.props.recordItem.data.orderGrade.map((item, index) => <View key={index} style={styles.orderGradeItem}><TextAdaption style={styles.orderGradeText}>{item.title}: {item.evaluate}</TextAdaption></View>)
                :
                null
            }
          </View>
        </Section>
        {
          this.props.recordItem.data.orderItems && this.props.recordItem.data.orderItems.length ?
            // 实际回收物品
            <Section title='回收物品'>
              <RecycledItemsList style={styles.recycledItemsList} orderItems={this.props.recordItem.data.orderItems} />
            </Section>
            :
            // 待回收物品
            <Section title='待回收物品'>
              <TextAdaption style={styles.sectionText}>{this.props.recordItem.data.recycleCategoryDesc}</TextAdaption>
            </Section>
        }
        {/* 环保金消息 */}
        <Section title='环保金消息'>
          <TextAdaption style={styles.sectionText}>
            {
              phoneScore ?
                phoneScore.substring(0,3) + phoneScore.substring(3,phoneScore.length - 4).replace(/\d/g,'*') + phoneScore.substring(phoneScore.length - 4)
                :
                ''
            }
            {
              orderScore ? '获得环保金 ¥' +  orderScore : ''
            }
            {
              payAmount ? '获得现金 ¥' + payAmount : ''
            }
          </TextAdaption>
        </Section>
        {/* 订单号 */}
        <Section title={`订单号：${this.props.orderId}`}>
          {
            this.props.recordItem.data.orderTime ?
              this.props.recordItem.data.orderTime.map((item, index) => {
                return <TextAdaption key={index} style={styles.sectionText}>{item.status}: {formatDate(item.time)}</TextAdaption>
              })
              :
              null
          }
        </Section>
      </ScrollView>
    </View>
  }

  componentDidMount(){
    this.props.onEnter(this.props.orderId);
  }

  // 联系虎哥上门收件
  async contactHuge(orderId){
    const res = await request.get(`${config.api.contactHuge}${orderId}`,null,{'X-AUTH-TOKEN': this.props.authToken});
    if(res){
      // 若请求正常、且数据正常
      if(!res.status){
        const supported = await Linking.canOpenURL(`tel:${res.data.recyclerWorkPhone}`).catch(e => {console.log(e); return false;});
        if(supported){
          Linking.openURL(`tel:${res.data.recyclerWorkPhone}`);
        }
        else{
          Alert.alert('此设备不支持 拨打电话',`请手动拨打${res.data.recyclerWorkPhone}`);
        }
      }
    }
    else{
      Alert.alert(res.message);
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  content: {
    flex: 1,
  },
  // 模块文本
  sectionText:{
    marginTop: 20,
    fontSize: 26,
  },
  // 回收人员信息
  personnelInformation: {
    marginTop: 10,
    marginBottom: 0,
  },
  personalImage: {
    marginLeft: 0,
  },
  // 评价详情
  orderGrade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  orderGradeItem:{
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderGradeText: {
    fontSize: 28,
  },
  // 隐藏
  hidden: {
    display: 'none',
  },
  // 实际回收物品
  recycledItemsList: {
    marginTop: 20,
  },
});

function mapStateToProps(state){
  return {
    recordItem: state.user.recycleRecordDetail,
    authToken: state.identityToken.authToken,
  };
}

export default connect(mapStateToProps,{onEnter})(RecycleRecordDetail);