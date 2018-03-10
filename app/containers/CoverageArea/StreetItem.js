import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';


class StreetItem extends Component {

  static propTypes = {
    street: PropTypes.shape({
      streetName: PropTypes.string,
      communities: PropTypes.arrayOf(
        PropTypes.string
      )
    })
  };

  render(){
    return <View style={styles.container}>
      <Text style={styles.street}>
        <Text style={styles.streetName}>{this.props.street.streetName}: </Text>
        {
          this.props.street.communities.join('、')
        }
      </Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
  },
  street: {
    fontSize: 28,
    color: '#000',
    lineHeight: 45
  },
  streetName: {
    fontWeight: '700'
  }
});

export default StreetItem;