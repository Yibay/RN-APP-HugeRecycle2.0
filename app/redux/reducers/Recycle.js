import { combineReducers } from 'redux';

import _ from 'lodash';


import {
  // type 类型
  SET_AllProducts, ADD_RecycledItem,
  // 回收分类 常量
  categoryElectricProduct
} from '../actions/Recycle';


/* ------ reducer 函数 ------ */
// 废旧家电
function electricProducts(state=[], action){
  switch (action.type){
    case SET_AllProducts:
      if(!action.electricProducts) return state; // 无家电数据，则不修改
      return action.electricProducts;
    default:
      return state;
  }
}
// 废旧家电 (Object) 此数据结构 便于 存储选中物品数量
function electricProductsObj(state={}, action){

  let new_state = {};  // 设置废旧家电

  switch (action.type){

    // 设置全部 回收分类 列表
    case SET_AllProducts:

      if(!action.electricProducts) return state; // 无家电数据，则不修改

      for (let item of action.electricProducts){
        let key = 'id' + item.id;
        new_state[key] = item;   // 将1级分类数组 映射成 Object

        new_state[key]['specsObj'] = {};
        for (let itemSpecs of item.specs){
          let keySpecs = 'id' + itemSpecs.id;
          new_state[key]['specsObj'][keySpecs] = itemSpecs; // 将2级分类数组 映射成 Object
        }
      }
      return new_state;

    // 向 回收订单添加 物品
    case ADD_RecycledItem:

      // 无家电数据，则不修改
      if(!action.category || !action.categoryId || !action.specsId || (action.category !== categoryElectricProduct)) return state;

      new_state = _.merge(new_state, state);
      if(new_state['id' + action.categoryId].specsObj['id' + action.specsId].number){
        new_state['id' + action.categoryId].specsObj['id' + action.specsId].number ++;
      }
      else{
        new_state['id' + action.categoryId].specsObj['id' + action.specsId].number = 1;
      }
      return new_state;

    default:
      return state;
  }
}

// 废旧家具
function furnitureProducts(state=[], action){
  switch (action.type){
    case SET_AllProducts:
      if(!action.furnitureProducts) return state; // 无家具数据，则不修改
      return action.furnitureProducts;
    default:
      return state;
  }
}

// 废旧家具 (Object) 此数据结构 便于 存储选中物品数量
function furnitureProductsObj(state={}, action){
  switch (action.type){

    // 设置全部 回收分类 列表
    case SET_AllProducts:

      if(!action.furnitureProducts) return state; // 无家具数据，则不修改

      let new_state = {};
      for (let item of action.furnitureProducts){
        let key = 'id' + item.id;
        new_state[key] = item;   // 将1级分类数组 映射成 Object

        new_state[key]['specsObj'] = {};
        for (let itemSpecs of item.specs){
          let keySpecs = 'id' + itemSpecs.id;
          new_state[key]['specsObj'][keySpecs] = itemSpecs; // 将2级分类数组 映射成 Object
        }
      }
      return new_state;
    default:
      return state;
  }
}

// 可回收物品
const recyclableGoods = combineReducers({ electricProductsObj, furnitureProductsObj });


export default combineReducers({ recyclableGoods });