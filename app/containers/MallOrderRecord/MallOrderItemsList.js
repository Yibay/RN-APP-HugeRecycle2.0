import React, {Component} from 'react';
import {StyleSheet,View,FlatList} from 'react-native';

import PropType from 'prop-types';


import MallOrderItem from "./MallOrderItem";


class MallOrderItemsList extends Component{

  static propTypes = {
    mallOrderList: PropType.arrayOf(
      PropType.shape({
        orderCode: PropType.string.isRequired
      })
    )
  };

  static defaultProps = {
    mallOrderList: []
  };

  constructor(props){
    super(props);

    this.state = {
      renderedOrderList: this.props.mallOrderList.slice(0,10)
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      renderedOrderList: nextProps.mallOrderList.slice(0,10)
    })
  }

  render(){
    console.log(123123,this.state.renderedOrderList);
    return <FlatList
      style={styles.container}
      data={this.state.renderedOrderList}
      renderItem={({item}) => <MallOrderItem {...item}/>}
      onEndReached={() => this.lazyLoadList()}
      onEndReachedThreshold={0.5}/>
  }

  // 懒加载列表
  lazyLoadList(){
    if(this.state.renderedOrderList.length < this.props.mallOrderList.length){
      this.setState({
        renderedOrderList: this.state.renderedOrderList.concat(this.props.mallOrderList.slice(this.state.renderedOrderList.length, this.state.renderedOrderList.length + 10))
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MallOrderItemsList;