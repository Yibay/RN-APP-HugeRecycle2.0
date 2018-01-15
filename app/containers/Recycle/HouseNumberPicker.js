import React, { Component } from 'react';
import { StyleSheet, Modal, Picker, View, Text } from 'react-native';

import PropTypes from 'prop-types';


class HouseNumberPicker extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideHouseNumberPicker: PropTypes.func.isRequired,
    setHaveHouseNumber: PropTypes.func.isRequired,
    haveHouseNumber: PropTypes.bool.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      haveHouseNumber: this.props.haveHouseNumber
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      haveHouseNumber: nextProps.haveHouseNumber
    })
  }

  render(){
    return (<Modal transparent={true} visible={this.props.visible} onRequestClose={() => this.onRequestClose()}>
      <View style={styles.container}>
        <View style={styles.picker}>
          <Picker selectedValue={this.state.haveHouseNumber} onValueChange={val => this.setState({haveHouseNumber: val})}>
            <Picker.Item label='有户号' value={true} />
            <Picker.Item label='无户号' value={false} />
          </Picker>
          <Text style={styles.confirmPickerVal} onPress={() => this.confirmPickerVal(this.state.haveHouseNumber)}>确认</Text>
          <Text style={styles.cancelPickerVal} onPress={() => this.cancelPickerVal()}>取消</Text>
        </View>
      </View>
    </Modal>);
  }

  cancelPickerVal(){
    this.props.hideHouseNumberPicker();
  }

  confirmPickerVal(haveHouseNumber){
    this.props.setHaveHouseNumber(haveHouseNumber)
  }

  // Android Modal 必须属性
  onRequestClose(){}
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  picker: {
    backgroundColor: '#fff'
  },
  confirmPickerVal: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 18
  },
  cancelPickerVal: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 18
  }
});


export default HouseNumberPicker;