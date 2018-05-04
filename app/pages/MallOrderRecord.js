import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropType from 'prop-types';
import {connect} from 'react-redux';


import {verifyLogin} from "../HOC/verifyLogin";
import {onEnter} from '../redux/actions/pagesLife/MallOrderRecordLife';

import Header from "../components/Header/Header";
import Loading from "../components/Alert/Loading";
import MallOrderItemsList from "../containers/MallOrderRecord/MallOrderItemsList";


class MallOrderRecord extends Component {

  static propTypes = {
    mallOrderRecord: PropType.shape({
      data: PropType.array.isRequired,
      isFetching: PropType.bool.isRequired,
    }),
    onEnter: PropType.func.isRequired,
    deleteMallOrder: PropType.shape({
      isFetching: PropType.bool.isRequired,
    }),
  };

  render(){

    return <View style={styles.container}>
      <Header title='我的消费订单'/>
      <MallOrderItemsList mallOrderList={this.props.mallOrderRecord.data} isFetching={this.props.mallOrderRecord.isFetching} onRefresh={this.props.onEnter} />
      <Loading show={this.props.deleteMallOrder.isFetching}/>
    </View>
  }

  componentDidMount(){
    this.props.onEnter();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  }
});

function mapStateToProps(state){
  return {
    mallOrderRecord: state.user.mallOrderRecord,
    deleteMallOrder: state.mall.mallOrder.deleteMallOrder,
  }
}

export default verifyLogin(connect(mapStateToProps, {onEnter})(MallOrderRecord));