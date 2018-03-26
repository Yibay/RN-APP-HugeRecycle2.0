import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import PropTypes from 'prop-types';


class Remark extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    val: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired
  };

  static defaultProps = {
    title: '如有特殊需求，请备注'
  };

  render(){
    return <View style={styles.remarkSection}>
      <Text style={styles.remarksTitle}>{this.props.title}</Text>
      <TextInput style={styles.remarks}
                 multiline={true}
                 onChangeText={val => this.props.onChangeText(val)}
                 value={this.props.value}
                 underlineColorAndroid="transparent" />
    </View>
  }
}

const styles = StyleSheet.create({
  // 备注模块
  remarkSection: {
    paddingHorizontal: 30,
    paddingTop: 36
  },
  remarksTitle: {
    fontSize: 22,
    color: '#888'
  },
  remarks: {
    height: 245,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#d5d5d5',
    borderRadius: 10,
    fontSize: 28,
    fontWeight: '700'
  },
});

export default Remark;