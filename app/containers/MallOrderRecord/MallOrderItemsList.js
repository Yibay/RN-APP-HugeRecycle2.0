import React, {Component} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';

import PropType from 'prop-types';


import MallOrderItem from "./MallOrderItem";
import FlatListDefault from "../../components/List/FlatListDefault";


class MallOrderItemsList extends Component{

  static propTypes = {
    mallOrderList: PropType.arrayOf(
      PropType.shape({
        orderCode: PropType.string.isRequired
      })
    ),
    isFetching: PropType.bool.isRequired,
    onRefresh: PropType.func.isRequired
  };

  static defaultProps = {
    mallOrderList: []
  };

  render(){
    return <FlatListDefault
      style={styles.container}
      data={this.props.mallOrderList}
      renderItem={({item}) => <MallOrderItem {...item}/>}
      refreshControl={<RefreshControl refreshing={this.props.isFetching} onRefresh={this.props.onRefresh} />}
      ListEmptyComponentText='暂无消费记录'
      isFetching={this.props.isFetching}
    />
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MallOrderItemsList;