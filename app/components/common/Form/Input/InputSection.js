import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import PropTypes from 'prop-types';


class InputSection extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired, // label 文案 （必选）
    value: PropTypes.string.isRequired, // input value （必选）
    onChangeText: PropTypes.func.isRequired, // value 改变时，更新外部数据的func
    editable: PropTypes.bool.isRequired, // input 是否可手动编辑
    rightButton: PropTypes.element.isRequired // 右侧按钮
  };

  static defaultProps = {
    onChangeText: () => {console.log('do nothing.')},
    editable: true,
    rightButton: (<View />)
  };

  render(){
    return (<View style={styles.container}>
      <Text style={styles.label} onPress={() => this.focusInput()}>{this.props.label}</Text>
      <TextInput style={styles.textInput} underlineColorAndroid="transparent" ref="input" value={this.props.value} onChangeText={val => this.props.onChangeText(val)} editable={this.props.editable} />
      {
        this.props.rightButton // 若有右侧按钮，则添加
      }
    </View>);
  }

  // 点击label 聚焦input
  focusInput(){
    this.refs.input.focus();
  }
}

const styles = StyleSheet.create({
  container: {
    height: 86,
    paddingHorizontal: 34,
    borderColor: '#e1e5e8',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    width: 192,
    fontSize: 26,
    color: '#888'
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 0,
    fontSize: 30
  }
});

export default InputSection;