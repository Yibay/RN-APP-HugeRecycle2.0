import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';


import RecycledItem from '../RecycleOrder/RecycledItem';

class RecycledItemsList extends PureComponent{

  render(){

    let recycledItemsList = [];

    return (<View>
      {
        recycledItemsList.map(item => <RecycledItem key={item.specs.id} specs={item.specs} subCategoryName={item.subCategoryName} />)
      }
    </View>);
  }
}

export default RecycledItemsList;