import config from "../../../util/request/config";
import request from "../../../util/request/request";


export const FETCH_ShoppingCart_Request = 'FETCH_ShoppingCart_Request';
export const FETCH_ShoppingCart_Success = 'FETCH_ShoppingCart_Success';
export const FETCH_ShoppingCart_Failure = 'FETCH_ShoppingCart_Failure';
export const FETCH_ShoppingCartAmount_Request = 'FETCH_ShoppingCartAmount_Request';
export const FETCH_ShoppingCartAmount_Success = 'FETCH_ShoppingCartAmount_Success';
export const FETCH_ShoppingCartAmount_Failure = 'FETCH_ShoppingCartAmount_Failure';


// 请求购物车数据
export function fetchShoppingCart(){
  return async function(dispatch, getState){
    let state = getState();
    // 未登录 或 当前地址无便利店
    if(!state.identityToken.authToken || !state.mall.store.data.storeInfo.length){
      return null;
    }
    // 之前请求未结束
    // if(state.mall.shoppingCart.isFetching){
    //   return;
    // }
    // 发起请求（购物车数据）
    dispatch({type: FETCH_ShoppingCart_Request});
    const res = await request.get(
      config.api.getShoppingCartProductList,
      {storeId: state.mall.store.data.storeInfo[state.mall.store.data.storeIndex].storeId},
      {'X-AUTH-TOKEN': state.identityToken.authToken});

    if(res && !res.status){
      let buyAmount = 0;
      if(res.data.validProductList){
        if(res.data.validProductList.length === 1){
          buyAmount = res.data.validProductList[0].buyAmount;
        }
        if(res.data.validProductList.length > 1){
          buyAmount = res.data.validProductList.reduce((preVal, curVal, curIndex) => {
            if(curIndex === 1){
              preVal = preVal.buyAmount;
            }
            return preVal + curVal.buyAmount;
          });
        }
      }
      return dispatch({
        type: FETCH_ShoppingCart_Success,
        validProductList: res.data.validProductList || [],
        invalidProductList: res.data.invalidProductList || [],
        amount: buyAmount
      })
    }
    else{
      return dispatch({
        type: FETCH_ShoppingCart_Failure
      })
    }
  }
}

// 添加到购物车
export function addCart(storeProductId){
  return async (dispatch, getState) => {

    let state = getState();

    // 权限验证
    let authToken = state.identityToken.authToken;
    if(!authToken){return;}


    const res = await request.get(`${config.api.addCart}${storeProductId}`,{amount:1},{'X-AUTH-TOKEN': authToken});
    if(res && !res.status){
      // 刷新购物车
      return dispatch(fetchShoppingCart());
    }
    else{
      console.log(res);
    }
  }
}

// 修改购物车商品选中状态
export function changeNeedPay(shoppingCartId, isNeedPay) {
  return async (dispatch, getState) => {
    let state = getState();
    let authToken = state.identityToken.authToken;
    if(!authToken){return null;}

    const res = await request.get(`${config.api.changeNeedPay}${shoppingCartId}`,{isNeedPay:Number(isNeedPay)},{'X-AUTH-TOKEN':authToken});
    if(res && !res.status){
      // 刷新购物车
      return dispatch(fetchShoppingCart());
    }
    else {
      console.log(res);
      return null;
    }
  }
}

// 从购物车中删除
export function deleteFormCart(shoppingCartId){
  return async(dispatch, getState) => {
    let state = getState();

    let authToken = state.identityToken.authToken;
    if(!authToken){return;}

    const res = await request.get(`${config.api.deleteFormCart}${shoppingCartId}`,null,{'X-AUTH-TOKEN': authToken});
    if(res && !res.status){
      // 刷新 购物车
      return dispatch(fetchShoppingCart());
    }
    else{
      console.log(res);
    }
  }
}

// 请求购物车 角标（里面商品数量）
export function fetchShoppingCartAmount(){
  return async (dispatch, getState) => {

    let state = getState();

    // 权限验证
    let authToken = state.identityToken.authToken;
    if(!authToken){return;}

    let storeInfo = state.mall.store.data.storeInfo;
    let storeIndex = state.mall.store.data.storeIndex;

    // 无匹配便利店 直接退出
    if(!storeInfo.length){
      return;
    }

    let storeId = storeInfo[storeIndex].storeId;

    dispatch({type: FETCH_ShoppingCartAmount_Request});
    const res = await request.postFormData(config.api.cartProductAmount, {storeId}, {'X-AUTH-TOKEN': authToken});
    if(res && !res.status){
      // 刷新购物车
      return dispatch({type: FETCH_ShoppingCartAmount_Success, amount: res.data});
    }
    else{
      return dispatch({type: FETCH_ShoppingCartAmount_Failure});
    }
  }
}