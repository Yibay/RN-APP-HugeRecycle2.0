import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import TextInputRepair from "../../TextInput/TextInputRepair";


class InputSection extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired, // input value （必选）
    onChangeText: PropTypes.func.isRequired, // value 改变时，更新外部数据的func
    label: PropTypes.string.isRequired, // label 文案
    placeholder: PropTypes.string, // placeholder 文案
    editable: PropTypes.bool, // input 是否可手动编辑
    leftButton: PropTypes.element, // 左侧按钮
    rightButton: PropTypes.element, // 右侧按钮
    keyboardType: PropTypes.oneOf(['default','numeric','email-address','phone-pad']),
    secureTextEntry: PropTypes.bool, // 隐藏输入内容(密文)
    setValue: PropTypes.bool,
  };

  static defaultProps = {
    onChangeText: () => {console.log('do nothing.')},
    label: '',
    placeholder: '',
    editable: true,
    keyboardType: 'default',
    secureTextEntry: false
  };

  constructor(props){
    super(props);

    this.state = {
      focusInput: false,
    };
  }

  render(){
    return (<View {...this.props} style={[styles.container].concat(this.props.style)}>
      {
        this.props.leftButton ?
          <TouchableWithoutFeedback onPress={() => this.focusInput()}>
            {
              this.props.leftButton // 有定义左侧按钮，显示自定义左侧按钮
            }
          </TouchableWithoutFeedback>
          :
          <Text style={styles.label} onPress={() => this.focusInput()}>{this.props.label}</Text> // 没有自定义左侧按钮显示，label
      }
      <TextInputRepair style={styles.textInput}
                       value={this.props.value}
                       onChangeText={val => this.props.onChangeText(val)}
                       autoCapitalize='none'
                       placeholder={this.props.placeholder}
                       editable={this.props.editable}
                       secureTextEntry={this.props.secureTextEntry}
                       underlineColorAndroid="transparent"
                       keyboardType={this.props.keyboardType}
                       focusInput={this.state.focusInput}
                       setValue={this.props.setValue}
                       onSubmitEditing={() => this.blurInput()}
      />
      {
        this.props.rightButton // 若有右侧按钮，则添加
      }
    </View>);
  }

  // 点击label 聚焦input
  focusInput(){
    this.setState({focusInput: true});
  }

  // 失去焦点
  blurInput(){
    this.setState({focusInput: false});
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