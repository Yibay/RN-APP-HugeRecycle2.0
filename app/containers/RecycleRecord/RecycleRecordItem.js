import React, { PureComponent } from 'react';
import {StyleSheet, View, Text, Alert, Linking, ViewPropTypes} from 'react-native';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';


import config from "../../util/request/config";
import request from "../../util/request/request";

import OrderItem from './OrderItem';
import RecordBtn from '../../components/Form/Btn/RecordBtn';
import DisableBtn from '../../components/Form/Btn/DisableBtn';
import CountDownBtn from '../../components/Form/Btn/CountDownBtn';


const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
  },
  flexRow: {
    flexDirection: 'row'
  },
  btnMargin: {
    marginLeft: 20
  },
  status: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 28,
    color: '#ef3300'
  },
  statusFinish: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 28,
    color: '#888'
  }
});

class RecycleRecordItem extends PureComponent{

  static propTypes = {
    recordItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      orderStatusId: PropTypes.number.isRequired,
      tServiceOrder: PropTypes.shape({
        orderItems: PropTypes.array.isRequired,
        orderScore: PropTypes.number.isRequired,
      }),
      createOrderTime: PropTypes.string.isRequired,
      recycleCategoryDesc: PropTypes.string.isRequired,
    }),
    authToken: PropTypes.string.isRequired,
    updateOrderList: PropTypes.func.isRequired,
    evaluable: PropTypes.bool.isRequired, //  控制 是否可评价
    firstSectionStyle: ViewPropTypes.style,
    secondSectionStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    evaluable: true,
    updateOrderList: () => {}
  };

  render(){ // 差异化 右下角控制按钮

    let recordBtn;
    let statusDesc;
    switch(this.props.recordItem.orderStatusId){
      case 0: // 未审
      case 1: // 待确认
        recordBtn = <RecordBtn style={styles.btnMargin} text='撤单' onPress={() => this.cancelOrder(this.props.recordItem.id)} />;
        statusDesc = <Text style={styles.statusFinish}>订单待审核</Text>;
        break;
      case 2: // 已审／未派
      case 4: // 已派／未接
        recordBtn = <View style={styles.flexRow}><CountDownBtn text='催单' onPress={() => this.urgeOrder(this.props.recordItem.id)} /><RecordBtn style={styles.btnMargin} text='撤单' onPress={() => this.cancelOrder(this.props.recordItem.id)} /></View>;
        statusDesc = <Text style={styles.status}>等待虎哥接单</Text>;
        break;
      case 5: // 已接
      case 6: // 到达
        this.props.evaluable ?
          recordBtn = <View style={styles.flexRow}><CountDownBtn text='催单' onPress={() => this.urgeOrder(this.props.recordItem.id)} /><RecordBtn style={styles.btnMargin} text='联系虎哥' onPress={() => this.contactHuge(this.props.recordItem.id)} /><RecordBtn style={styles.btnMargin} text='查看详情' onPress={() => Actions.recycleRecordDetailPage({orderId:this.props.recordItem.id})} /></View>
          :
          recordBtn = <View style={styles.flexRow}><CountDownBtn text='催单' onPress={() => this.urgeOrder(this.props.recordItem.id)} /><RecordBtn style={styles.btnMargin} text='联系虎哥' onPress={() => this.contactHuge(this.props.recordItem.id)} /></View>;
        statusDesc = <Text style={styles.status}>等待虎哥上门回收</Text>;
        break;
      case 7: // 完成
        // gradeStatus 5 未回访
        if(this.props.recordItem.gradeStatus === 5 ){
          this.props.evaluable ?
            recordBtn = <View style={styles.flexRow}><RecordBtn text='评价' onPress={() => Actions.recycleEvaluationPage({orderId: this.props.recordItem.id})} /><RecordBtn style={styles.btnMargin} text='查看详情' onPress={() => Actions.recycleRecordDetailPage({orderId:this.props.recordItem.id})} /></View>
            :
            // 若不可评价，则显示已完成
            recordBtn = <DisableBtn text='已完成'/>;
        }
        else {
          // gradeStatus 其他状态，已回访
          this.props.evaluable ?
            recordBtn = <RecordBtn style={styles.btnMargin} text='查看详情' onPress={() => Actions.recycleRecordDetailPage({orderId:this.props.recordItem.id})} />
            :
            recordBtn = <DisableBtn text='已评价' />;
        }

        // 评价页，此模块不可评价，显示内容有所差异
        let phone = this.props.recordItem.tServiceOrder.phone;
        let orderScore = this.props.recordItem.tServiceOrder.orderScore;
        this.props.evaluable ?
          statusDesc = <Text style={styles.statusFinish}>{`已完成（${phone.slice(0,phone.length - 4).replace(/\d/g,'*') + phone.slice(phone.length - 4)} 获得${orderScore}元环保金）`}</Text>
          :
          statusDesc = <Text style={styles.statusFinish}>{`获得${orderScore}元环保金`}</Text>;
        break;
      case 3: // 撤单
      case 8: // 打回
      case 9: // 退回
        this.props.evaluable ?
          recordBtn = <DisableBtn text='已取消' />
          :
          recordBtn = <View />;
        statusDesc = <Text/>;
        break;
      default:
        recordBtn = <View/>;
        statusDesc = <Text/>;
    }

    // 若有虎哥下单的 实际回收物品信息，则修正
    let recycledItems = '';
    let orderItems = this.props.recordItem.tServiceOrder.orderItems;
    if(orderItems.length){
      orderItems.forEach((item, index) => {
          recycledItems += item.category + ' ' + (item.type === 4 ? '' : item.spec ) + '*' + item.quantity + (item.type === 4 ? 'kg' : '件');
          if(index !== orderItems.length - 1){
            recycledItems += ', ';
          }
      })
    }
    // 否则，取用户下单时的，回收物品信息
    else{
      recycledItems = this.props.recordItem.recycleCategoryDesc;
    }

    return <OrderItem style={[styles.container].concat(this.props.style)} firstSectionStyle={this.props.firstSectionStyle} secondSectionStyle={this.props.secondSectionStyle} createdTs={this.props.recordItem.id} createOrderTime={this.props.recordItem.createOrderTime} recycledItems={recycledItems} statusDesc={statusDesc} rightButton={recordBtn}/>
  }

  // 撤单
  cancelOrder(orderId){
    Alert.alert('撤销回收单','撤单后虎哥将不再上门回收',[
      {
        text: '撤销回收',
        onPress: async () => {
          console.log(orderId);
          const res = await request
            .post(config.api.cancelOrder,{orderId},{'X-AUTH-TOKEN': this.props.authToken})
          // 若请求正常、且数据正常
          if(res && !res.status){
            // 刷新数据
            this.props.updateOrderList();
          }
          else if(res && res.message){
            Alert.alert(res.message);
          }
        }
      },
      {
        text: '继续等待'
      }
    ]);

  }

  // 催单
  async urgeOrder(orderId){
    const res = await request.post(config.api.urgeOrder,{orderId},{'X-AUTH-TOKEN': this.props.authToken});
    if(res){
      // 若请求正常、且数据正常
      if(!res.status){
        Alert.alert(res.data);
        return true;
      }
      else{
        console.log(res);
        Alert.alert(res.data);
        return false;
      }
    }
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

function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken,
  };
}

export default connect(mapStateToProps)(RecycleRecordItem);