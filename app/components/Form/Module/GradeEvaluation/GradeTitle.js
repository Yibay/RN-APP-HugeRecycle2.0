import React, {PureComponent} from 'react'
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';
import TextAdaption from "../../../Text/TextAdaption";


class GradeTitle extends PureComponent{

  static propTypes = {
    titleArray: PropTypes.arrayOf(
      PropTypes.string
    ),
  };

  render(){
    return <View style={[styles.container].concat(this.props.style)}>
      <View style={styles.titleSection}>
        {
          this.props.titleArray.map((title, index) => <View key={index} style={styles.title}>
            <TextAdaption style={styles.titleText}>{title}</TextAdaption>
          </View>)
        }
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleSection: {
    marginLeft: 144,
    minWidth: 316,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    width: 90,
    height: 53,
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  titleText: {
    fontSize: 28,
    color: '#888',
    fontWeight: '700',
  },
});

export default GradeTitle;