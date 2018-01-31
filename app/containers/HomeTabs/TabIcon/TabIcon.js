import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 20
  }
});

class TabIcon extends Component {

  static propTypes = {
    focused: PropTypes.bool.isRequired,
    icon: PropTypes.element.isRequired,
    activeIcon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired
  };

  static defaultProps = {
    focused: false,
    icon: <View/>,
    activeIcon: <View/>,
    label: ''
  };

  render(){
    return <View style={styles.container}>
      {
        this.props.focused ? this.props.activeIcon : this.props.icon
      }
      <Text style={styles.label}>{this.props.label}</Text>
    </View>
  }
}

export default TabIcon;