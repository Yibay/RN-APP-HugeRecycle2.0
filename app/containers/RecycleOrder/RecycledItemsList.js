import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';


import RecycledItem from '../../components/pages/RecycleOrder/RecycledItem'


class RecycledItemsList extends Component{

  render(){

    let recycledItemsList = this.props.recycledItemsList.list.map(
      item => this.props.recyclableGoods[item.category + 'sObj']['id' + item.categoryId].specsObj['id' + item.specsId]
    );

    return (<View>
      {
        recycledItemsList.map(item => <RecycledItem key={item.id} specs={item} />)
      }
    </View>);
  }
}

const styles = StyleSheet.create({
  title: {
    paddingVertical: 20,
    paddingLeft: 40,
    fontSize: 36,
    fontWeight: '700'
  },
  total: {
    paddingVertical: 15,
    paddingRight: 20,
    fontSize: 25,
    textAlign: 'right'
  }
});

function mapStateToProps(state){
  return {
    recycledItemsList: state.recycle.recycledItemsList,
    recyclableGoods: state.recycle.recyclableGoods
  };
}

export default connect(mapStateToProps)(RecycledItemsList);