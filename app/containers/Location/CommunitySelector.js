import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView,TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import { setLocation } from '../../redux/actions/Location';


class CommunitySelector extends Component{

  constructor(props){
    super(props);

    this.state = {
      communitySelected: this.props.communitySelected
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      communitySelected: nextProps.communitySelected
    })
  }

  render(){
    return (<View style={styles.container}>
      <Text style={styles.title}>检测到这些小区在您周围</Text>
      <ScrollView style={styles.communityList}>
        <View style={styles.communityLayout}>
          {['秋荷坊','七贤郡','锦云坊', '竹径云山', '七贤山居', '等等', '秋荷坊2','七贤郡2','锦云坊2', '竹径云山2', '七贤山居2', '等等2'].map(
            (item, index) =>
              <TouchableWithoutFeedback key={index} onPress={() => this.selectCommunity(item)}>
                <View style={[styles.community, this.state.communitySelected === item ? styles.communitySelected : styles.none]}>
                  <Text style={styles.communityName}>{item}</Text>
                </View>
              </TouchableWithoutFeedback>
          )}
        </View>
      </ScrollView>
      <View style={styles.commitLayout}>
        <TouchableWithoutFeedback onPress={() => this.commitCommunity()}>
          <View style={styles.commitBtn}>
            <Text style={styles.commitText}>确认选择</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.manualInputBtn}>
          <Text style={styles.manualInputText}>手动输入小区</Text>
        </View>
      </View>
    </View>);
  }

  selectCommunity(text){
    // 更新选中小区
    this.setState({
      communitySelected: text
    });
  }
  commitCommunity(){
    // 更新选中小区 到全局
    this.props.setLocation({
      text: this.state.communitySelected
    });
    // 返回回收页
    Actions.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignSelf: 'stretch'
  },
  title: {
    alignSelf: 'center',
    fontSize: 34,
    fontWeight: '700'
  },
  communityList: {
    marginTop: 90,
    marginBottom: 50,
    flex: 1,
    paddingHorizontal: 40
  },
  communityLayout: {
    marginLeft: -20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  community: {
    width: 286,
    marginLeft: 20,
    marginBottom: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  communitySelected: {
    backgroundColor: 'rgba(153, 204, 51, 1)'
  },
  communityName: {
    fontSize: 25
  },
  commitLayout: {
    marginBottom: 100,
    flexDirection: 'row'
  },
  commitBtn: {
    width: 286,
    marginLeft: 40,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#169bd5'
  },
  manualInputBtn: {
    width: 286,
    marginLeft: 20,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  commitText: {
    fontSize: 25,
    color: '#fff'
  },
  manualInputText: {
    fontSize: 25
  },
  none: {

  }
});

// 过滤出有用state映射给props
function mapStateToProps(state){
  return {
    communitySelected: state
  }
}

// 打包 actions 成obj
const actionCreator = { setLocation };

export default connect(mapStateToProps, actionCreator)(CommunitySelector);