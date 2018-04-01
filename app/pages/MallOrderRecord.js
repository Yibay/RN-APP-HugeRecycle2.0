import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropType from 'prop-types';
import {connect} from 'react-redux';


import Header from "../components/Header/Header";
import {verifyLogin} from "../HOC/verifyLogin";
import {fetchMallOrderRecord} from '../redux/actions/user/mallOrderRecord';

import MallOrderItemsList from "../containers/MallOrderRecord/MallOrderItemsList";


class MallOrderRecord extends Component {

  static propTypes = {
    mallOrderRecord: PropType.shape({
      data: PropType.array.isRequired,
      isFetching: PropType.bool.isRequired
    }),
    fetchMallOrderRecord: PropType.func.isRequired
  };

  render(){
    return <View style={styles.container}>
      <Header title='我的消费订单'/>
      <MallOrderItemsList mallOrderList={this.props.mallOrderRecord.data} />
    </View>
  }

  componentDidMount(){
    this.getMallOrderList();
  }


  getMallOrderList(){
    this.props.fetchMallOrderRecord();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  content: {
    flex: 1
  }
});

function mapStateToProps(state){
  return {
    mallOrderRecord: state.user.mallOrderRecord
  }
}

export default verifyLogin(connect(mapStateToProps, {fetchMallOrderRecord})(MallOrderRecord));