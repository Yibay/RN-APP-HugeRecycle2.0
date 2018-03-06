import React,{Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';


class ScoreLogItem extends Component {

  static propTypes = {
    income: PropTypes.bool.isRequired,
    item: PropTypes.shape({
      times: PropTypes.string.isRequired,
      customerScore: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired
    })
  };

  render(){
    return <View style={styles.container}>
      <View style={styles.firstSection}>
        <Text style={styles.type}>{this.props.item.type}</Text>
        <Text style={styles.time}>{this.props.item.times}</Text>
      </View>
      <View style={styles.secondSection}>
        <Text style={[styles.score, this.props.income ? styles.incomeScore : styles.consumeScore]}>
          {this.props.income ? `+${this.props.item.customerScore.toFixed(2)}` : this.props.item.customerScore.toFixed(2)}
        </Text>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 132,
    paddingVertical: 32,
    paddingHorizontal: 30,
    borderTopWidth: 2,
    borderTopColor: '#e4e5e7',
    justifyContent: 'center'
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  type: {
    fontSize: 28,
    color: '#000',
    lineHeight: 28
  },
  time: {
    fontSize: 24,
    color: '#888',
    lineHeight: 24
  },
  secondSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  score: {
    fontSize: 32,
    lineHeight: 32
  },
  incomeScore: {
    color: '#ef3300'
  },
  consumeScore: {
    color: '#15a115'
  },
});

export default ScoreLogItem;