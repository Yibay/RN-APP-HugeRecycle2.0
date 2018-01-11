import _ from 'lodash';

// type 类型
export const SET_AllProducts = 'SET_AllProducts'; // 初始化 电器列表、家具列表 等
export const ADD_RecycledItem = 'ADD_RecycledItem'; // 向 待回收订单中，添加 回收物
export const REDUCE_RecycledItem = 'REDUCE_RecycledItem'; // 从 待回收订单中，减少 回收物

// 其他常量
export const categoryElectricProduct = 'electricProduct';
export const categoryFurnitureProduct = 'furnitureProduct';


/* ------ Action 生成函数 ------ */

/**
 * 设置 全部回收物（含 废旧家电、废旧家具）
 *
 * @param {
 *  {
 *   [electricProducts]: array,
 *   [furnitureProducts]: array }
 *  } AllProducts
 * @returns {{
 *  type: string,
 *  electricProducts: array,
 *  furnitureProducts: array }}
 */
export function setAllProducts(AllProducts){
  return _.assign(
    { type: SET_AllProducts },
    AllProducts
  );
}



/**
 * 向待回收订单中，添加待回收物
 *
 * @param {string} category  oneOf(['electricProduct', furnitureProduct])
 * @param {number} categoryId
 * @param {number} specsId
 * @param {number} itemNum
 * @returns {{type: string, category: string, categoryId: number, specsId: number, itemNum: number}}
 */
export function addRecycledItem (category, categoryId, specsId, itemNum){
  return {
    type: ADD_RecycledItem,
    category,
    categoryId,
    specsId,
    itemNum
  }
}

/**
 * 从待回收订单中，减少待回收物
 * @param {string} category  oneOf(['electricProduct', furnitureProduct])
 * @param {number} categoryId
 * @param {number} specsId
 * @param {number} itemNum
 * @returns {{type: string, category: string, categoryId: number, specsId: number, itemNum: number}}
 */
export function reduceRecycledItem (category, categoryId, specsId, itemNum){
  return {
    type: REDUCE_RecycledItem,
    category,
    categoryId,
    specsId,
    itemNum
  }
}