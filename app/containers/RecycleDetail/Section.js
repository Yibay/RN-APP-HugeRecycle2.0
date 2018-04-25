import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';


class Section extends PureComponent{

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render(){
    return <View style={styles.container}>
      <Text style={styles.title}>{this.props.title}</Text>
      {
        this.props.children
      }
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 36,
    paddingVertical: 30,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    color: '#000',
    fontWeight: '700',
  },
});

export default Section;