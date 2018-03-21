import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import request from '../../../util/request/request';
import config from '../../../util/request/config';
import { setLocationThunk } from '../../../redux/actions/Location';

import InputSection from '../../../components/Form/Input/InputSection';
import CommunitySearched from '../CommunitySearched';
import SubmitBtn from '../../../components/Form/Btn/SubmitBtn';


class CommunitySearchEngines extends Component {

  static propTypes = {
    selectedLocationCallBack: PropTypes.func // 有此回调函数，则选中小区后，不更新给redux currentLocation
  };

  constructor(props){
    super(props);

    this.state = {
      communityName: '',
      allCommunity: [],
      communitySelected: null
    };
  }

  render(){
    return (<View>
      <InputSection value={this.state.communityName} onChangeText={val => this.onChangeText(val)} placeholder='请输入小区名'
                    leftButton={<Image style={styles.leftButton} source={require('./img/search2x.png')} resizeMode='contain' />}
                    rightButton={<TouchableWithoutFeedback onPress={() => this.onChangeText('')}>
                      <Image style={styles.rightButton} source={require('./img/cancel2x.png')} resizeMode='contain' />
                    </TouchableWithoutFeedback>}/>
      <ScrollView style={styles.searchResult}>
        {
          this.state.allCommunity.filter(item => item.communityName.indexOf(this.state.communityName) !== -1 ).map((item, index) =>
            <TouchableWithoutFeedback key={index} onPress={() => this.selectCommunity(item)}>
                <CommunitySearched  key={index} communityData={item} style={styles.CommunitySearched}/>
            </TouchableWithoutFeedback>)
        }
      </ScrollView>
      <SubmitBtn style={styles.SubmitBtn} submit={() => this.commitCommunity()}/>
    </View>)
  }

  async componentDidMount(){
    // 获取所有小区 信息列表
    const res = await request.get(config.api.getAllCommunity);
    console.log(res);
    // 若返回数据正常
    if(res && !res.status){
      this.setState({ allCommunity: res.data });
    }
  }

  // 手动输入小区名
  onChangeText(communityName){
    this.setState({communityName, communitySelected: null});
  }

  // 选中小区
  selectCommunity(communitySelected){
    console.log(communitySelected);
    this.setState({ communitySelected, communityName: communitySelected.communityName });
  }

  // 更新选中小区 到全局
  commitCommunity(){
    if(this.state.communitySelected){
      // 若有回调函数，则回传数据
      if(this.props.selectedLocationCallBack){
        this.props.selectedLocationCallBack(this.state.communitySelected);
      }
      // 否则更新到 redux currentLocation
      else{
        // 查看 用户地址列表中，是否有相同小区
        let matchingAddress = this.props.userAddressList.filter(item => item.communityId === this.state.communitySelected.communityId);
        // 有,则取那个地址
        if(matchingAddress.length){
          this.props.setLocationThunk(matchingAddress[0]);
        }
        // 没有,则仅取定位小区
        else{
          this.props.setLocationThunk(this.state.communitySelected);
        }
      }
      Actions.pop();
      Actions.pop();
    }
    else{
      Alert.alert('请选择你所在的小区');
    }
  }
}

const styles = StyleSheet.create({
  leftButton: {
    width: 33,
    height: 33,
    marginRight: 16
  },
  rightButton: {
    width: 30,
    height: 30
  },
  searchResult: {
    height: 444
  },
  CommunitySearched: {
    borderTopWidth: 2,
    borderTopColor: '#e6e7e9'
  },
  SubmitBtn: {
    marginTop: 78
  },
  TouchableWithoutFeedback: {
    backgroundColor: 'blue',
    height: 80
  }
});

function mapStateToProps(state){
  return {
    // communitySelected: state.location.currentLocation,
    userAddressList: state.location.userAddressList
  }
}

export default connect(mapStateToProps, {setLocationThunk})(CommunitySearchEngines);