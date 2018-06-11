import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Platform } from 'react-native';

import PropTypes from 'prop-types';
import TextInputRepair from "../../TextInput/TextInputRepair";


class Remark extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    inputStyle: TextInput.propTypes.style,
  };

  static defaultProps = {
    title: '如有特殊需求，请备注'
  };

  render(){
    return <View style={styles.remarkSection}>
      <Text style={styles.remarksTitle}>{this.props.title}</Text>
      <TextInputRepair style={[styles.remarks].concat(this.props.inputStyle)}
                       multiline={true}
                       onChangeText={value => this.props.onChangeText(value)}
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
    ...Platform.select({
      ios: {borderRadius: 10},
      android: {},
    }),
    fontSize: 28,
    fontWeight: '700'
  },
});

export default Remark;