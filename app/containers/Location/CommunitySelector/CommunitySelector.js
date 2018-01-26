import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView,TouchableWithoutFeedback, Image } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';


import { setLocation, setAutoLocationFlag } from '../../../redux/actions/Location';
import { locationCrossPlatform } from '../../../HOC/locationCrossPlatform';


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
    return (<View style={[styles.container].concat(this.props.style)}>
      <Text style={styles.title}>{this.props.LocateCommunities.length === 0 ? '定位中' : '检测到这些小区在您周围'}</Text>
      {
        this.props.LocateCommunities.length === 0 ?
          <View style={styles.Positioning}>
            <Image style={styles.positionImg} resizeMode='contain' source={require('./img/Location2x.png')} />
          </View>
          :
          <View style={styles.communitySection}>
            <ScrollView style={styles.communityList}>
              <View style={styles.communityLayout}>
                {this.props.LocateCommunities.map(
                  (item, index) =>
                    <TouchableWithoutFeedback key={index} onPress={() => this.selectCommunity(item)}>
                      <View style={[styles.community, this.state.communitySelected.communityName === item.communityName ? styles.communitySelected : undefined]}>
                        <Text style={this.state.communitySelected.communityName === item.communityName ? styles.communitySelectedName : styles.communityName }>{item.communityName}</Text>
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
              <TouchableWithoutFeedback onPress={() => Actions.locationManuallyPage()}>
                <View style={styles.manualInputBtn}>
                  <Text style={styles.manualInputText}>手动输入小区</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
      }
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

    // 查看 用户地址列表中，是否有相同小区
    let matchingAddress = this.props.userAddressList.filter(item => item.communityId === this.state.communitySelected.communityId);
    // 有,则取那个地址
    if(matchingAddress.length){
      this.props.setLocation(matchingAddress[0]);
    }
    // 没有,则仅取定位小区
    else{
      this.props.setLocation(this.state.communitySelected);
    }
    // 返回回收页
    Actions.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 705,
    paddingTop: 66,
    paddingBottom: 60,
    alignSelf: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: 34,
    fontWeight: '700'
  },
  // 定位中
  Positioning: {
    flex: 1,
    paddingTop: 146,
    alignItems: 'center'
  },
  positionImg: {
    width: 381,
    height: 315
  },
  // 小区模块
  communitySection: {
    flex: 1
  },
  // 小区列表
  communityList: {
    width: 414,
    marginTop: 60,
    marginBottom: 50,
    flex: 1,
    alignSelf: 'center'
  },
  communityLayout: {
    marginLeft: -26,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  community: {
    width: 194,
    height: 68,
    marginLeft: 26,
    marginBottom: 26,
    borderColor: '#b1b1b1',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  communitySelected: {
    borderWidth: 0,
    backgroundColor: '#ffd101'
  },
  communityName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#888'
  },
  communitySelectedName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff'
  },
  // 控制按钮
  commitLayout: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  commitBtn: {
    flex: 1,
    paddingHorizontal: 52
  },
  manualInputBtn: {
    flex: 1,
    paddingHorizontal: 52,
    borderLeftWidth: 2,
    borderLeftColor: '#707070'
  },
  commitText: {
    textAlign: 'right',
    fontSize: 26,
    fontWeight: '700',
    color: '#000'
  },
  manualInputText: {
    textAlign: 'left',
    fontSize: 26,
    color: '#525252'
  }
});

// 过滤出有用state映射给props
function mapStateToProps(state){
  return {
    communitySelected: state.location.currentLocation,
    autoLocationFlag: state.location.autoLocationFlag,
    userAddressList: state.location.userAddressList
  }
}

// 打包 actions 成obj
const actionCreator = { setLocation, setAutoLocationFlag };

export default connect(mapStateToProps, actionCreator)(locationCrossPlatform(CommunitySelector));