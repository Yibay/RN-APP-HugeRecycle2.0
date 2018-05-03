import _ from 'lodash';

/* --- 可回收物品 ---*/
import {ADD_RecycledItem, REDUCE_RecycledItem, RESET_RecycledItemsList, SET_AllProducts} from "../../actions/Recycle";

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

export default recyclableGoods;