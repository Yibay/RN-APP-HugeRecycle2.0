import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

import TabIcon from '../containers/HomeTabs/TabIcon/TabIcon';


// HOC 配置Icon
export const configTabIcon = (WrappedComponent, {icon, activeIcon, label}) => class extends Component {

  render(){
    return (<WrappedComponent {...this.props} icon={icon} activeIcon={activeIcon} label={label} />);
  }
};

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48
  }
});

// 回收Tab icon
export const RecycleIcon = configTabIcon(TabIcon,
  {
    label: '我要回收',
    icon: <Image source={require('../containers/HomeTabs/TabIcon/img/home.png')} resizeMode='contain' style={styles.icon} />,
    activeIcon: <Image source={require('../containers/HomeTabs/TabIcon/img/Selected-home.png')} resizeMode='contain' style={styles.icon} />
  });

// 商场Tab icon
export const MallIcon = configTabIcon(TabIcon,
  {
    label: '虎哥商场',
    icon: <Image source={require('../containers/HomeTabs/TabIcon/img/store.png')} resizeMode='contain' style={styles.icon} />,
    activeIcon: <Image source={require('../containers/HomeTabs/TabIcon/img/Selected-store.png')} resizeMode='contain' style={styles.icon} />
  });

// 商场Tab icon
export const MineIcon = configTabIcon(TabIcon,
  {
    label: '我的',
    icon: <Image source={require('../containers/HomeTabs/TabIcon/img/me.png')} resizeMode='contain' style={styles.icon} />,
    activeIcon: <Image source={require('../containers/HomeTabs/TabIcon/img/Selected-me.png')} resizeMode='contain' style={styles.icon} />
  });