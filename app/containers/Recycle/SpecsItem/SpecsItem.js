import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import config from '../../../util/request/config';
import { addRecycledItem, reduceRecycledItem } from '../../../redux/actions/Recycle';


class SpecsItem extends Component{

  static propTypes = {
    sort: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    specs: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      otherGift: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
      // 可选属性 {number}[number]
    }),
    onlyOnePiece: PropTypes.bool.isRequired
  };

  static defaultProps = {
    onlyOnePiece: false
  };

  render(){

    return (<View style={styles.container}>
      <Image style={styles.specsImage} resizeMode='contain' source={{uri: (config.static.base + this.props.specs.image)}} />
      <View style={styles.specsContent}>
        <Text style={styles.specsName}>{this.props.specs.name}</Text>
        <View style={styles.specsOtherMsg}>
          <Text style={styles.otherGift}>{this.props.specs.otherGift}</Text>
          <Text style={styles.price}>¥{this.props.specs.price}</Text>
        </View>
        {/* 多件 ＋ － 控制器 */}
        <View style={this.props.onlyOnePiece ? styles.hide : styles.controller}>
          <TouchableWithoutFeedback onPress={() => this.reduceItem()}>
            <Image style={styles.controllerBtn} resizeMode='contain' source={require('./img/reduce2x.png')} />
          </TouchableWithoutFeedback>
          <View><Text style={styles.recycleNum}>{this.props.specs.number || 0}</Text></View>
          <TouchableWithoutFeedback onPress={() => this.addItem()}>
            <Image style={styles.controllerBtn} resizeMode='contain' source={require('./img/plus2x.png')} />
          </TouchableWithoutFeedback>
        </View>
        {/* 单件toggle控制器 */}
        <TouchableWithoutFeedback onPress={() => this.toggleItem()}>
          <View style={[this.props.onlyOnePiece ? styles.onlyOnePieceBtn : styles.hide, this.props.specs.number ? styles.onlyOnePieceBtnDisable : styles.none]}>
            <Text style={styles.onlyOnePieceText}>{this.props.specs.number ? '已加入' : '加入回收'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>)
  }

  addItem(){
    this.props.addRecycledItem(this.props.sort,this.props.categoryId,this.props.specs.id,this.props.specs.number);
  }

  reduceItem(){
    this.props.reduceRecycledItem(this.props.sort,this.props.categoryId,this.props.specs.id,this.props.specs.number);
  }

  toggleItem(){
    !this.props.specs.number ? this.addItem() : this.reduceItem();
  }
}


const styles = StyleSheet.create({
  container: {
    height: 174,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e6e7',
    flexDirection: 'row',
    alignItems: 'center'
  },
  specsImage: {
    width: 132,
    height: 132,
    marginRight: 24
  },
  specsContent: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  specsName: {
    marginBottom: 20,
    fontSize: 32,
    fontWeight: '700',
    color: '#2f2e34'
  },
  specsOtherMsg: {
    flexDirection: 'row'
  },
  otherGift: {
    fontSize: 24,
    color: '#828282'
  },
  price: {
    fontSize: 24,
    color: '#828282'
  },
  controller: {
    position: 'absolute',
    right: 30,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  controllerBtn: {
    width: 42,
    height: 42,
  },
  recycleNum: {
    marginHorizontal: 10,
    fontSize: 30
  },
  onlyOnePieceBtn: {
    position: 'absolute',
    right: 30,
    top: 15,
    paddingVertical: 20,
    width: 180,
    alignItems: 'center',
    backgroundColor: 'rgba(153, 204, 102, 1)'
  },
  onlyOnePieceBtnDisable: {
    backgroundColor: 'rgba(204, 204, 204, 1)'
  },
  onlyOnePieceText: {
    fontSize: 30
  },
  hide: {
    display: 'none'
  }
});

const actionsCreator = {
  addRecycledItem,
  reduceRecycledItem
};

export default connect(null, actionsCreator)(SpecsItem);