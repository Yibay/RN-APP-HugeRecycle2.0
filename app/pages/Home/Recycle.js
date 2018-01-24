import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';


import request from '../../util/request/request';
import config from '../../util/request/config';
import { setAllProducts } from '../../redux/actions/Recycle';

import Header from '../../components/common/Header/Header';
import RecycleRightButton from '../../containers/Recycle/NavBarRightButton/NavBarRightButton';
import Navigator from '../../components/common/Navigator/Navigator';
import SubCategory from '../../components/pages/Recycle/SubCategory';
import CallModule from '../../containers/Recycle/CallModule';
import CallModal from '../../containers/Recycle/CallModal';


class Recycle extends Component{

  constructor(props){
    super(props);

    this.state = {
      callModalVisible: false
    };
  }

  render(){
    let AllProductsObj = this.props.recyclableGoods.AllProductsObj;

    return (<View style={styles.container}>
      <Header title='我要回收' hideBack={true} leftButton={<RecycleRightButton/>} rightButton={<Text>登录</Text>}/>
      {/* 导航条 */}
      <Navigator category={this.props.category}>
        {
          /* 分页: 1阶回收大分类 */
          Reflect.ownKeys(AllProductsObj)
            .map(key => (<SubCategory key={key} subCategoryObj={AllProductsObj[key].subCategoryObj} sort={AllProductsObj[key].sort} />))
        }
      </Navigator>
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
          console.log(res.data);
          // 更新全局数据
          this.props.setAllProducts(res.data);
        }
      })
      .catch(e => console.log(e));
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