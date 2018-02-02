import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import Header from '../../components/common/Header/Header';
import NavBarLocationButton from '../../containers/Recycle/NavBarLocationButton/NavBarLocationButton';
import Banner from '../../components/pages/Mall/Banner';
import CategoryList from '../../containers/Mall/CategoryList';
import ProductItem from '../../components/pages/Mall/ProductItem';
import AddBtn from '../../components/common/Form/Btn/AddBtn';


class Mall extends Component{
  render(){

    // 各类商品 合并后数组
    let combineProductList = [];
    for(let item of this.props.productList){
      combineProductList = combineProductList.concat(item);
    }
    console.log(combineProductList);

    return (<View style={styles.container}>
      <Header title='虎哥便利店' leftButton={<NavBarLocationButton showStationName={true} />} rightButton={!this.props.authToken ? <Text style={styles.loginBtn} onPress={() => Actions.login({needPop: true})}>登录</Text> : <View/>}/>
      <ScrollView style={styles.content}>
        {/* 轮播图 */}
        <View style={styles.bannerSection}>
          <Banner bannerList={this.props.mallCategoryInfo.bannerList} />
        </View>
        {/* 按类查询 */}
        <CategoryList mainCategoryList={this.props.mallCategoryInfo.mainCategoryList} />
        {/* 详细商品列表 */}
        <View style={styles.productList}>
          {
            combineProductList.map((item, index) => <ProductItem key={index} product={item} addToCart={<AddBtn/>} />)
          }
        </View>
      </ScrollView>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // 页头
  loginBtn: {
    fontSize: 28
  },
  // 内容区
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // banner 轮播
  bannerSection: {
    position: 'relative'
  },
  // 详细商品列表
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

function mapStateToProps(state){
  return {
    authToken: state.identityToken.authToken,
    mallCategoryInfo: state.mall.mallCategoryInfo,
    productList: state.mall.productList
  }
}

export default connect(mapStateToProps)(Mall);