/**
 * 中间件 小区位置（管理相关Redux状态）
 * 改变小区位置、切换周围便利店信息（1.通过小区名字 获取便利店id; 2. 通过便利店id获取商品大类id数组; 3. 通过便利店id、大类id获取 商品列表）
 * */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';


import request from "../util/request/request";
import config from "../util/request/config";
import { setStoreInfo, setProductList } from '../redux/actions/Mall';


const locationManage = WrappedComponent => connect(mapStateToProps, {setStoreInfo, setProductList} )(class extends Component{

  render(){
    return <WrappedComponent {..._.omit(this.props, ['currentLocation','setStoreInfo','setMallCategoryInfo','setProductList'])} />
  }

  /** redux currentLocation 变更后，刷新如下 数据 */
  async componentDidUpdate(){

    /** 1、根据小区id, 获取服务站信息 */
    let storeInfo = await this.loadInitStoreInfoByCommunityId(this.props.currentLocation.communityId);
      // 若数据异常、立即结束（包含该小区无对应服务站）
    if(!storeInfo || storeInfo.status || !storeInfo.data || !storeInfo.data.length){  // {data: null, status: 0}
      this.props.setStoreInfo([]);
      this.props.setProductList({mallCategoryInfo: {}, productList:[]});
      return;
    }
      // 若成功
    this.props.setStoreInfo(storeInfo.data);

    /** 2、根据 小区对应服务站，获取便利店 categoryId 数组、头部banner图片 */
    let mallCategoryInfo = await this.getMallIndexInfo(storeInfo.data[0].storeId);
      // 若异常
    if(!mallCategoryInfo || mallCategoryInfo.status){
      this.props.setProductList({mallCategoryInfo: {}, productList:[]});
      return;
    }
      // 若成功
    mallCategoryInfo.data.mainCategoryList = [
      {id: -1, name: '推荐', imgAddress: '/images/category/tuijian.png'},
      {id: -2, name: '限时促销', imgAddress: '/images/category/tuijian.png'}
    ].concat(mallCategoryInfo.data.mainCategoryList);

    console.log('startTime', new Date());

    /** 3、根据服务站Id、便利店 categoryId，获取便利店 各categoryId下，商品数组 */
    let productList = await this.getProductListByCategory(storeInfo.data[0].storeId, mallCategoryInfo.data.mainCategoryList);

    console.log('endTime', new Date());

    // 过滤掉 无商品的类别
    let filter_mainCategoryList = [];
    let filter_productList = [];

    for (let i=0;i<productList.length;i++){
      if(productList[i].length){
        filter_mainCategoryList.push(mallCategoryInfo.data.mainCategoryList[i]);
        filter_productList.push(productList[i]);
      }
    }
    mallCategoryInfo.data.mainCategoryList = filter_mainCategoryList;
    productList = filter_productList;


    // 更新 商品大类、banner图、产品列表
    this.props.setProductList({mallCategoryInfo: mallCategoryInfo.data, productList});
  }

  /** 1、根据小区名字, 获取服务站信息 */
  async loadInitStoreInfoByCommunityId(communityId){
    const storeInfo = await request.get(config.api.loadInitStoreInfoByCommunityId, {communityId});
    return storeInfo;
  }

  /** 2、根据服务站Id, 获取便利店 categoryId 数组、头部banner图片 */
  async getMallIndexInfo(storeId){
    const mallCategoryInfo = await request.get(config.api.getMallIndexInfo, {storeId});
    return mallCategoryInfo;
  }

  /** 3、根据服务站Id、便利店 categoryId，获取便利店 各categoryId下，商品数组 */
  async getProductListByCategory(storeId, mainCategoryList){
    const productList = await Promise.all(mainCategoryList.map(item => request.get(config.api.getProductListByCategory, {
      storeId,
      categoryId: item.id
    })));
    return productList.map(item => item.data);
  }
});

function mapStateToProps(state){
  return {
    currentLocation: state.location.currentLocation
  };
}

export default locationManage;