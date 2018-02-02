import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


class CategoryList extends Component {

  static propTypes = {
    mainCategoryList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  };

  static defaultProps = {
    mainCategoryList: []
  };

  render(){
    console.log(this.props);

    let mainCategoryList = this.props.mainCategoryList;

    if(mainCategoryList.length >= 8){
      mainCategoryList = mainCategoryList.slice(0,7);
      mainCategoryList.push({id:'all',name:'全部类别'});
      console.log(mainCategoryList);
    }

    return (<View style={styles.container}>
      {
        mainCategoryList.map(item => <View key={item.id} style={styles.categoryItem}>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>)
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
    width: 140,
    height: 140,
    marginHorizontal: 23.75,
    marginVertical: 15,
    borderRadius: 70,
    borderWidth: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryName: {
    fontSize: 26,
    fontWeight: '700'
  }
});

export default CategoryList;