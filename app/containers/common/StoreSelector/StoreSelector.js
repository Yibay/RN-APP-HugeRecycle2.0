import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import { setShowStoreSelector, setStoreIndexThunk } from '../../../redux/actions/Mall';


class StoreSelector extends Component {

  static propTypes = {
    storeInfo: PropTypes.arrayOf(
      PropTypes.shape({
        storeName: PropTypes.string.isRequired
      })
    )
  };

  constructor(props){
    super(props);

    this.state = {
      storeIndex: 0
    }
  }

  render(){
    return <View style={styles.container}>
      {
        this.props.children
      }
      <View style={styles.mask}>
        <View style={styles.selector}>
          <Text style={styles.title}>请选择便利店</Text>
          {
            this.props.storeInfo.map((item, index) => <TouchableWithoutFeedback key={index} onPress={() => this.selectStoreIndex(index)}>
              <View style={this.state.storeIndex === index ? [styles.option, styles.optionActive] : styles.option }>
                <Text style={this.state.storeIndex === index ? [styles.optionText, styles.optionActiveText] : styles.optionText} >{item.storeName}</Text>
              </View>
            </TouchableWithoutFeedback>)
          }
          <TouchableWithoutFeedback onPress={() => this.closeModel()}>
            <Image style={styles.closeButton} source={require('./img/cancel23x.png')} resizeMode='contain' />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  }

  closeModel(){
    this.props.setShowStoreSelector(false);
  }

  selectStoreIndex(storeIndex){
    this.props.setStoreIndexThunk(storeIndex); // 切换 便利店下的小区
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selector: {
    position: 'relative',
    width: 594,
    minHeight: 420,
    paddingVertical: 50,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    marginBottom: 52,
    fontSize: 32,
    color: '#000',
    fontWeight: '900'
  },
  option: {
    width: 449,
    height: 83,
    marginBottom: 34,
    borderRadius: 41,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  optionActive: {
    borderWidth: 0,
    backgroundColor: '#ffd100',
    overflow: 'hidden',
  },
  optionText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000'
  },
  optionActiveText: {
    color: '#fff'
  },
  closeButton: {
    position: 'absolute',
    top: 22,
    right: 22,
    width: 30,
    height: 30
  }
});

export default connect(null,{setShowStoreSelector, setStoreIndexThunk})(StoreSelector);