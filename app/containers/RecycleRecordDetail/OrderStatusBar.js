import React,{PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import TextAdaption from "../../components/Text/TextAdaption";


class OrderStatusBar extends PureComponent{

  static propTypes = {
    statusText: PropTypes.string.isRequired,
  };

  render(){
    return <View style={[styles.container].concat(this.props.style)}>
      <TextAdaption style={styles.statusText}>{this.props.statusText}</TextAdaption>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    marginBottom: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffd100',
  },
});

export default OrderStatusBar;