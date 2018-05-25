import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import config from '../../../util/request/config';
import { setAllProducts } from '../../../redux/actions/Recycle';

import Header from '../../../components/Header/Header';
import NavBarLocationButton from '../../../containers/Recycle/NavBarLocationButton/NavBarLocationButton';
import Navigator from '../../../components/Navigator/Navigator';
import SubCategory from '../../../containers/Recycle/SubCategory';
import CallModule from '../../../containers/Recycle/CallModule';
import CallModal from '../../../containers/Recycle/CallModal';
import request from "../../../util/request/request";
import TextAdaption from "../../../components/Text/TextAdaption";


// 展示图片 固定宽度
let imageWidth = 682;

class Recycle extends Component{

  constructor(props){
    super(props);

    this.state = {
      callModalVisible: false,
      createOrderFetching: false // 创建回收订单，请求中
    };
  }

  render(){
    let AllProductsObj = this.props.recyclableGoods.AllProductsObj;

    return (<View style={styles.container}>
      {/* 页头 */}
      <Header title='我要回收' hideBack={true} leftButton={<NavBarLocationButton />} rightButton={!this.props.authToken ? <TextAdaption style={styles.loginBtn} onPress={() => Actions.login({needPop: true})}>登录</TextAdaption> : <View/>}/>
      {/* 导航条 */}
      <Navigator navigationItems={this.props.category}>
        {
          /* 分页: 1阶回收大分类 */
          Object.keys(AllProductsObj)
            .sort((key1, key2) => AllProductsObj[key1].sort - AllProductsObj[key2].sort) // 按 sort 序号排序
            .map(key => {

              let topImage = null, bottomImage = null;

              // 若1级分类，有上方图片
              if(AllProductsObj[key].topImageUrl){
                let image = JSON.parse(AllProductsObj[key].topImageUrl);
                let imageStyles = StyleSheet.create({
                  imageStyles: {
                    width: imageWidth,
                    height: image.height / image.width * imageWidth,
                    marginHorizontal: 34,
                    marginTop: 28
                  }
                });
                topImage = <Image source={{uri: config.static.base + image.url}} resizeMode='contain' style={imageStyles.imageStyles} />;
              }
              // 若1级分类，有下方图片
              if(AllProductsObj[key].bottomImageUrl){
                let image = JSON.parse(AllProductsObj[key].bottomImageUrl);
                let imageStyles = StyleSheet.create({
                  imageStyles: {
                    width: imageWidth,
                    height: image.height / image.width * imageWidth,
                    marginHorizontal: 34
                  }
                });
                bottomImage = <Image source={{uri: config.static.base + image.url}} resizeMode='contain' style={imageStyles.imageStyles} />;
              }

              return (
                <View key={key} style={styles.contentPage}>
                  {
                    topImage
                  }
                  <SubCategory subCategoryObj={AllProductsObj[key].subCategoryObj} sort={AllProductsObj[key].sort} />
                  {
                    bottomImage
                  }
                </View>
              )
            })
        }
      </Navigator>
      {/* 底栏：一键呼叫按钮 */}
      <CallModule showCallModal={() => this.showCallModal()} />
      {/* 弹窗：一键呼叫 */}
      <CallModal visible={this.state.callModalVisible} hideCallModal={() => this.hideCallModal()} />
    </View>)
  }

  async componentDidMount(){
    await this.getProducts();
  }

  // 获取回收品列表（无需登录）
  async getProducts(){
    // 请求 回收类别相应数据
    request
      .get(config.api.getProducts)
      .then(res => {
        // 若请求成功，数据正常
        if(!res.status){
          // 2. 更新全局数据
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
  },
  contentPage: {
    backgroundColor: '#f7f7f7'
  }
});

function mapStateToProps(state){
  return {
    category: state.recycle.recyclableGoods.AllProductsArray
      .sort((val1, val2) => val1.sort - val2.sort) // 按 sort 序号排序
      .map(item => ({itemName: item.categoryName})),
    recyclableGoods: state.recycle.recyclableGoods,
    authToken: state.identityToken.authToken
  }
}


export default connect(mapStateToProps, { setAllProducts })(Recycle);