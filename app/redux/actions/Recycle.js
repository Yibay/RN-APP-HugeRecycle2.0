import _ from 'lodash';

// type 类型
export const SET_AllProducts = 'SET_AllProducts'; // 设置 电器列表、家具列表 等
export const SET_ElectricProducts = 'SET_ElectricProducts';  // 设置 电器列表
export const SET_FurnitureProducts = 'SET_FurnitureProducts';// 设置 家具列表
export const ADD_ElectricProduct = 'ADD_ElectricProduct'; // 添加 废旧电器 回收物
export const ADD_FurnitureProduct = 'ADD_FurnitureProduct'; // 添加 废旧家具 回收物


/* ------ Action 生成函数 ------ */

/**
 * 设置 全部回收物（含 废旧家电、废旧家具）
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
// 设置 废旧家电
export function setElectricProducts (electricProducts){
  return {
    type: SET_ElectricProducts,
    electricProducts
  }
}


// 设置 废旧家具
export function setFurnitureProducts (furnitureProducts){
  return {
    type: SET_FurnitureProducts,
    furnitureProducts
  }
}


// 选中 某废旧家电 物品
export function addElectricProduct (categoryId, specsId){
  return _.assign(
    { type: ADD_ElectricProduct },
    categoryId ? { categoryId } : {},
    specsId ? { specsId } : {}
  );
}