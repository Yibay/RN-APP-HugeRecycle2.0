import React, { Component } from 'react';
import { StyleSheet, ScrollView ,View, Text, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';


import { verifyLogin } from '../HOC/verifyLogin';
import request from '../util/request/request';
import config from '../util/request/config';

import Header from '../components/common/Header/Header';
import OrderItem from '../components/pages/EnvironmentalRecord/OrderItem';
import RecordBtn from '../components/common/Form/Btn/RecordBtn';
import DisableBtn from '../components/common/Form/Btn/DisableBtn';


class EnvironmentalRecord extends Component {

  constructor(props){
    super(props);

    this.state = {
      recordItems: []
    };
  }
  
  render(){
    console.log(this.props);
    return (<View style={styles.container}>
      <Header title='我的环保记录' />
      <ScrollView style={styles.container}>
        {
          this.state.recordItems.map((item, index) => {
            // 右下角控制按钮
            let recordBtn;
            let statusDesc;
            switch(item.orderStatusId){
              case 0: // 未审
              case 1: // 待确认
              case 2: // 已审／未派
              case 4: // 已派／未接
                recordBtn = <View style={styles.flexRow}><RecordBtn text='催单' submit={() => this.urgeOrder(item.id)} /><RecordBtn style={styles.btnMargin} text='撤单' submit={() => this.cancelOrder(item.id)} /></View>;
                statusDesc = <Text style={styles.status}>等待虎哥接单</Text>;
                break;
              case 5: // 已接
                recordBtn = <RecordBtn text='联系取件员' submit={() => this.contactHuge(item.id)} />;
                statusDesc = <Text style={styles.status}>等待虎哥上门回收</Text>;
                break;
              // case 6: // 到达
              case 7: // 完成
                // gradeStatus 5 未回访
                item.gradeStatus === 5 ?
                  (recordBtn = <RecordBtn text='评价' submit={() => this.goToRecycleEvaluationPage(item.id)} />)
                  // gradeStatus 其他状态，已回访
                  :
                  (recordBtn = <DisableBtn text='已评价' />);
                statusDesc = <Text style={styles.statusFinish}>{`已完成（获得${item.tServiceOrder.orderScore}元环保金）`}</Text>;
                break;
              case 3: // 撤单
              case 8: // 打回
              case 9: // 退回
                recordBtn = <DisableBtn text='已取消' />;
                statusDesc = <Text/>;
                break;
              default:
                recordBtn = <View/>;
                statusDesc = <Text/>
            }

            return <OrderItem key={index} style={styles.OrderItem} createdTs={item.id} createOrderTime={item.createOrderTime} recycledItems={item.recycleCategoryDesc} statusDesc={statusDesc} rightButton={recordBtn}/>
          })
        }

      </ScrollView>
    </View>);
  }

  // 单一入口页，数据采用本层管理
  async componentDidMount(){
    const res = await request
      .get(config.api.myOrders, null, {'X-AUTH-TOKEN': this.props.identityToken.authToken})

    console.log(res);
    // 若请求正常、且数据正常
    if(res && !res.status){
      console.log(res);
      this.setState({recordItems: res.data});
    }
  }

  // 撤单
  cancelOrder(orderId){
    Alert.alert('撤销回收单','撤单后虎哥将不再上门收件',[
      {
        text: '撤销',
        onPress: async () => {
          console.log(orderId);
          const res = await request
            .post(config.api.cancelOrder,{orderId},{'X-AUTH-TOKEN': this.props.identityToken.authToken})
          // 若请求正常、且数据正常
          if(res && !res.status){
            // 刷新数据
            this.componentDidMount();
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
    const res = await request.post(config.api.urgeOrder,{orderId},{'X-AUTH-TOKEN': this.props.identityToken.authToken})
    if(res){
      // 若请求正常、且数据正常
      if(!res.status){
        Alert.alert(res.data);
      }
      else{
        console.log(res.message);
      }
    }
  }

  // 联系虎哥上门收件
  async contactHuge(orderId){
    const res = await request.get(`${config.api.contactHuge}${orderId}`,null,{'X-AUTH-TOKEN': this.props.identityToken.authToken})
    if(res){
      console.log(res);
      // 若请求正常、且数据正常
      if(!res.status){
        console.log(res.data);
      }
      else{
        Alert.alert(res.message);
      }
    }
  }

  // 客户评价
  goToRecycleEvaluationPage(orderId){
    Actions.recycleEvaluationPage({orderId})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  OrderItem: {
    marginBottom: 26,
  },
  flexRow: {
    flexDirection: 'row'
  },
  btnMargin: {
    marginLeft: 20
  },
  status: {
    fontSize: 28,
    color: '#ef3300'
  },
  statusFinish: {
    fontSize: 28,
    color: '#888'
  }
});

export default verifyLogin(EnvironmentalRecord);