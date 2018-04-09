import {combineReducers} from 'redux';


import {FETCH_StoreGoods_Request, FETCH_StoreGoods_Success, FETCH_StoreGoods_Failure} from '../../actions/mall/storeGoods';


function bannerList(state=[], actions){
  switch(actions.type){
    case FETCH_StoreGoods_Success:
      return actions.data.bannerList;
    case FETCH_StoreGoods_Failure:
      return [];
    default:
      return state;
  }
}

function mainCategoryList(state=[], actions){
  switch(actions.type){
    case FETCH_StoreGoods_Success:
      return actions.data.mainCategoryList;
    case FETCH_StoreGoods_Failure:
      return [];
    default:
      return state;
  }
}

function productList(state=[], actions){
  switch(actions.type){
    case FETCH_StoreGoods_Success:
      return actions.data.productList;
    case FETCH_StoreGoods_Failure:
      return [];
    default:
      return state;
  }
}

let data = combineReducers({bannerList, mainCategoryList, productList});

function isFetching(state=false, actions){
  switch(actions.type){
    case FETCH_StoreGoods_Request:
      return true;
    case FETCH_StoreGoods_Success:
    case FETCH_StoreGoods_Failure:
      return false;
    default:
      return state;
  }
}

let storeGoods = combineReducers({data, isFetching});

export default storeGoods;