import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import request from '../../util/request/request';
import config from '../../util/request/config';


class ControllerBtn extends Component{

  static propTypes = {
    buyAmount: PropTypes.number.isRequired,
    shoppingCartId: PropTypes.number.isRequired,
    updateCartProductList: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      buyAmount: this.props.buyAmount
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      buyAmount: nextProps.buyAmount
    });
  }

  render(){
    return <View style={styles.controller}>
      <TouchableWithoutFeedback onPress={() => this.reduce()}>
        <Image style={styles.controllerBtn} resize='contain' source={require('../Recycle/SpecsItem/img/reduce2x.png')} />
      </TouchableWithoutFeedback>
      <Text style={styles.num}>{this.state.buyAmount}</Text>
      <TouchableWithoutFeedback onPress={() => this.plus()}>
       <Image style={styles.controllerBtn} resize='contain' source={require('../Recycle/SpecsItem/img/plus2x.png')} />
      </TouchableWithoutFeedback>
    </View>
  }

  async plus(){

    const res = await request.get(config.api.updateShoppingCartAmount,
      {
        storeId: this.props.storeId,
        shoppingCartId: this.props.shoppingCartId,
        amount: this.state.buyAmount + 1
      },
      {'X-AUTH-TOKEN': this.props.authToken});

    if(res && !res.status){
      this.props.updateCartProductList();
      // this.setState({
      //   buyAmount: this.state.buyAmount + 1
      // })
    }

  }

  async reduce(){

    if(this.state.buyAmount > 0){

      const res = await request.get(config.api.updateShoppingCartAmount,
        {
          storeId: this.props.storeId,
          shoppingCartId: this.props.shoppingCartId,
          amount: this.state.buyAmount - 1
        },
        {'X-AUTH-TOKEN': this.props.authToken});

      if(res && !res.status){
        this.props.updateCartProductList();
        // this.setState({
        //   buyAmount: this.state.buyAmount - 1
        // });
      }
    }
  }
}

const styles = StyleSheet.create({
  // 控制器 按钮（添加物品，删除物品）
  controller: {
    position: 'absolute',
    right: 30,
    bottom: 26,
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

function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken,
    storeId: state.mall.storeInfo[state.mall.storeIndex].storeId
  }
}

export default connect(mapStateToProps)(ControllerBtn);