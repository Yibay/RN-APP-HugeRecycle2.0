import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import PropTypes from 'prop-types';


import CategoryItem from './CategoryItem';


class SubCategory extends Component{

  static propTypes = {
    show: PropTypes.bool.isRequired,
    subCategoryObj: PropTypes.object.isRequired,
    sort: PropTypes.number.isRequired
  };

  static defaultProps = {
    show: true
  };

  render(){

    return (
      <ScrollView style={this.props.show ? styles.container : styles.hide}>
        {
          Object.keys(this.props.subCategoryObj)
            .map(key => (<CategoryItem key={key} category={this.props.subCategoryObj[key]} sort={this.props.sort} />))
        }
      </ScrollView>
    );
  }

  componentWillUnmount(){
    console.log('回收物品 1级分类 componentWillUnmount')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 34,
    backgroundColor: '#f7f7f7'
  },
  hide: {
    display: 'none'
  }
});

export default SubCategory;