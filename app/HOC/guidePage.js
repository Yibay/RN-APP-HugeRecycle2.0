import React,{PureComponent} from 'react';
import {StyleSheet, View, Modal} from 'react-native';

import {connect} from 'react-redux';


import request from '../util/request/request';
import config from '../util/request/config';
import {checkVersion} from '../redux/actions/checkVersion';

import Guide from '../pages/Guide/Guide';
import Holiday from '../pages/Guide/Holiday';


export const guidePage = WrappedComponent => connect(null, {checkVersion})(class extends PureComponent{

  constructor(props){
    super(props);

    this.state = {
      waiting: true,
      showHolidayPage: false,
      holidayData: null,
      showGuidePage: true,
    };
  }

  componentDidMount(){
    Promise.all([
      // 是否展示 引导页（轮播图）Android Studio AsyncStorage.load Promise 失效, 真机有效
      Promise.race([
        storage.load({key:'version'})
          .then(ret => {
            // 更新版本，显示引导页
            return ret !== config.version;
          })
          .catch(e => {
            console.warn(e);
            // 异常，显示引导页(可能是新安装，找不到储存version)
            return true;
          }),
        new Promise((resolve, reject) => {
          setTimeout(() => {
            // 超时，不限时引导页
            resolve(false);
          },5000);
        })
      ])
        .then(showGuidePage => {
          this.setState({showGuidePage})
        })
      ,
      // 是否展示 节假日（首屏图）
      request.get(config.api.getBaseImages)
        .then(res => {
          res && !res.status && this.setState({holidayData: res.data, showHolidayPage: !!res.data.filter(item => item.showed).length});
        })
        .catch(e => console.warn(e))
    ])
      .then(() => {
        this.setState({waiting: false});
      })
  }

  render(){
    return <View style={styles.container}>
      <WrappedComponent {...this.props} />
      {/* 引导页：轮播 */}
      <Modal visible={this.state.showGuidePage || this.state.showHolidayPage || this.state.waiting} onRequestClose={() => this.onRequestClose()}>
        {
          this.state.waiting ?
            undefined
            :
            this.state.showHolidayPage ?
              <Holiday holidayData={this.state.holidayData} hideHolidayPage={() => this.hideHolidayPage()}/>
              :
              this.state.showGuidePage ?
                <Guide hideGuidePage={() => this.hideGuidePage()}/>
                :
                undefined
        }
      </Modal>
    </View>
  }

  componentDidUpdate(){
    if(!(this.state.showGuidePage || this.state.showHolidayPage || this.state.waiting)){
      setTimeout(() => this.props.checkVersion(),0);
    }
  }

  // 关闭节假日图
  hideHolidayPage(){
    this.setState({showHolidayPage: false});
  }

  // 关闭引导页轮播图
  hideGuidePage(){
    this.setState({showGuidePage: false});
    storage.save({
      key: 'version',
      data: config.version,
      expires: null
    })
  }

  // Android Modal 必须属性
  onRequestClose(){}
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
