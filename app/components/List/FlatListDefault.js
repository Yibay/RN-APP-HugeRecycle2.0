import React, {PureComponent} from 'react';
import {StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native';

import PropTypes from 'prop-types';



class FlatListDefault extends PureComponent{

  static propTypes = {
    renderItemAmount: PropTypes.number, // 每批次渲染数量
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    refreshControl: PropTypes.element.isRequired,
    onEndReachedThreshold: PropTypes.number
  };

  static defaultProps = {
    renderItemAmount: 10,
    onEndReachedThreshold: 0.5
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
                     renderItem={this.props.renderItem}
                     onEndReached={() => this.lazyLoad()}
                     onEndReachedThreshold={this.props.onEndReachedThreshold}
                     ListFooterComponent={
                       this.state.showData.length === this.state.data.length ?
                         this.state.showData.length !== 0 ?
                           <Text style={[styles.ListFooterComponent, styles.ListFooterComponentText]}>--- 我也是有底线的 ---</Text>
                           :
                           undefined
                         :
                         <ActivityIndicator size='large' style={styles.ListFooterComponent}/>
                     } />
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
  }
});

export default FlatListDefault;