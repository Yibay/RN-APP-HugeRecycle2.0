import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {

  },
  icon: {
    width: 20,
    height: 20
  }
});

class TabIcon extends Component {

  static propTypes = {
    icon: PropTypes.element.isRequired,
    activeIcon: PropTypes.element.isRequired
  };

  static defaultProps = {
    icon: <View/>,
    activeIcon: <View/>
  };

  render(){
    return <View style={styles.container}>
      {
        this.props.focused ? this.props.activeIcon : this.props.icon
      }
    </View>
  }
}

export default TabIcon;