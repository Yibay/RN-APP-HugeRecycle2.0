import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import request from '../../util/request/request';
import config from '../../util/request/config';
import { setAllProducts } from '../../redux/actions/Recycle';

import Header from '../../components/common/Header/Header';
import NavBarLocationButton from '../../containers/Recycle/NavBarRightButton/NavBarLocationButton';
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
      {/* 页头 */}
      <Header title='我要回收' hideBack={true} leftButton={<NavBarLocationButton/>} rightButton={<Text style={styles.loginBtn} onPress={() => Actions.login()}>登录</Text>}/>
      {/* 导航条 */}
      <Navigator navigationItems={this.props.category}>
        {
          /* 分页: 1阶回收大分类 */
          Reflect.ownKeys(AllProductsObj)
            .sort((key1, key2) => AllProductsObj[key1].sort - AllProductsObj[key2].sort) // 按 sort 序号排序
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
  },
  loginBtn: {
    fontSize: 28
  }
});

function mapStateToProps(state){
  return {
    category: state.recycle.recyclableGoods.AllProductsArray
      .sort((val1, val2) => val1.sort - val2.sort) // 按 sort 序号排序
      .map(item => ({itemName: item.categoryName})),
    recyclableGoods: state.recycle.recyclableGoods
  }
}

const actionsCreator = { setAllProducts };

export default connect(mapStateToProps, actionsCreator)(Recycle);