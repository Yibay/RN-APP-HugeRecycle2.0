import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';


import request from '../../util/request/request';
import config from '../../util/request/config';

import { setAllProducts } from '../../redux/actions/Recycle';

import ClassificationNavigation from '../../containers/Recycle/ClassificationNavigation';
import GarbageProducts from '../../containers/Recycle/GarbageProducts';
import ElectricProducts from '../../containers/Recycle/ElectricProducts';
import FurnitureProducts from '../../containers/Recycle/FurnitureProducts';
import CallModule from '../../containers/Recycle/CallModule';
import CallModal from '../../containers/Recycle/CallModal';


class Recycle extends Component{

  constructor(props){
    super(props);

    this.state = {
      selectedCategory: 1, // 回收类别选中项（默认 选中第一项）
      category: [
        {categoryNum:1, categoryText: '小件干垃圾'},
        {categoryNum:2, categoryText: '废旧家电'},
        {categoryNum:3, categoryText: '废旧家具'}
      ],
      callModalVisible: true
    };
  }

  render(){

    return (<View style={styles.container}>
      {/* 导航条 */}
      <ClassificationNavigation category={this.state.category} selectedCategory={this.state.selectedCategory} switchCategory={this.switchCategory.bind(this)} />
        {/* 分页：可回收垃圾 */}
        <GarbageProducts show={this.state.selectedCategory === 1} garbageProductsObj={this.props.garbageProductsObj} />
        {/* 分页：废旧家电 */}
        <ElectricProducts show={this.state.selectedCategory === 2} electricProductsObj={this.props.electricProductsObj} />
        {/* 分页：废旧家具 */}
        <FurnitureProducts show={this.state.selectedCategory === 3} furnitureProductsObj={this.props.furnitureProductsObj} />
      {/* 底栏：一键呼叫按钮 */}
      <CallModule showCallModal={() => this.showCallModal()} />
      {/* 弹窗：一键呼叫 */}
      <CallModal visible={this.state.callModalVisible} hideCallModal={() => this.hideCallModal()} />
    </View>)
  }

  componentDidMount(){
    // 请求 回收类别相应数据
    request
      .get(config.api.base + config.api.getProducts)
      .then(res => {
        // 更新全局数据
        this.props.setAllProducts({
          garbageProducts: res.data.garbageProducts,
          electricProducts: res.data.electricProducts,
          furnitureProducts: res.data.furnitureProducts
        })
      })
      .catch(e => console.log(e));
  }

  // 切换类别
  switchCategory(categoryNum){
    this.setState({
      selectedCategory: categoryNum
    });
  }

  // 弹出 一键呼叫 弹窗
  showCallModal(){
    this.setState({
      callModalVisible: true
    });
  }
  // 隐藏 一键呼叫 弹窗
  hideCallModal(){
    this.setState({
      callModalVisible: false
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

function mapStateToProps(state){
  return {
    garbageProductsObj: state.recycle.recyclableGoods.garbageProductsObj,
    electricProductsObj: state.recycle.recyclableGoods.electricProductsObj,
    furnitureProductsObj: state.recycle.recyclableGoods.furnitureProductsObj
  }
}

const actionsCreator = { setAllProducts };

export default connect(mapStateToProps, actionsCreator)(Recycle);