import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';


import config from '../../../util/request/config';


class Banner extends Component {

  static propTypes = {
    bannerList: PropTypes.arrayOf(
      PropTypes.shape({
        imageSrc: PropTypes.string.isRequired
      })
    ),
    bannerWidth: PropTypes.number.isRequired
  };

  static defaultProps = {
    bannerList: [],
    bannerWidth: 750
  };

  constructor(props){
    super(props);

    this.state = {
      bannerHeight: 0
    };
  }

  componentWillReceiveProps(nextProps){
    // 获取banner 图尺寸
    this.resizeImage(nextProps.bannerList);
  }

  render(){
    let styles = StyleSheet.create({
      slide: {
        width: this.props.bannerWidth,
        height: this.state.bannerHeight
      }
    });

    if(this.props.bannerList.length){
      return (<View style={[styles.slide].concat(this.props.style)}>
        <Swiper autoplay={true} autoplayTimeout={4} showsPagination={false}>
          {
            this.props.bannerList.map((item, index) => <Image key={index} style={[styles.slide].concat(this.props.style)} source={{uri: `${config.static.mallBase}${item.imageSrc}`}} resizeMode='stretch' />)
          }
        </Swiper>
      </View>)
    }
    else {
      return null;
    }
  }

  componentDidMount(){
    // 获取banner 图尺寸
    // this.resizeImage(this.props.bannerList);
  }

  // 调整banner图片尺寸
  resizeImage(bannerList){
    // 获取banner 图尺寸
    if(bannerList.length){
      Image.getSize(`${config.static.mallBase}${bannerList[0].imageSrc}`, (width, height) => {
        this.setState({
          bannerHeight: height / width * this.props.bannerWidth
        })
      });
    }
  }
}

export default Banner;