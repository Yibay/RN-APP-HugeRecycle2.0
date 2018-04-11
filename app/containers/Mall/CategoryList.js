import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';


import config from "../../util/request/config";

import TextAdaption from "../../components/Text/TextAdaption";


class CategoryList extends Component {

  static propTypes = {
    mainCategoryList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  };

  static defaultProps = {
    mainCategoryList: []
  };

  render(){

    let mainCategoryList = this.props.mainCategoryList;

    if(mainCategoryList.length >= 8){
      mainCategoryList = mainCategoryList.slice(0,7);
      mainCategoryList.push({id:'all',name:'全部类别'});
    }

    return (<View style={styles.container}>
      {
        mainCategoryList.map((item, index) => <TouchableWithoutFeedback key={item.id} onPress={() => Actions.mallCategoryPage({categoryId: item.id})}>
          <View style={[styles.categoryItem, index % 4 === 0 ? styles.firstItem : undefined]}>
            <Image style={styles.categoryImage} source={{uri: `${config.static.mallBase}${item.imgAddress}`}} resizeMode='contain' />
            <TextAdaption style={styles.categoryName}>{item.name}</TextAdaption>
          </View>
        </TouchableWithoutFeedback>)
      }
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryItem: {
    position: 'relative',
    marginLeft: 104,
    paddingBottom: 62,
    alignItems: 'center',
    overflow: 'visible'
  },
  firstItem: {
    marginLeft: 32
  },
  categoryImage: {
    width: 90,
    height: 90
  },
  categoryName: {
    position: 'absolute',
    bottom: 0,
    left: 45,
    transform: [{translateX: -50}],
    width: 100,
    marginTop: 14,
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#000'
  }
});

export default CategoryList;