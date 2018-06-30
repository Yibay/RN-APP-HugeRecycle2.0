import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image, ViewPropTypes, Alert, Platform} from 'react-native';

import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import {ActionSheet} from 'antd-mobile-rn';


import request from '../../util/request/request';
import config from "../../util/request/config";


class PersonnelInformation extends PureComponent{

  static propTypes = {
    hugeImg: PropTypes.bool,
    imgURL: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    name: PropTypes.string,
    phone: PropTypes.string,
    rightModule: PropTypes.element,
    imgStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    hugeImg: false, // 是否是虎哥的头像
  };

  constructor(props){
    super(props);

    this.state = {
      imgURL: props.imgURL,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({imgURL: nextProps.imgURL});
  }

  render(){
    let imgURL = this.state.imgURL;

    if(!imgURL || (typeof imgURL === 'object' && !imgURL.uri)){
      this.props.hugeImg ? (imgURL= require('../../assets/img/hugeHeadDefault.png')) : (imgURL = require('../../assets/img/personalImage2x.png'));
    }

    return <View style={[styles.basicFacts].concat(this.props.style)}>
      <Image style={[styles.personalImage].concat(this.props.imgStyle)} source={imgURL} resizeMode='contain'
             onStartShouldSetResponder={() => true}
             onResponderRelease={() => this.updateUserImg()} />
      <View style={styles.message}>
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.phone}>{this.props.phone}</Text>
        <View style={styles.rightModule}>
          {
            this.props.rightModule
          }
        </View>
      </View>
    </View>
  }

  updateUserImg(){
    // option 选项
    let button = Platform.select({
      android: [
        {option: '从手机中选择', action: () => {this.chooseImg();}},
        {option: '取消'}
      ],
      ios: [
        {option: '拍照', action: () => {this.openCamera();}},
        {option: '从手机中选择', action: () => {this.chooseImg();}},
        {option: '取消'}
      ],
    });

    ActionSheet.showActionSheetWithOptions({
      options: button.map(item => item.option),
      cancelButtonIndex: button.length - 1,
    },buttonIndex => {
      if(typeof button[buttonIndex].action === 'function'){
        button[buttonIndex].action();
      }
    });
  }

  openCamera(){
    try{
      ImagePicker.openCamera({
        width: 158,
        height: 158,
        cropping: true
      }).then(image => {
        console.log(image);
        this.uploadImgReq(image);
      });
    }
    catch(e){
      console.log(e);
    }
  }

  chooseImg(){
    ImagePicker.openPicker({
      width: 158,
      height: 158,
      cropping: true,
    }).then(image => {
      this.uploadImgReq(image);
    });
  }

  uploadImgReq(image){
    this.setState({imgURL: {uri:image.path}});
    request.postFormData(
      config.api.uploadUserImg,
      {
        imgFile:{
          uri: image.path,
          type: "multipart/form-data",
          name: "image.png"
        }
      })
      .then(res => {
        console.log(res);
        // 更新头像请求，防止删除本地图片导致，头像显示异常
      })
      .catch(e => {
        console.log(e);
        Alert.alert('上传失败','','确认');
    });
  }
}

const styles = StyleSheet.create({
  // 基本信息
  basicFacts: {
    marginBottom: 12,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  // 个人头像
  personalImage: {
    alignSelf: 'center',
    width: 157,
    height: 157,
    marginHorizontal: 24
  },
  // 个人信息
  message: {
    position: 'relative',
    flex: 1,
    height: 188,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  // 个人名称
  name: {
    marginBottom: 24,
    fontSize: 32,
    fontWeight: '900',
    color: '#000'
  },
  phone: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000'
  },
  rightModule: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },
});

export default PersonnelInformation;