import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropType from 'prop-types';
import {connect} from 'react-redux';


import Header from "../components/Header/Header";
import {verifyLogin} from "../HOC/verifyLogin";
import {onEnter} from '../redux/actions/pagesLife/MallOrderRecordLife';

import MallOrderItemsList from "../containers/MallOrderRecord/MallOrderItemsList";


class MallOrderRecord extends Component {

  static propTypes = {
    mallOrderRecord: PropType.shape({
      data: PropType.array.isRequired,
      isFetching: PropType.bool.isRequired
    }),
    onEnter: PropType.func.isRequired
  };

  render(){
    return <View style={styles.container}>
      <Header title='我的消费订单'/>
      <MallOrderItemsList mallOrderList={this.props.mallOrderRecord.data} isFetching={this.props.mallOrderRecord.isFetching} onRefresh={this.props.onEnter} />
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
    mallOrderRecord: state.user.mallOrderRecord
  }
}

export default verifyLogin(connect(mapStateToProps, {onEnter})(MallOrderRecord));