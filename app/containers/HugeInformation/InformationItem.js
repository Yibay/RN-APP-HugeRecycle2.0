import React,{Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';


class InformationItem extends Component{

  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      summary: PropTypes.string,
      createTime: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  };

  render(){
    return <TouchableWithoutFeedback onPress={() => Actions.hugeInformationDetail({url: this.props.item.url})}>
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>{this.props.item.title}</Text>
        <View style={styles.secondSection}>
          <Text style={styles.summary}>{this.props.item.summary}</Text>
          <Text style={styles.createTime}>{this.props.item.createTime}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 136,
    paddingHorizontal: 34,
    borderBottomWidth: 2,
    borderBottomColor: '#e7e7e7',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 24,
    fontSize: 30,
    color: '#000',
    fontWeight: '700',
  },
  // 第2行模块
  secondSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  summary: {
    fontSize: 28,
    color: '#888',
    lineHeight: 28
  },
  createTime: {
    fontSize: 24,
    color: '#888',
    lineHeight: 28
  }
});

export default InformationItem;