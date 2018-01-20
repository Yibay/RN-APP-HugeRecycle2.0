import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';


import request from '../../util/request/request';
import config from '../../util/request/config';

import { setAllProducts } from '../../redux/actions/Recycle';

import ClassificationNavigation from '../../containers/Recycle/ClassificationNavigation';
import SubCategory from '../../containers/Recycle/SubCategory';
import CallModule from '../../containers/Recycle/CallModule';
import CallModal from '../../containers/Recycle/CallModal';


class Recycle extends Component{

  constructor(props){
    super(props);

    this.state = {
      selectedCategory: 0, // 初始值 0 ，会被 componentWillReceiveProps 中覆写，被覆写后 值不为0，则 不再被覆写
      callModalVisible: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.category instanceof Array && nextProps.category.length && !this.state.selectedCategory){
      this.setState({
        selectedCategory: nextProps.category[0].categoryNum // 回收类别选中项（默认 选中第一项）
      });
    }
  }

  render(){
    let AllProductsObj = this.props.recyclableGoods.AllProductsObj;

    return (<View style={styles.container}>
      {/* 导航条 */}
      <ClassificationNavigation category={this.props.category} selectedCategory={this.state.selectedCategory} switchCategory={this.switchCategory.bind(this)} />
        {
          /* 分页: 1阶回收大分类 */
          Reflect.ownKeys(AllProductsObj)
            .map(key => (<SubCategory key={key} show={this.state.selectedCategory === AllProductsObj[key].sort} subCategoryObj={AllProductsObj[key].subCategoryObj} sort={AllProductsObj[key].sort} />))
        }
      {/* 底栏：一键呼叫按钮 */}
      <CallModule showCallModal={() => this.showCallModal()} />
      {/* 弹窗：一键呼叫 */}
      <CallModal visible={this.state.callModalVisible} hideCallModal={() => this.hideCallModal()} />
    </View>)
  }

  componentDidMount(){
    // 请求 回收类别相应数据
    request
      .get(config.api.getProducts)
      .then(res => {
        // 若请求成功，数据正常
        if(!res.status){
          // 更新全局数据
          this.props.setAllProducts(res.data);
        }
      })
      .catch(e => console.log(e));
  }

  // 切换类别
  switchCategory(categoryNum){
    this.setState({
      selectedCategory: categoryNum
    });
  }

  // 弹出 一键呼叫 弹窗
  showCallModal(){
    this.setState({
      callModalVisible: true
    });
  }
  // 隐藏 一键呼叫 弹窗
  hideCallModal(){
    this.setState({
      callModalVisible: false
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

function mapStateToProps(state){
  return {
    category: state.recycle.recyclableGoods.AllProductsArray
      .sort((val1, val2) => val1.sort - val2.sort)
      .map(item => ({categoryName: item.categoryName, categoryNum: item.sort})),
    recyclableGoods: state.recycle.recyclableGoods
  }
}

const actionsCreator = { setAllProducts };

export default connect(mapStateToProps, actionsCreator)(Recycle);