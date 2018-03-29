import React, { Component } from 'react';
import {StyleSheet, View, Text, Alert, Linking} from 'react-native';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';


import config from "../../util/request/config";
import request from "../../util/request/request";

import OrderItem from './OrderItem';
import RecordBtn from '../../components/Form/Btn/RecordBtn';
import DisableBtn from '../../components/Form/Btn/DisableBtn';


const styles = StyleSheet.create({
  container: {
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

class RecycleRecordItem extends Component{

  static propTypes = {
    recordItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      orderStatusId: PropTypes.number.isRequired,
      tServiceOrder: PropTypes.shape({
        orderScore: PropTypes.number.isRequired
      }),
      createOrderTime: PropTypes.string.isRequired,
      recycleCategoryDesc: PropTypes.string.isRequired
    }),
    authToken: PropTypes.string.isRequired,
    updateOrderList: PropTypes.func.isRequired,
    evaluable: PropTypes.bool.isRequired
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
        recordBtn = <RecordBtn style={styles.btnMargin} text='撤单' submit={() => this.cancelOrder(this.props.recordItem.id)} />;
        statusDesc = <Text style={styles.statusFinish}>订单待审核</Text>;
        break;
      case 2: // 已审／未派
      case 4: // 已派／未接
        recordBtn = <View style={styles.flexRow}><RecordBtn text='催单' submit={() => this.urgeOrder(this.props.recordItem.id)} /><RecordBtn style={styles.btnMargin} text='撤单' submit={() => this.cancelOrder(this.props.recordItem.id)} /></View>;
        statusDesc = <Text style={styles.status}>等待虎哥接单</Text>;
      break;
      case 5: // 已接
      case 6: // 到达
        recordBtn = <View style={styles.flexRow}><RecordBtn text='催单' submit={() => this.urgeOrder(this.props.recordItem.id)} /><RecordBtn style={styles.btnMargin} text='联系虎哥' submit={() => this.contactHuge(this.props.recordItem.id)} /></View>;
        statusDesc = <Text style={styles.status}>等待虎哥上门回收</Text>;
      break;
      case 7: // 完成
        // gradeStatus 5 未回访
        if(this.props.recordItem.gradeStatus === 5 ){
          recordBtn = <RecordBtn text='评价' submit={() => this.goToRecycleEvaluationPage(this.props.recordItem)} />;
          // 若不可评价，则显示已完成
          this.props.evaluable || (recordBtn = <DisableBtn text='已完成'/>);
        }
        else {
          // gradeStatus 其他状态，已回访
          (recordBtn = <DisableBtn text='已评价' />);
        }

        // 评价页，此模块不可评价，显示内容有所差异
        this.props.evaluable ?
          statusDesc = <Text style={styles.statusFinish}>{`已完成（${this.props.recordItem.tServiceOrder.phone} 获得${this.props.recordItem.tServiceOrder.orderScore}元环保金）`}</Text>
          :
          statusDesc = <Text style={styles.statusFinish}>{`获得${this.props.recordItem.tServiceOrder.orderScore}元环保金`}</Text>
        break;
      case 3: // 撤单
      case 8: // 打回
      case 9: // 退回
        recordBtn = <DisableBtn text='已取消' />;
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

    return <OrderItem style={[styles.container].concat(this.props.style)} firstSectionStyle={this.props.firstSectionStyle} createdTs={this.props.recordItem.id} createOrderTime={this.props.recordItem.createOrderTime} recycledItems={recycledItems} statusDesc={statusDesc} rightButton={recordBtn}/>
  }

  // 撤单
  cancelOrder(orderId){
    Alert.alert('撤销回收单','撤单后虎哥将不再上门收件',[
      {
        text: '撤销',
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
        text: '不了'
      }
    ]);

  }

  // 催单
  async urgeOrder(orderId){
    const res = await request.post(config.api.urgeOrder,{orderId},{'X-AUTH-TOKEN': this.props.authToken})
    if(res){
      // 若请求正常、且数据正常
      if(!res.status){
        Alert.alert(res.data);
      }
      else{
        console.log(res);
        Alert.alert(res.data);
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

  // 客户评价
  goToRecycleEvaluationPage(recordItem){
    Actions.recycleEvaluationPage({
      recordItem,
      updateOrderList: this.props.updateOrderList
    })
  }
}

export default RecycleRecordItem;