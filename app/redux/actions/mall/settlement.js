import {Alert} from "react-native";
import {Actions} from "react-native-router-flux";
import {pay} from "react-native-alipay";

import config from "../../../util/request/config";
import request from "../../../util/request/request";
import string_xml from "../../../util/request/string";

export const FETCH_SettlementData_Request = 'FETCH_SettlementData_Request';
export const FETCH_SettlementProductList_Success = 'FETCH_SettlementProductList_Success';
export const FETCH_SettlementPayMsg_Success = 'FETCH_SettlementPayMsg_Success';
export const FETCH_SettlementPayMsg_Failure = 'FETCH_SettlementPayMsg_Failure';
export const FETCH_SettlementData_Finish = 'FETCH_SettlementData_Finish';

export const SUBMIT_MallOrder_Request = 'SUBMIT_MallOrder_Request';
export const SUBMIT_MallOrder_Finish = 'SUBMIT_MallOrder_Finish';

// 获取结算页信息
export function fetchSettlementData(){
  return async (dispatch, getState) => {

    dispatch({type: FETCH_SettlementData_Request});

    await Promise.all([
      dispatch(fetchSettlementProductList()),
      dispatch(fetchPayMsg())
    ]);

    dispatch({type: FETCH_SettlementData_Finish});
  };
}

// 获取结算页 商品列表 数据
function fetchSettlementProductList(){
  return async (dispatch, getState) => {

    let state = getState();
    let storeId = state.mall.store.data.storeInfo[state.mall.store.data.storeIndex].storeId;
    let authToken = state.identityToken.authToken;

    if(!authToken)return;

    const res = await request.get(config.api.settlementProductList,{storeId},{'X-AUTH-TOKEN': authToken});
    if(res && !res.status){
      return dispatch({
        type: FETCH_SettlementProductList_Success,
        validProductList: res.data.validProductList,
        invalidProductList: res.data.invalidProductList
      });
    }
  };
}

// 获取结算页 支付信息
function fetchPayMsg(){
  return async (dispatch, getState) => {

    let state = getState();
    let storeId = state.mall.store.data.storeInfo[state.mall.store.data.storeIndex].storeId;
    let authToken = state.identityToken.authToken;

    const res = await request.get(config.api.getNeedPayResult,{storeId},{'X-AUTH-TOKEN': authToken});
    if(res && !res.status){
      return dispatch({
        type: FETCH_SettlementPayMsg_Success,
        payMsg: res.data
      });
    }
    else if(res && res.status){
      return dispatch({
        type: FETCH_SettlementPayMsg_Failure,
      })
    }
  };
}



/** 支付actions */


// 创建订单请求
export function submitMallOrder(option){
  return async (dispatch, getState) => {

    let authToken = getState().identityToken.authToken;

    // 1. 下单请求 (获取订单号)
    dispatch({type: SUBMIT_MallOrder_Request});
    const res = await Promise.race([
      request.postFormData(config.api.confirmMallOrder, option, {'X-AUTH-TOKEN': authToken}),
      new Promise(resolve => {setTimeout(() => resolve({status:1,message: string_xml.network_poor2}),5000)})
    ]);
    if(!res || res.status){
      Alert.alert(res.message,'',[{text:'好'}]);
      dispatch({type: SUBMIT_MallOrder_Finish});
      return;
    }

    // 2. 支付
    // 环保金 充足
    if(res.data.code === 1){
      // 环保金支付
      dispatch(scorePay(res.data.orderId));
    }
    else{
      if(res.data.payType === 1){
        // 支付宝支付
        dispatch(aliPay(res.data.orderId));
      }
      else {
        // 货到付款
        dispatch(receiptMallOrderPay(res.data.orderId));
      }
    }

    dispatch({type: SUBMIT_MallOrder_Finish});
  }
}

// 支付 未支付订单
export function continueMallOrder(orderId){
  return async (dispatch, getState) => {

    let authToken = getState().identityToken.authToken;

    // 1. 检验未支付订单，可否支付状态 ()
    let orderSource = 3; // 下单平台标示码（3为 app下单）
    const res = await request.get(config.api.checkOrder,{orderId, orderSource},{'X-AUTH-TOKEN': authToken});

    // 可支付
    if(res && !res.status){
      // 环保金 充足
      if(res.data.code === 1){
        // 环保金支付
        dispatch(scorePay(res.data.orderId));
      }
      else if(res.data.payType === 1){
        // 支付宝支付
        dispatch(aliPay(orderId));
      }
      else {
        // 货到付款
        dispatch(receiptMallOrderPay(orderId));
      }
    }
    else{
      Alert.alert(res.message || '支付失败','',[{text:'好'}]);
    }
  };
}


// 环保金支付
function scorePay(orderId){
  return async (dispatch, getState) => {

    let authToken = getState().identityToken.authToken;

    let resReceipt = await request.postFormData(config.api.scorePay,{orderId},{'X-AUTH-TOKEN': authToken});

    if(resReceipt && !resReceipt.status){
      Actions.replace('mallOrderSuccess'); // 替换页面为 下单成功页面
    }
    else if(Actions.currentScene !== 'mallOrderRecordPage'){
      Actions.replace('mallOrderRecordPage'); // 替换页面为 我的消费订单页面
    }
    else{
      Alert.alert(resReceipt.message ? resReceipt.message : '支付失败','',[{text:'好'}]);
    }

  }
}

// 支付宝付款
function aliPay(orderId){
  return async (dispatch, getState) => {
    // 向后端 请求支付宝 orderInfo
    let orderInfo = await request.get(config.api.getAlipayTradeAppPayResponse,{orderId});

    if(orderInfo && !orderInfo.status){
      orderInfo = orderInfo.data;

      // 调用 支付宝
      const result = await pay(orderInfo, true);
      if (result.resultStatus === '9000') { // 9000 支付成功；8000 支付结果确认中；6001 用户主动取消
        // 跳转到支付成功页
        Actions.replace('mallOrderSuccess');
      }
      else if(Actions.currentScene !== 'mallOrderRecordPage'){
        Actions.replace('mallOrderRecordPage');
      }
      else {
        // 啥也不做
        Alert.alert((result && result.message) ? result.message : '支付失败','',[{text:'好'}]);
      }
    }
    else if(Actions.currentScene !== 'mallOrderRecordPage'){
      // 调用支付宝失败
      Actions.replace('mallOrderRecordPage');
    }
    else {
      Alert.alert('支付失败','',[{text:'好'}]);
    }
  }
}

// 货到付款
function receiptMallOrderPay(orderId){
  return async (dispatch, getState) => {

    let authToken = getState().identityToken.authToken;

    let resReceipt = await request.postFormData(config.api.receiptMallOrderPay,{orderId},{'X-AUTH-TOKEN': authToken});

    if(resReceipt && !resReceipt.status){
      Actions.replace('mallOrderSuccess'); // 替换页面为 下单成功页面
    }
    else if(Actions.currentScene !== 'mallOrderRecordPage'){
      Actions.replace('mallOrderRecordPage'); // 替换页面为 我的消费订单页面
    }
    else{
      Alert.alert((resReceipt && resReceipt.message) ? resReceipt.message : '支付失败','',[{text:'好'}]);
    }

  }
}