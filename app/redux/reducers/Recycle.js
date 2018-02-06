import { combineReducers } from 'redux';
import _ from 'lodash';


// type 类型
import { SET_AllProducts, ADD_RecycledItem, REDUCE_RecycledItem, RESET_RecycledItemsList } from '../actions/Recycle';


/* ------ reducer 函数 ------ */

/* --- 可回收物品 ---*/
/**
 * 可回收物品列表
 * @param state
 * @param action
 * @returns {{AllProductsObj: object, AllProductsArray: array, AllProductsNum: number}}
 */
function recyclableGoods(state = { AllProductsObj:{}, AllProductsArray:[], AllProductsNum:0 }, action){

  let new_state = {};

  switch (action.type){

    // 1. 初始化 可回收物品 列表
    case SET_AllProducts:
    // 4. 清空回收订单 内物品
    case RESET_RecycledItemsList:

      // filter 掉不显示的数据结构
      new_state.AllProductsArray = action.AllProductsArray.filter(item => item.show);
      new_state.AllProductsNum = new_state.AllProductsArray.length;

      // AllProducts 数组转对象
      new_state.AllProductsObj = {};
      for(let item of new_state.AllProductsArray){

        // subCategory 数组转对象
        item.subCategoryObj = {};
        for(let subItem of item.subCategory){

          // specs 数组转对象
          subItem.specsObj = {};
          for(let specsItem of subItem.specs){
            subItem.specsObj[`id${specsItem.id}`] = specsItem;
          }
          delete subItem.specs;

          item.subCategoryObj[`id${subItem.id}`] = subItem;
        }
        delete item.subCategory;

        new_state.AllProductsObj[`sort${item.sort}`] = item;
      }

      return new_state;

    // 2. 向 回收订单添加 物品
    case ADD_RecycledItem:

      new_state = _.merge({}, state);
      // 该物品 存在，且不为0，number ++
      if(new_state.AllProductsObj[`sort${action.sort}`].subCategoryObj[`id${action.categoryId}`].specsObj[`id${action.specsId}`].number){
        new_state.AllProductsObj[`sort${action.sort}`].subCategoryObj[`id${action.categoryId}`].specsObj[`id${action.specsId}`].number ++;
      }
      // 该物品 number undefined || 0 ，number ＝ 1
      else{
        new_state.AllProductsObj[`sort${action.sort}`].subCategoryObj[`id${action.categoryId}`].specsObj[`id${action.specsId}`].number = 1;
      }

      return new_state;

    // 3. 从 回收订单中减少 物品
    case REDUCE_RecycledItem:

      new_state = _.merge({}, state);
      // 该物品 存在，且不为0，number --
      if(new_state.AllProductsObj[`sort${action.sort}`].subCategoryObj[`id${action.categoryId}`].specsObj[`id${action.specsId}`].number){
        new_state.AllProductsObj[`sort${action.sort}`].subCategoryObj[`id${action.categoryId}`].specsObj[`id${action.specsId}`].number --;
      }
      // 该物品 number undefined || 0 ，number ＝ 0
      else{
        new_state.AllProductsObj[`sort${action.sort}`].subCategoryObj[`id${action.categoryId}`].specsObj[`id${action.specsId}`].number = 0;
      }

      return new_state;

    default:
      return state;
  }
}


/* --- 待回收物品 ---*/
/**
 * 待回收物品列表
 * @param state
 * @param action
 * @returns {{list: array, num: number}}
 */
function recycledItemsList (state={list:[],num:0}, action){

  let new_state,flag,new_itemNum;

  switch(action.type){

    // 1. 向 回收订单添加 物品
    case ADD_RecycledItem:

      // 数据不完整，则不修改
      if(!action.sort || !action.categoryId || !action.specsId) return state; // action.itemNum 可能为0，所以此处不做验证

      new_state = state;
      flag = true; // 是否需要 push进数组
      action.itemNum = action.itemNum || 0; // action.itemNum undefined 设为0
      new_itemNum = action.itemNum + 1; // (+1, 因为 此时store也在 同步更新，此处传入数据 并不是 更新后的结果)

      // 若 已存在，则不重复添加
      for(let item of new_state.list){
        if(item.sort === action.sort && item.categoryId === action.categoryId && item.specsId === action.specsId){
          // 已存在，修改数量
          item.itemNum = new_itemNum; // (+1, 因为 此时store也在 同步更新，此处传入数据 并不是 更新后的结果)
          flag = false;
          break;
        }
      }

      // 若 不存在，则新增 入数组
      if(flag){
        new_state.list.push({sort: action.sort, categoryId: action.categoryId, specsId: action.specsId, itemNum: new_itemNum}) // (+1, 因为 此时store也在 同步更新，此处传入数据 并不是 更新后的结果)
      }

      // 总数 + 1
      new_state.num ++;

      return new_state;

    // 2. 从 回收订单中减少 物品
    case REDUCE_RecycledItem:

      // 数据不完整，则不修改
      if(!action.sort || !action.categoryId || !action.specsId || !action.itemNum) return state; // action.itemNum 为0 或 undefined时，不修改

      new_state = state;
      flag = false; // 是否需要 从数组中移除
      new_itemNum = action.itemNum - 1; // (-1, 待回收物品 数量 -1)

      // 若 已存在，则修改数量
      for(let item of new_state.list){
        if(item.sort === action.sort && item.categoryId === action.categoryId && item.specsId === action.specsId){
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

    // 3. 清空回收订单 内物品
    case RESET_RecycledItemsList:
      return {list:[],num:0};

    default:
      return state;
  }

}


export default combineReducers({ recyclableGoods, recycledItemsList });