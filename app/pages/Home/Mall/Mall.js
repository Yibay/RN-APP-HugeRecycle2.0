import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';


import { verifyStoreInfo } from '../../../HOC/verifyStoreInfo';

import Header from '../../../components/Header/Header';
import NavBarLocationButton from '../../../containers/Recycle/NavBarLocationButton/NavBarLocationButton';
import Banner from '../../../containers/Mall/Banner';
import SearchInput from '../../../containers/Mall/SearchInput';
import CategoryList from '../../../containers/Mall/CategoryList';
import ProductList from '../../../containers/Mall/ProductList';


class Mall extends Component{

  static propTypes = {
    storeGoods: PropTypes.shape({
      data: PropTypes.shape({
        bannerList: PropTypes.array.isRequired,
        mainCategoryList: PropTypes.array.isRequired,
        productList: PropTypes.array.isRequired
      }),
      isFetching: PropTypes.bool.isRequired
    })
  };

  constructor(props){
    super(props);

    this.state = {
      searchText: ''
    };
  }

  render(){

    let bannerList = this.props.storeGoods.data.bannerList;
    let mainCategoryList = this.props.storeGoods.data.mainCategoryList;
    let productList = this.props.storeGoods.data.productList;

    // 1、各类商品 合并后数组（商品列表）
    let combineProductList = [];

    for(let i=0;i<productList.length;i++){
      combineProductList = combineProductList.concat(productList[i]);
    }
    console.log(combineProductList);
    // 商品去重
    let de_duplication = {};
    combineProductList.forEach((item, index) => {
      if(typeof de_duplication[item.storeProductId] === 'undefined'){
        item.index = index; // 保证排序，不乱
        de_duplication[item.storeProductId] = item;
      }
    });
    combineProductList = Object.keys(de_duplication).map(key => de_duplication[key]).sort((prev,current) => {return prev.index - current.index});

    // 2、列表头部组件（轮播图、按类查询）
    let ListHeaderComponent = <View>
      {/* 搜索框 */}
      <SearchInput style={styles.searchInput} searchText={this.state.searchText} onChangeText={val => this.setState({searchText: val})} onSearch={() => this.searchProduct()} />
      {/* 按类查询 */}
      <CategoryList mainCategoryList={mainCategoryList} />
      {/* 轮播图 */}
      <View style={styles.bannerSection}>
        <Banner style={styles.banner} bannerWidth={686} bannerList={bannerList} />
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
    storeGoods: state.mall.storeGoods
  }
}

// 需验证便利店信息
export default verifyStoreInfo(connect(mapStateToProps)(Mall));
// export default Mall;