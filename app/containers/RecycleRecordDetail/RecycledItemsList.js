import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';


import RecycledItem from '../RecycleOrder/RecycledItem';

class RecycledItemsList extends PureComponent{

  static propTypes = {
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string,
        spec: PropTypes.string,
        quantity: PropTypes.number, // 回收物品数量
        integral: PropTypes.number, // 环保金单价
        amount: PropTypes.number, // 获得现金
        orderItemSpecImage: PropTypes.string, // 回收物类别图片
      })
    ),
  };

  static defaultProps = {
    orderItems: [],
  };

  render(){

    return (<View style={[styles.container].concat(this.props.style)}>
      {
        this.props.orderItems.map((item, index) => <RecycledItem key={index} style={styles.recycledItem} specs={
          {
            name: item.spec,
            image: item.orderItemSpecImage,
            price: item.amount ? item.amount / item.quantity : item.integral,
            number: item.quantity,
          }
        } subCategoryName={item.category} />)
      }
    </View>);
  }
}

const styles = StyleSheet.create({
  recycledItem: {
    paddingHorizontal: 0,
    borderBottomWidth: 0,
  }
});

export default RecycledItemsList;