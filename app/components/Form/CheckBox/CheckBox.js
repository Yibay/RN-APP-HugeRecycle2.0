import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


class CheckBox extends Component {

  static propTypes = {
    value: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func, // Promise
  };

  static defaultProps = {
    value: false,
  };

  constructor(props){
    super(props);

    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value
    })
  }

  render(){
    return <TouchableWithoutFeedback onPress={() => this._onValueChange()}>
      <View style={[styles.container].concat(this.props.style)}>
        {
          this.state.value ? <Icon name='checkbox-marked' size={30} /> : <Icon name='checkbox-blank-outline' size={30} />
        }
      </View>
    </TouchableWithoutFeedback>;
  }

  _onValueChange(){
    if(this.props.onValueChange){
      this.props.onValueChange(!this.state.value)
        .then(val => {
          // 若成功（val为true）
          val && (this.setState(state => ({value: !state.value})));
        });
    }
    else{
      this.setState(state => ({value: !state.value}));
    }
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CheckBox;