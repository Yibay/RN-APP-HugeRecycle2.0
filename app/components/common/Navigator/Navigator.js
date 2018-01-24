import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

import PropTypes from 'prop-types';


class Navigator extends Component {

  static propTypes = {
    // 导航切换项 数组
    navigationItems: PropTypes.arrayOf(
      PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    ),
    // 内容区 是否铺满 屏幕
    pageFlex: PropTypes.bool.isRequired,
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
    // 获取当前切换页index
    getItemIndex: PropTypes.func.isRequired,
    // 初始选中页面
    selectPageIndex: PropTypes.number.isRequired
  };

  static defaultProps = {
    pageFlex: true,
    itemTextStyle: undefined, // 未选中项 文字样式
    activeItemTextStyle: undefined, // 选中项 文字样式
    pageStyle: undefined, // 页面内容 scroll 样式
    getItemIndex: index => {},
    selectPageIndex: 0 // 默认初始选中页面 第1列
  };

  constructor(props){
    super(props);

    this.state = {
      selectPageIndex: this.props.selectPageIndex,
    };
  }

  render(){
    return(<View style={this.props.pageFlex ? styles.container : undefined}>
      {/* 导航头 */}
      <View style={styles.navigator}>
        {
          this.props.navigationItems.map((item, index) =>
            (<TouchableWithoutFeedback key={index} onPress={() => this.switchItemIndex(index)}>
              <View style={styles.item}>
                <View style={index === 0 ? styles.itemTextSection : [styles.itemTextSection, styles.splitLine]}>
                  <Text style={this.state.selectPageIndex === index ? [styles.activeItemText].concat(this.props.activeItemTextStyle) : [styles.itemText].concat(this.props.itemTextStyle)}>{item.itemName}</Text>
                </View>
                <View style={this.state.selectPageIndex === index ? styles.activeLine : styles.unActiveLine} />
              </View>
            </TouchableWithoutFeedback>))
        }
      </View>
      {
        /* 分页内容 */
        // 若为 铺满剩余空间 滚动
        this.props.pageFlex ?
          <ScrollView style={styles.page}>
            {
              this.props.children ? this.props.children[this.state.selectPageIndex] : null // 页面内容区，显示 selectPageIndex 对应页面
            }
          </ScrollView>
        :
        // 若为 高度自适应
          <View>
            {
              this.props.children ? this.props.children[this.state.selectPageIndex] : null // 页面内容区，显示 selectPageIndex 对应页面
            }
          </View>
      }

    </View>)
  }

  switchItemIndex(index){
    this.props.getItemIndex(index);
    this.setState({
      selectPageIndex: index
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