import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';


import TextAdaption from "../../components/Text/TextAdaption";


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
    return <View style={[styles.container].concat(this.props.style)}>
      <TextAdaption style={styles.street}>
        <TextAdaption style={styles.streetName}>{this.props.street.streetName}:</TextAdaption>
        {
          this.props.street.communities.join('、')
        }
      </TextAdaption>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
  },
  street: {
    marginBottom: 45,
    fontSize: 28,
    color: '#000',
    lineHeight: 45,
    textAlign: 'justify'
  },
  streetName: {
    backgroundColor: '#ffd101',
    fontWeight: '700'
  }
});

export default StreetItem;