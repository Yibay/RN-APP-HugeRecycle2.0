import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';


class ClassificationNavigation extends Component{

  static propTypes = {
    category: PropTypes.arrayOf(
      PropTypes.shape({
        categoryName: PropTypes.string.isRequired,
        categoryNum: PropTypes.number.isRequired
      })
    ),
    selectedCategory: PropTypes.number.isRequired,
    switchCategory: PropTypes.func.isRequired
  };

  render(){
    return(<View style={styles.container}>
      {
        this.props.category.map(item =>
          (<TouchableWithoutFeedback key={item.categoryNum} onPress={() => this.props.switchCategory(item.categoryNum)}>
            <View style={[styles.item, this.props.selectedCategory === item.categoryNum ? styles.activeItem : styles.none]}>
              <Text style={[styles.itemText, this.props.selectedCategory === item.categoryNum ? styles.activeItemText : styles.none]}>{item.categoryName}</Text>
            </View>
          </TouchableWithoutFeedback>))
      }
    </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    margin: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  activeItem: {
    backgroundColor: '#0099ff'
  },
  itemText: {
    fontSize: 28
  },
  activeItemText: {
    color: '#fff'
  },
  none: {

  }
});


export default ClassificationNavigation;