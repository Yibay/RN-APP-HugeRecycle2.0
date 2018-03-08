import React,{Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';


import request from '../../../util/request/request';
import config from '../../../util/request/config';

import Header from '../../../components/Header/Header';
import InformationItem from "../../../containers/HugeInformation/InformationItem";


class HugeInformation extends Component{

  constructor(props){
    super(props);

    this.state = {
      informationList: []
    };
  }

  render(){
    console.log(this.state.informationList);
    return <View style={styles.container}>
      <Header title='虎哥资讯'/>
      <FlatList style={styles.informationList} data={this.state.informationList} renderItem={({item}) => <InformationItem item={item} />}/>
    </View>
  }

  async componentDidMount(){
    // 获取 发布信息列表
    const res = await request.get(config.api.publish);
    if(res && !res.status){
      this.setState({informationList: res.data.map(item => {item.key = item.id; return item})});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  informationList: {
    flex: 1,
    backgroundColor: '#e7e7e7'
  }
});

export default HugeInformation;