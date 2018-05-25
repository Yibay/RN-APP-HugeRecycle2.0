import React,{Component} from 'react';
import {StyleSheet, View, Modal} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import request from '../util/request/request';
import config from '../util/request/config';
import {checkVersion} from '../redux/actions/checkVersion';

import Guide from '../pages/Guide/Guide';
import Holiday from '../pages/Guide/Holiday';


export const guidePage = WrappedComponent => connect(null, {checkVersion})(class extends Component{

  constructor(props){
    super(props);

    this.state = {
      waiting: true,
      showHolidayPage: false,
      holidayData: null,
      showGuidePage: true,
    };
  }

  componentWillMount(){
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
            // 异常，不限时引导页
            return false;
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
      this.props.checkVersion();
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
