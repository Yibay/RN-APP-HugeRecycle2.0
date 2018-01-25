import React, { Component } from 'react';
import { StyleSheet, ScrollView ,View, Text } from 'react-native';


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
                recordBtn = <View style={styles.flexRow}><RecordBtn text='催单' /><RecordBtn style={styles.btnMargin} text='撤单' /></View>;
                statusDesc = <Text style={styles.status}>等待虎哥接单</Text>;
                break;
              case 5: // 已接
                recordBtn = <RecordBtn text='联系取件员' />;
                statusDesc = <Text style={styles.status}>等待虎哥上门回收</Text>;
                break;
              // case 6: // 到达
              case 7: // 完成
                // gradeStatus 5 未回访
                item.gradeStatus === 5 ?
                  (recordBtn = <RecordBtn text='评价' />)
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

            return <OrderItem key={index} style={styles.OrderItem} createdTs={item.createdTs} createOrderTime={item.createOrderTime} recycledItems={item.recycleCategoryDesc} statusDesc={statusDesc} rightButton={recordBtn}/>
          })
        }

      </ScrollView>
    </View>);
  }

  // 单一入口页，数据采用本层管理
  async componentDidMount(){
    console.log('EnvironmentalRecord--------componentDidMount');
    const res = await request
      .get(config.api.myOrders, null, {'X-AUTH-TOKEN': this.props.identityToken.authToken})

    console.log(res);
    // 若请求正常、且数据正常
    if(res && !res.status){
      console.log(res);
      this.setState({recordItems: res.data});
    }
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