import { combineReducers } from 'redux';

import _ from 'lodash';


import {
  // type 类型
  SET_AllProducts, ADD_RecycledItem, REDUCE_RecycledItem,
  // 回收分类 常量
  categoryElectricProduct, categoryFurnitureProduct
} from '../actions/Recycle';


/* ------ reducer 函数 ------ */

/* --- 可回收物品 ---*/

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

  let new_state = {};  // 新废旧家电 数据

  switch (action.type){

    // 初始化 全部 回收分类 列表
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

    // 从 回收订单减少 物品
    case REDUCE_RecycledItem:

      // 无家电数据，则不修改
      if(!action.category || !action.categoryId || !action.specsId || (action.category !== categoryElectricProduct)) return state;

      new_state = _.merge(new_state, state);
      if(new_state['id' + action.categoryId].specsObj['id' + action.specsId].number){
        new_state['id' + action.categoryId].specsObj['id' + action.specsId].number --;
      }
      else{
        new_state['id' + action.categoryId].specsObj['id' + action.specsId].number = 0;
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

  let new_state = {}; // 新废旧家电 数据

  switch (action.type){

    // 初始化 全部 回收分类 列表
    case SET_AllProducts:

      if(!action.furnitureProducts) return state; // 无家具数据，则不修改

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

    // 向 回收订单添加 物品
    case ADD_RecycledItem:

      // 无家具数据，则不修改
      if(!action.category || !action.categoryId || !action.specsId || (action.category !== categoryFurnitureProduct)) return state;

      new_state = _.merge(new_state, state);
      if(new_state['id' + action.categoryId].specsObj['id' + action.specsId].number){
        new_state['id' + action.categoryId].specsObj['id' + action.specsId].number ++;
      }
      else{
        new_state['id' + action.categoryId].specsObj['id' + action.specsId].number = 1;
      }
      return new_state;

    // 从 回收订单减少 物品
    case REDUCE_RecycledItem:

      // 无家具数据，则不修改
      if(!action.category || !action.categoryId || !action.specsId || (action.category !== categoryFurnitureProduct)) return state;

      new_state = _.merge(new_state, state);
      if(new_state['id' + action.categoryId].specsObj['id' + action.specsId].number){
        new_state['id' + action.categoryId].specsObj['id' + action.specsId].number --;
      }
      else{
        new_state['id' + action.categoryId].specsObj['id' + action.specsId].number = 0;
      }
      return new_state;

    default:
      return state;
  }
}

// 可回收物品
const recyclableGoods = combineReducers({ electricProductsObj, furnitureProductsObj });


/* --- 待回收物品 ---*/

function recycledItemsList (state={list:[],num:0}, action){

  let new_state,flag,new_itemNum;

  switch(action.type){

    // 向 回收订单添加 物品
    case ADD_RecycledItem:

      // 数据不完整，则不修改
      if(!action.category || !action.categoryId || !action.specsId) return state; // action.itemNum 可能为0，所以此处不做验证

      new_state = state;
      flag = true; // 是否需要 push进数组
      new_itemNum = action.itemNum + 1; // (+1, 因为 此时store也在 同步更新，此处传入数据 并不是 更新后的结果)

      // 若 已存在，则不重复添加
      for(let item of new_state.list){
        if(item.category === action.category && item.categoryId === action.categoryId && item.specsId === action.specsId){
          // 已存在，修改数量
          item.itemNum = new_itemNum; // (+1, 因为 此时store也在 同步更新，此处传入数据 并不是 更新后的结果)
          flag = false;
          break;
        }
      }

      // 若 不存在，则新增 入数组
      if(flag){
        new_state.list.push({category: action.category, categoryId: action.categoryId, specsId: action.specsId, itemNum: new_itemNum}) // (+1, 因为 此时store也在 同步更新，此处传入数据 并不是 更新后的结果)
      }

      // 总数 + 1
      new_state.num ++;

      return new_state;

    // 从 回收订单中减少 物品
    case REDUCE_RecycledItem:

      // 数据不完整，则不修改
      if(!action.category || !action.categoryId || !action.specsId || !action.itemNum) return state; // action.itemNum 为0 或 undefined时，不修改

      new_state = state;
      flag = false; // 是否需要 从数组中移除
      new_itemNum = action.itemNum - 1; // (-1, 待回收物品 数量 -1)

      // 若 已存在，则修改数量
      for(let item of new_state.list){
        if(item.category === action.category && item.categoryId === action.categoryId && item.specsId === action.specsId){
          // 已存在，修改数量
          item.itemNum = new_itemNum; // (+1, 因为 此时store也在 同步更新，此处传入数据 并不是 更新后的结果)
          // 若数量 减至0，则 从待回收列表中，移除
          item.itemNum || (flag = true);
          break;
        }
      }

      // 某物品 数量减至0，则 从待回收列表中，移除
      if(flag){
        new_state.list = new_state.list.filter(item => item.itemNum);
      }

      // 总数 - 1
      new_state.num --;

      return new_state;

    default:
      return state;
  }

}


export default combineReducers({ recyclableGoods, recycledItemsList });