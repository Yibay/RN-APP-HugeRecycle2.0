import React, {PureComponent} from 'react';
import {StyleSheet, View, FlatList, Text, ActivityIndicator, Dimensions, Image} from 'react-native';

import PropTypes from 'prop-types';
import TextAdaption from "../Text/TextAdaption";


const {width, height} = Dimensions.get('window');
const contentHeight = height / width * 750 - 128; // 750 为设计屏宽, 128 为Header 高度

class FlatListDefault extends PureComponent{

  static propTypes = {
    renderItemAmount: PropTypes.number, // 每批次渲染数量
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    refreshControl: PropTypes.element.isRequired,
    onEndReachedThreshold: PropTypes.number,
    ListEmptyComponent: PropTypes.element,
    ListEmptyComponentText: PropTypes.string,
    isFetching: PropTypes.bool, // 正在请求数据？
    ListFooterComponentText: PropTypes.string,
  };

  static defaultProps = {
    renderItemAmount: 10,
    onEndReachedThreshold: 0.5,
    isFetching: false,
    ListFooterComponentText: '--- 已经到底了 ---'
  };

  constructor(props){
    super(props);

    this.state = {
      data: this.props.data,
      showData: this.props.data.slice(0, this.props.renderItemAmount)
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps.data,
      showData: nextProps.data.slice(0, this.props.renderItemAmount)
    })
  }

  render(){
    return <FlatList style={[styles.container].concat(this.props.style)}
                     refreshControl={this.props.refreshControl}
                     data={this.state.showData}
                     keyExtractor={(item,index) => index.toString()}
                     renderItem={this.props.renderItem}
                     onEndReached={() => this.lazyLoad()}
                     onEndReachedThreshold={this.props.onEndReachedThreshold}
                     ListFooterComponent={
                       this.state.showData.length === this.state.data.length ?
                         this.state.showData.length !== 0 ?
                           <Text style={[styles.ListFooterComponent, styles.ListFooterComponentText]}>{this.props.ListFooterComponentText}</Text>
                           :
                           undefined
                         :
                         <ActivityIndicator size='large' style={styles.ListFooterComponent}/>
                     }
                     ListEmptyComponent={<View style={styles.ListEmptyComponent}>
                       {
                         this.props.ListEmptyComponent ?
                           this.props.ListEmptyComponent
                           :
                           this.props.isFetching ?
                             <View/>
                             :
                             <View style={styles.ListEmptyComponentDefault}>
                               <Image source={require('../../assets/img/none.png')} style={styles.ListEmptyComponentIcon} resizeMode='contain' />
                               <TextAdaption style={styles.ListEmptyComponentText}>{this.props.ListEmptyComponentText ? this.props.ListEmptyComponentText : '暂无内容'}</TextAdaption>
                             </View>
                       }
                     </View>} />
  }

  lazyLoad(){
    if(this.state.showData.length < this.state.data.length){
      this.setState(state => ({showData: state.showData.concat(state.data.slice(state.showData.length, state.showData.length + this.props.renderItemAmount))}))
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ListFooterComponent:{
    marginBottom: 26,
  },
  ListFooterComponentText: {
    fontSize: 26,
    color: '#888',
    textAlign: 'center'
  },
  ListEmptyComponent: {
    height: contentHeight,
    paddingTop: 200,
    alignItems: 'center',
  },
  ListEmptyComponentDefault: {
    alignItems: 'center'
  },
  ListEmptyComponentIcon: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
  ListEmptyComponentText: {
    fontSize: 30,
    color: '#aaa',
  }
});

export default FlatListDefault;