import request from '../../../util/request/request';
import config from '../../../util/request/config';


export const FETCH_RecycleOrderDetail_Request = 'FETCH_RecycleOrderDetail_Request';
export const FETCH_RecycleOrderDetail_Success = 'FETCH_RecycleOrderDetail_Success';
export const FETCH_RecycleOrderDetail_Failure = 'FETCH_RecycleOrderDetail_Failure';

// 请求 订单详情
export function fetchRecycleOrderDetail(orderId){
  return async (dispatch, getState) => {

    let state = getState();

    dispatch({type: FETCH_RecycleOrderDetail_Request});

    const res = await request.get(config.api.recycleRecordDetail,{orderId},{'X-AUTH-TOKEN': state.identityToken.authToken});
    if(res &&  !res.status){
      dispatch({
        type: FETCH_RecycleOrderDetail_Success,
        data:{
          // 订单状态
          orderStatusId: res.data.orderStatusId,
          gradeStatus: res.data.gradeStatus,
          gradeStatusDesc: res.data.gradeStatusDesc,
          // 回收地址
          accountName: res.data.tServiceOrder.accountName,
          phone: res.data.phone,
          addr: res.data.addr,
          // 回收人员信息
          recyclerHeadPic: res.data.tServiceOrder.recyclerHeadPic,
          recyclerName: res.data.tServiceOrder.recyclerName,
          recyclerPhone: res.data.tServiceOrder.recyclerPhone,
          // 待回收物品
          recycleCategoryDesc: res.data.recycleCategoryDesc,
          // 实际回收物品
          orderItems: (res.data.tServiceOrder.orderItems && res.data.tServiceOrder.orderItems instanceof Array) ? res.data.tServiceOrder.orderItems.map(item => {item.integral = item.integral / 100; return item;}) : [],
          // 环保金信息
          phoneScore: res.data.tServiceOrder.phone, // 获得环保金 电话
          orderScore: res.data.tServiceOrder.orderScore, // 获得环保金金额
          payAmount: res.data.payAmount, // 获得现金金额
          // 订单号状态时间
          orderTime: [
            res.data.tServiceOrder.createdTs ? {status:'下单时间', time: res.data.tServiceOrder.createdTs} : null,
            // res.data.tServiceOrder.confirmedTs ? {status:'确认订单时间', time: res.data.tServiceOrder.confirmedTs} : null,
            // res.data.tServiceOrder.dispatchedTs ? {status:'派单时间', time: res.data.tServiceOrder.dispatchedTs} : null,
            // res.data.tServiceOrder.rejectedTs ? {status:'退回订单时间', time: res.data.tServiceOrder.rejectedTs} : null,
            res.data.tServiceOrder.acceptedTs ? {status:'接单时间', time: res.data.tServiceOrder.acceptedTs} : null,
            res.data.tServiceOrder.arrivedTs ? {status:'到达时间', time: res.data.tServiceOrder.arrivedTs} : null,
            res.data.tServiceOrder.completedTs ? {status:'完成时间', time: res.data.tServiceOrder.completedTs} : null,
            res.data.tServiceOrder.cancelledTs ? {status:'取消时间', time: res.data.tServiceOrder.cancelledTs} : null,
            // res.data.tServiceOrder.remarkedTs ? {status:'评论时间', time: res.data.tServiceOrder.remarkedTs} : null,
          ].filter(item => item),
          orderGrade: [
            res.data.orderGradeView.rateSpeed ? {title: '上门时间', rate: res.data.orderGradeView.rateSpeed, evaluate: rateText(res.data.orderGradeView.rateSpeed)} : null,
            res.data.orderGradeView.rateService ? {title: '服务态度', rate: res.data.orderGradeView.rateService, evaluate: rateText(res.data.orderGradeView.rateService)} : null,
            res.data.orderGradeView.reviews ? {title: '评语', evaluate: res.data.orderGradeView.reviews} : null,
          ].filter(item => item),
        },
        dataSource: res.data,
      });
    }
    else{
      dispatch({type: FETCH_RecycleOrderDetail_Request});
    }
  };
}

function rateText(rate){
  switch (rate){
    case 3:
      return '满意';
    case 2:
      return '一般';
    case 1:
      return '不满意';
    default:
      return '满意';
  }
}