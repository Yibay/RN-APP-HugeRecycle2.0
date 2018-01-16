import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView,TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';


import { setLocation, setAutoLocationFlag } from '../../redux/actions/Location';
import { locationCrossPlatform } from '../../HOC/locationCrossPlatform';


class CommunitySelector extends Component{

  static propTypes = {
    LocateCommunities: PropTypes.array.isRequired, // 定位到的附近的小区 (HOC 提供)
    communitySelected: PropTypes.shape({ // 当前选中小区 (Redux 提供)
      communityName: PropTypes.string.isRequired
    }),
    setLocation: PropTypes.func.isRequired // 修改 当前选中小区的方法（Redux 提供）
  };

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
          {this.props.LocateCommunities.map(
            (item, index) =>
              <TouchableWithoutFeedback key={index} onPress={() => this.selectCommunity(item)}>
                <View style={[styles.community, this.state.communitySelected.communityName === item.communityName ? styles.communitySelected : styles.none]}>
                  <Text style={styles.communityName}>{item.communityName}</Text>
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

  selectCommunity(communitySelected){
    // 更新选中小区
    this.setState({
      communitySelected: communitySelected
    });
  }
  commitCommunity(){
    // 更新选中小区 到全局
    this.props.setLocation(this.state.communitySelected);
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
  }
});

// 过滤出有用state映射给props
function mapStateToProps(state){
  return {
    communitySelected: state.location.currentLocation,
    autoLocationFlag: state.location.autoLocationFlag
  }
}

// 打包 actions 成obj
const actionCreator = { setLocation, setAutoLocationFlag };

export default connect(mapStateToProps, actionCreator)(locationCrossPlatform(CommunitySelector));