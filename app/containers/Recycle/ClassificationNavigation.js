import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';


class ClassificationNavigation extends Component{

  constructor(props){
    super(props);

    this.state = {
      selectedCategory: 1 // 类别选中项（默认 选中第一项）
    };
  }

  render(){
    return(<View style={styles.container}>
      {
        [
          {categoryNum:1, categoryText: '小件干垃圾'},
          {categoryNum:2, categoryText: '废旧家电'},
          {categoryNum:3, categoryText: '废旧家具'}
        ].map(item =>
          (<TouchableWithoutFeedback key={item.categoryNum} onPress={() => this.switchCategory(item.categoryNum)}>
            <View style={[styles.item, this.state.selectedCategory === item.categoryNum ? styles.activeItem : styles.none]}>
              <Text style={[styles.itemText, this.state.selectedCategory === item.categoryNum ? styles.activeItemText : styles.none]}>{item.categoryText}</Text>
            </View>
          </TouchableWithoutFeedback>))
      }
    </View>)
  }

  // 切换类别
  switchCategory(categoryNum){
    this.setState({
      selectedCategory: categoryNum
    })
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