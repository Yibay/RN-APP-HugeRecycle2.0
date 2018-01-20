import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';


import RecycledItem from '../../components/pages/RecycleOrder/RecycledItem'


class RecycledItemsList extends Component{

  render(){

    let allProductsObj = this.props.recyclableGoods.AllProductsObj;

    let recycledItemsList = this.props.recycledItemsList.list.map(
      item => ({
        specs: allProductsObj[`sort${item.sort}`].subCategoryObj['id' + item.categoryId].specsObj['id' + item.specsId],
        subCategoryName: allProductsObj[`sort${item.sort}`].subCategoryObj['id' + item.categoryId].name
      })
    );

    return (<View>
      {
        recycledItemsList.map(item => <RecycledItem key={item.specs.id} specs={item.specs} subCategoryName={item.subCategoryName} />)
      }
    </View>);
  }
}

function mapStateToProps(state){
  return {
    recycledItemsList: state.recycle.recycledItemsList,
    recyclableGoods: state.recycle.recyclableGoods
  };
}

export default connect(mapStateToProps)(RecycledItemsList);