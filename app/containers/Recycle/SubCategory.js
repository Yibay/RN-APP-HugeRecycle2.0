import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import PropTypes from 'prop-types';


import CategoryItem from '../../components/pages/Recycle/CategoryItem';


class SubCategory extends Component{

  static propTypes = {
    show: PropTypes.bool.isRequired,
    subCategoryObj: PropTypes.object.isRequired,
    sort: PropTypes.number.isRequired
  };

  render(){

    return (
      <ScrollView style={[styles.container, this.props.show ? styles.none : styles.hide]}>
        {
          Reflect.ownKeys(this.props.subCategoryObj)
            .map(key => (<CategoryItem key={key} category={this.props.subCategoryObj[key]} sort={this.props.sort} />))
        }
      </ScrollView>
    );
  }

  componentWillUnmount(){
    console.log('废旧家电 componentWillUnmount')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  hide: {
    display: 'none'
  }
});

export default SubCategory;