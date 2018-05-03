/* --- 待回收物品 ---*/
import {ADD_RecycledItem, REDUCE_RecycledItem, RESET_RecycledItemsList} from "../../actions/Recycle";

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

export default recycledItemsList;