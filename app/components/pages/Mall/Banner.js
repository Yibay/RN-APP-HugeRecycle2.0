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
    )
  };

  static defaultProps = {
    bannerList: []
  };

  render(){
    if(this.props.bannerList.length){
      return (<View style={styles.slide}>
        <Swiper autoplay={true} autoplayTimeout={4}>
          {
            this.props.bannerList.map((item, index) => <Image key={index} style={styles.slide} source={{uri: `${config.static.mallBase}${item.imageSrc}`}} resizeMode='stretch' />)
          }
        </Swiper>
      </View>)
    }
    else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  slide: {
    width: 750,
    height: 284
  }
});

export default Banner;