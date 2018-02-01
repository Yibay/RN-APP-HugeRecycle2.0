/**
 * 中间件 小区位置（管理相关Redux状态）
 * 改变小区位置、切换周围便利店信息（1.通过小区名字 获取便利店id; 2. 通过便利店id获取商品大类id数组; 3. 通过便利店id、大类id获取 商品列表）
 * */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';


import request from "../util/request/request";
import config from "../util/request/config";
import { setStationInfo, setMallCategoryInfo, setProductList } from '../redux/actions/Mall';


const locationManage = WrappedComponent => connect(mapStateToProps, {setStationInfo, setMallCategoryInfo, setProductList} )(class extends Component{

  render(){
    return <WrappedComponent {..._.omit(this.props, ['currentLocation','setStationInfo','setMallCategoryInfo','setProductList'])} />
  }

  /** redux currentLocation 变更后，刷新如下 数据 */
  async componentDidUpdate(){

    /** 1、根据小区名字, 获取服务站信息 */
    let stationInfo = await this.loadInitMallInfoByCommunity(this.props.currentLocation.communityName);
      // 若数据异常、立即结束（包含该小区无对应服务站）
    if(!stationInfo || stationInfo.status || !stationInfo.data){  // {data: null, status: 0}
      this.props.setStationInfo({});
      this.props.setMallCategoryInfo({});
      this.props.setProductList([]);
      return;
    }
      // 若成功
    this.props.setStationInfo(stationInfo.data);

    /** 2、根据 小区对应服务站，获取便利店 categoryId 数组、头部banner图片 */
    let mallCategoryInfo = await this.getMallIndexInfo(stationInfo.data.stationId);
      // 若异常
    if(!mallCategoryInfo){
      this.props.setMallCategoryInfo({});
      this.props.setProductList([]);
      return;
    }
      // 若成功
    this.props.setMallCategoryInfo(mallCategoryInfo);

    /** 3、根据服务站Id、便利店 categoryId，获取便利店 各categoryId下，商品数组 */
    let productList = await this.getProductListByCategory(stationInfo.data.stationId, mallCategoryInfo.mainCategoryList);
    this.props.setProductList(productList);
  }

  /** 1、根据小区名字, 获取服务站信息 */
  async loadInitMallInfoByCommunity(communityName){
    const stationInfo = await request.postFormData(config.api.loadInitMallInfoByCommunity, {communityName});
    return stationInfo;
  }

  /** 2、根据服务站Id, 获取便利店 categoryId 数组、头部banner图片 */
  async getMallIndexInfo(stationId){
    const mallCategoryInfo = await request.postFormData(config.api.getMallIndexInfo, {stationId});
    return mallCategoryInfo;
  }

  /** 3、根据服务站Id、便利店 categoryId，获取便利店 各categoryId下，商品数组 */
  async getProductListByCategory(stationId, mainCategoryList){
    const productList = await Promise.all(mainCategoryList.map(item => request.postFormData(config.api.getProductListByCategory, {
      stationId,
      categoryId: item.id
    })));
    return productList;
  }
});

function mapStateToProps(state){
  return {
    currentLocation: state.location.currentLocation
  };
}

export default locationManage;