import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import _ from 'lodash';


/** 兼容Android 7.0 borderRadius、borderWidth 冲突 显示异常Bug */
const ViewCompatible = props => {
  let styles = StyleSheet.flatten(props.style);
  let borderWidthFlag = !!styles.borderWidth;
  let borderRadiusFlag = !!styles.borderRadius;
  let stylesCompatible;
  let newStyle={};

  if(borderWidthFlag && borderRadiusFlag){
    // stylesCompatible 不能用 overflow: 'hidden', 否则内部左上角有Bug
    stylesCompatible = {borderRadius: styles.borderRadius, backgroundColor: styles.borderColor || '#000', justifyContent: 'center', alignItems: 'center'};
    styles.margin && (stylesCompatible.margin = styles.margin);
    styles.marginTop && (stylesCompatible.marginTop = styles.marginTop);
    styles.marginRight && (stylesCompatible.marginRight = styles.marginRight);
    styles.marginBottom && (stylesCompatible.marginBottom = styles.marginBottom);
    styles.marginLeft && (stylesCompatible.marginLeft = styles.marginLeft);
    styles.position && (stylesCompatible.position = styles.position);
    styles.top && (stylesCompatible.top = styles.top);
    styles.right && (stylesCompatible.right = styles.right);
    styles.bottom && (stylesCompatible.bottom = styles.bottom);
    styles.left && (stylesCompatible.left = styles.left);

    styles.width && (stylesCompatible.width = styles.width);
    styles.height && (stylesCompatible.height = styles.height);
    styles.minWidth && (stylesCompatible.minWidth = styles.minWidth);
    styles.minHeight && (stylesCompatible.minHeight = styles.minHeight);
    styles.maxWidth && (stylesCompatible.maxWidth = styles.maxWidth);
    styles.maxHeight && (stylesCompatible.maxHeight = styles.maxHeight);

    styles.width && (newStyle.width = styles.width - styles.borderWidth * 2);
    styles.height && (newStyle.height = styles.height - styles.borderWidth * 2);
    styles.minWidth && (newStyle.minWidth = styles.minWidth - styles.borderWidth * 2);
    styles.minHeight && (newStyle.minHeight = styles.minHeight - styles.borderWidth * 2);
    styles.maxWidth && (newStyle.maxWidth = styles.maxWidth - styles.borderWidth * 2);
    styles.maxHeight && (newStyle.maxHeight = styles.maxHeight - styles.borderWidth * 2);

    newStyle.backgroundColor = styles.backgroundColor || '#fff';
    styles = _.omit(styles, ['borderWidth','margin','marinTop','marginRight','marginBottom','marginLeft','position','top','right','bottom','left']);

    props = _.omit(props, ['style']);
  }

  return <View style={stylesCompatible}>
    <View {...props} style={[styles, newStyle]} />
  </View>
};

export default ViewCompatible;