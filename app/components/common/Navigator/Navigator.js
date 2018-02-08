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
    // 内容区 样式
    contentLayoutStyle: PropTypes.oneOf([
      'highlyAdaptive', // 高度自适应
      'highlyFlexible', // 高度弹性充满
      'highlyScrollable' // 高度弹性充满，超屏幕可滚动
    ]),
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
    // 未选中项 下划线样式
    unActiveLineStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.number
      )
    ]),
    // 选中项 下划线样式
    activeLineStyle: PropTypes.oneOfType([
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
    contentLayoutStyle: 'highlyScrollable',
    itemTextStyle: undefined, // 未选中项 文字样式
    activeItemTextStyle: undefined, // 选中项 文字样式
    unActiveLineStyle: undefined, // 未选中项 下划线样式
    activeLineStyle: undefined, // 选中项 下划线样式
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
    return(<View style={(this.props.contentLayoutStyle === 'highlyFlexible' || this.props.contentLayoutStyle === 'highlyScrollable') ? styles.container : undefined}>
      {/* 导航头 */}
      <View style={[styles.navigator].concat(this.props.style)}>
        {
          /* 3列以内，等分布局 */
          this.props.navigationItems.length <= 3 ?
            this.props.navigationItems.map((item, index) =>
              (<TouchableWithoutFeedback key={index} onPress={() => this.switchItemIndex(index)}>
                <View style={styles.item}>
                  <View style={index === 0 ? styles.itemTextSection : [styles.itemTextSection, styles.splitLine]}>
                    <Text style={this.state.selectPageIndex === index ? [styles.activeItemText].concat(this.props.activeItemTextStyle) : [styles.itemText].concat(this.props.itemTextStyle)}>{item.itemName}</Text>
                  </View>
                  <View style={this.state.selectPageIndex === index ? [styles.activeLine].concat(this.props.activeLineStyle) : [styles.unActiveLine].concat(this.props.unActiveLineStyle)} />
                </View>
              </TouchableWithoutFeedback>))
            :
            /* 大于 3列，横向滚动 */
            <ScrollView horizontal={true}>
              {
                this.props.navigationItems.map((item, index) =>
                  (<TouchableWithoutFeedback key={index} onPress={() => this.switchItemIndex(index)}>
                    <View style={styles.itemFixed}>
                      <View style={index === 0 ? styles.itemTextSection : [styles.itemTextSection, styles.splitLine]}>
                        <Text style={this.state.selectPageIndex === index ? [styles.activeItemText].concat(this.props.activeItemTextStyle) : [styles.itemText].concat(this.props.itemTextStyle)}>{item.itemName}</Text>
                      </View>
                      <View style={this.state.selectPageIndex === index ? [styles.activeLine].concat(this.props.activeLineStyle) : [styles.unActiveLine].concat(this.props.unActiveLineStyle)} />
                    </View>
                  </TouchableWithoutFeedback>))
              }
            </ScrollView>
        }
      </View>
      {
        /* 分页内容 */
        // 若为 铺满剩余空间 滚动
        this.props.contentLayoutStyle === 'highlyScrollable' ?
          <ScrollView style={styles.page}>
            {
              this.props.children ? this.props.children[this.state.selectPageIndex] : null // 页面内容区，显示 selectPageIndex 对应页面
            }
          </ScrollView>
        :
        // 若为 铺满剩余空间 滚动
        this.props.contentLayoutStyle === 'highlyFlexible' ?
          <View style={styles.page}>
            {
              this.props.children ? this.props.children[this.state.selectPageIndex] : null // 页面内容区，显示 selectPageIndex 对应页面
            }
          </View>
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
  itemFixed: {
    minWidth: 220,
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