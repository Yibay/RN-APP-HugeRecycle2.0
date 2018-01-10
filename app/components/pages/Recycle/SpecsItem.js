import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import config from '../../../util/request/config';
import { addElectricProduct } from '../../../redux/actions/Recycle';


class SpecsItem extends Component{

  static propTypes = {
    categoryId: PropTypes.number.isRequired,
    specs: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      otherGift: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
      // 可选属性 {number}[number]
    })
  };

  render(){
    if(this.props.specs.number){
      console.log(this.props.specs.number);
    }
    return (<View style={styles.container}>
      <Image style={styles.specsImage} resizeMode='contain' source={{uri: (config.static.base + this.props.specs.image)}} />
      <View style={styles.specsContent}>
        <Text style={styles.specsName}>{this.props.specs.name}</Text>
        <View style={styles.specsOtherMsg}>
          <Text style={styles.otherGift}>{this.props.specs.otherGift}</Text>
          <Text style={styles.price}>¥{this.props.specs.price}</Text>
        </View>
        <View style={styles.controller}>
          <TouchableWithoutFeedback onPress={() => this.addItem()}>
            <View style={styles.controllerBtn}><Text style={styles.controllerBtnText}>-</Text></View>
          </TouchableWithoutFeedback>
          <View><Text style={styles.recycleNum}>{this.props.specs.number ? this.props.specs.number : 0}</Text></View>
          <TouchableWithoutFeedback onPress={() => this.addItem()}>
            <View style={styles.controllerBtn}><Text style={styles.controllerBtnText}>+</Text></View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>)
  }

  addItem(){
    console.log(this.props.specs.number);
    this.props.addElectricProduct(this.props.categoryId,this.props.specs.id);
  }
}


const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  specsImage: {
    width: 100,
    height: 100,
    marginRight: 20
  },
  specsContent: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between'
  },
  specsName: {
    fontSize: 36,
    fontWeight: '700'
  },
  specsOtherMsg: {
    flexDirection: 'row'
  },
  otherGift: {
    fontSize: 26,
    color: 'red'
  },
  price: {
    fontSize: 26,
    color: 'red'
  },
  controller: {
    position: 'absolute',
    right: 0,
    top: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  controllerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  controllerBtnText: {
    fontSize: 34
  },
  recycleNum: {
    paddingHorizontal: 10,
    fontSize: 30
  }
});

const actionsCreator = {
  addElectricProduct
};

export default connect(null, actionsCreator)(SpecsItem);