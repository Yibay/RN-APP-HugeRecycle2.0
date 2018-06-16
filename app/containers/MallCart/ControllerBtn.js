import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {updateShoppingCartAmount} from '../../redux/actions/mall/shoppingCart';


class ControllerBtn extends Component{

  static propTypes = {
    buyAmount: PropTypes.number.isRequired,
    storageAmount: PropTypes.number.isRequired,
    shoppingCartId: PropTypes.number.isRequired,
  };

  constructor(props){
    super(props);

    this.state = {
      buyAmount: this.props.buyAmount,
      updateAmountFetching: false,
    };
  }

  componentWillReceiveProps(nextProps){
    if(typeof this.state.buyAmount === 'undefined' || nextProps.buyAmount === this.state.buyAmount){
      this.setState({buyAmount: nextProps.buyAmount});
    }
  }

  render(){
    return <View style={[styles.controller].concat(this.props.style)}>
      <TouchableOpacity onPress={() => this.reduce()}>
        <Image style={styles.controllerBtn} resize='contain' source={require('../Recycle/SpecsItem/img/reduce2x.png')} />
      </TouchableOpacity>
      <Text style={styles.num}>{this.state.buyAmount}</Text>
      <TouchableOpacity onPress={() => this.plus()}>
       <Image style={styles.controllerBtn} resize='contain' source={require('../Recycle/SpecsItem/img/plus2x.png')} />
      </TouchableOpacity>
    </View>
  }

  componentDidUpdate(){
    if(this.props.buyAmount !== this.state.buyAmount && !this.state.updateAmountFetching){
      (async () => {
        this.setState({updateAmountFetching:true});
        await this.props.updateShoppingCartAmount(this.props.shoppingCartId, this.state.buyAmount);
        this.setState({updateAmountFetching:false});
      })();
    }
  }

  async plus(){

    // 库存为空
    if(!this.props.storageAmount){
      Alert.alert('该商品已售罄，无法购买','',[{text:'确认'}]);
      return;
    }

    // 库存充足
    if(this.props.storageAmount >= this.state.buyAmount + 1){
      this.setState(state => ({buyAmount: state.buyAmount + 1}));
    }
    // 库存不足
    else{
      Alert.alert('该商品库存不足','',[{text:'确认'}]);
    }

  }

  async reduce(){

    // 库存为空
    if(!this.props.storageAmount){
      Alert.alert('该商品已售罄，无法购买','',[{text:'确认'}]);
      return;
    }

    // 库存充足
    if(this.state.buyAmount > 1 && this.props.storageAmount >= this.state.buyAmount){
      this.setState(state => ({buyAmount: state.buyAmount - 1}));
    }
    // 库存不足
    else if(this.state.buyAmount > 1 && this.props.storageAmount < this.state.buyAmount){
      this.setState(state => ({buyAmount: this.props.storageAmount}));
    }
  }

}

const styles = StyleSheet.create({
  // 控制器 按钮（添加物品，删除物品）
  controller: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  controllerBtn: {
    width: 42,
    height: 42,
  },
  num: {
    marginHorizontal: 10,
    fontSize: 30,
    fontWeight: '700'
  },
});

export default connect(null,{updateShoppingCartAmount})(ControllerBtn);