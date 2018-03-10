import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import { verifyStoreInfo } from '../../../HOC/verifyStoreInfo';

import Header from '../../../components/Header/Header';
import NavBarLocationButton from '../../../containers/Recycle/NavBarLocationButton/NavBarLocationButton';
import Banner from '../../../containers/Mall/Banner';
import SearchInput from '../../../containers/Mall/SearchInput';
import CategoryList from '../../../containers/Mall/CategoryList';
import ProductList from '../../../containers/Mall/ProductList';


class Mall extends Component{

  constructor(props){
    super(props);

    this.state = {
      searchText: ''
    };
  }

  render(){

    // 1、过滤掉 无商品的分类
    let mainCategoryList = [];
    // 2、各类商品 合并后数组（商品列表）
    let combineProductList = [];

    for(let i=0;i<this.props.productList.length;i++){
      if(this.props.productList[i].length && this.props.mallCategoryInfo.mainCategoryList){
        mainCategoryList.push(this.props.mallCategoryInfo.mainCategoryList[i]);
      }
      combineProductList = combineProductList.concat(this.props.productList[i]);
    }

    // 3、列表头部组件（轮播图、按类查询）
    let ListHeaderComponent = <View>
      {/* 搜索框 */}
      <SearchInput style={styles.searchInput} searchText={this.state.searchText} onChangeText={val => this.setState({searchText: val})} onSearch={() => this.searchProduct()} />
      {/* 按类查询 */}
      <CategoryList mainCategoryList={mainCategoryList} />
      {/* 轮播图 */}
      <View style={styles.bannerSection}>
        <Banner style={styles.banner} bannerWidth={686} bannerList={this.props.mallCategoryInfo.bannerList} />
      </View>
    </View>;

    return (<View style={styles.container}>
      <Header title='虎哥便利店' leftButton={<NavBarLocationButton showStationName={true} />} rightButton={!this.props.authToken ? <Text style={styles.loginBtn} onPress={() => Actions.login({needPop: true})}>登录</Text> : <View/>}/>
      {/* 详细商品列表 */}
      <ProductList productList={combineProductList} ListHeaderComponent={ListHeaderComponent} />
    </View>);
  }

  searchProduct(){
    Actions.mallSearch({searchText: this.state.searchText});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 页头
  loginBtn: {
    fontSize: 28
  },
  // 搜索框
  searchInput: {
    alignSelf: 'center',
    marginVertical: 20,
    width: 686,
    height: 56,
    borderRadius: 26,
    backgroundColor: '#ececec'
  },
  // banner 轮播
  bannerSection: {
    position: 'relative'
  },
  banner: {
    alignSelf: 'center',
    marginBottom: 16,
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

// 需验证便利店信息
export default verifyStoreInfo(connect(mapStateToProps)(Mall));
// export default Mall;