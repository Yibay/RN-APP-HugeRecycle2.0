import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';


import request from "../../../util/request/request";
import config from "../../../util/request/config";

import Header from "../../../components/Header/Header";
import StreetItem from "../../../containers/CoverageArea/StreetItem";


class CoverageArea extends Component {

  constructor(props){
    super(props);

    this.state = {
      coverageArea: []
    };
  }

  render(){
    console.log(this.state);
    return <View style={styles.container}>
      <Header title='服务范围'/>
      <ScrollView style={styles.content}>
        <Text style={styles.header}>服务站正在全面铺设当中，现有站点如下：</Text>
        {
          this.state.coverageArea.map((item, index) => <StreetItem key={index} street={item}/>)
        }
        <Text style={styles.footer}>更多小区，敬请期待！</Text>
      </ScrollView>
    </View>
  }

  async componentDidMount(){
    await this.getCommunityCoverageArea();
  }

  async getCommunityCoverageArea(){
    const coverageArea = await request.get(config.api.getCommunityCoverageArea);
    coverageArea && this.setState({coverageArea})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: 36,
    backgroundColor: '#f7f7f7'
  },
  header: {
    marginVertical: 36,
    fontSize: 26,
    color: '#000'
  },
  footer: {
    marginVertical: 96,
    fontSize: 28,
    textAlign: 'center',
    color: '#878787'
  }
});

export default CoverageArea;