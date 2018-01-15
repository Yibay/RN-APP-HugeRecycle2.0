import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, PixelRatio } from 'react-native';

/*
 * 屏幕适配
 * 即：修正 默认的pt单位，如：修正成rpx
 * */

// 获取设备像素点密度
const scalePT = PixelRatio.get();

// 获取设备pt（像素点）宽高
const { width, height } = Dimensions.get('window');
let widthPT = width, heightPT = height;

// 设计尺寸 宽高
const designSize = { width: 750, height: 1334 };
// 设计尺寸 宽度 缩放比例
const scaleDesignWidth = designSize.width / PixelRatio.getPixelSizeForLayoutSize(widthPT);
// 设计尺寸 高度 缩放比例
const scaleDesignHeight = designSize.height / PixelRatio.getPixelSizeForLayoutSize(heightPT);


// 屏幕尺寸（最终用来布局的屏幕尺寸）
const winSize = {
  width: designSize.width,
  height: PixelRatio.getPixelSizeForLayoutSize(heightPT) * scaleDesignWidth
};

const styles = StyleSheet.create({
  rootView: {
    width: winSize.width,
    height: winSize.height,
    transform: [
      {translateX: winSize.width * -.5},
      {translateY: winSize.height * -.5},
      // 缩放时，按中心点缩放，所以先调整中心点位置
      {scale: 1 / scalePT / scaleDesignWidth},
      // 缩放后，移动的距离也会相应缩放
      {translateX: winSize.width * .5},
      {translateY: winSize.height * .5}
    ]
  }
});


// 按屏宽 适配
class AdaptLayoutWidth extends Component{

  render(){
    return(<View style={styles.rootView}>
      {
        this.props.children
      }
    </View>);
  }
}

export default AdaptLayoutWidth;