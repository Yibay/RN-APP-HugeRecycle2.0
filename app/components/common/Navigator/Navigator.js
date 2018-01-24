import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

import PropTypes from 'prop-types';


class Navigator extends Component {

  static propTypes = {
    category: PropTypes.arrayOf(
      PropTypes.shape({
        categoryName: PropTypes.string.isRequired,
        categoryNum: PropTypes.number.isRequired
      })
    ),
    // 未选中项 文字样式
    itemTextStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.number
      )
    ]),
    // 选中项 文字样式
    activeItemTextStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.number
      )
    ]),
  };

  static defaultProps = {
    itemTextStyle: undefined, // 未选中项 文字样式
    activeItemTextStyle: undefined, // 选中项 文字样式
  };

  constructor(props){
    super(props);

    this.state = {
      selectPageIndex: 0, // 初始值 0
    };
  }

  render(){
    return(<View style={styles.container}>
      <View style={styles.navigator}>
        {
          this.props.category.map((item, index) =>
            (<TouchableWithoutFeedback key={item.categoryNum} onPress={() => this.switchCategory(index)}>
              <View style={styles.item}>
                <View style={index === 0 ? styles.itemTextSection : [styles.itemTextSection, styles.splitLine]}>
                  <Text style={this.state.selectPageIndex === index ? [styles.activeItemText].concat(this.props.activeItemTextStyle) : [styles.itemText].concat(this.props.itemTextStyle)}>{item.categoryName}</Text>
                </View>
                <View style={this.state.selectPageIndex === index ? styles.activeLine : styles.unActiveLine} />
              </View>
            </TouchableWithoutFeedback>))
        }
      </View>
      <ScrollView style={styles.page}>
        {
          this.props.children[this.state.selectPageIndex] // 页面内容区，显示 selectPageIndex 对应页面
        }
      </ScrollView>
    </View>)
  }

  switchCategory(categoryNum){
    this.setState({
      selectPageIndex: categoryNum
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // 导航条
  navigator: {
    flexDirection: 'row',
    height: 80,
    paddingTop: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e6e9',
    backgroundColor: '#f7f7f7'
  },
  // 选项
  item: {
    flex: 1,
    alignItems: 'center'
  },
  itemTextSection: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  splitLine: {
    borderLeftWidth: 2,
    borderColor: '#e7e8ea'
  },
  itemText: {
    fontSize: 28,
    color: '#9e9e9e'
  },
  activeItemText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000'
  },
  activeLine: {
    width: 183,
    borderBottomWidth: 8,
    borderColor: '#ffd100'
  },
  unActiveLine: {
    width: 183,
    borderBottomWidth: 8,
    borderColor: '#f7f7f7'
  },
  // 页面内容
  page: {
    flex: 1
  }
});


export default Navigator;