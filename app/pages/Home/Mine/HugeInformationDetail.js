import React,{Component} from 'react';
import {StyleSheet, View, WebView} from 'react-native';

import PropTypes from 'prop-types';


import Header from "../../../components/Header/Header";


class HugeInformationDetail extends Component{

  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render(){
    console.log(this.props.url);
    return <View style={styles.container}>
      <Header title='虎哥资讯'/>
      <WebView source={{uri: this.props.url}}/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HugeInformationDetail;