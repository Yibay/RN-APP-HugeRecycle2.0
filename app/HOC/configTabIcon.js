import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

import TabIcon from '../containers/HomeTabs/TabIcon/TabIcon';


// HOC 配置Icon
export const configTabIcon = (WrappedComponent, {icon, activeIcon}) => class extends Component {

  render(){
    return (<WrappedComponent {...this.props} icon={icon} activeIcon={activeIcon} />);
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
    icon: <Image source={require('../containers/HomeTabs/TabIcon/img/home.png')} resizeMode='contain' style={styles.icon} />,
    activeIcon: <Image source={require('../containers/HomeTabs/TabIcon/img/Selected-home.png')} resizeMode='contain' style={styles.icon} />
  });

// 商场Tab icon
export const MallIcon = configTabIcon(TabIcon,
  {
    icon: <Image source={require('../containers/HomeTabs/TabIcon/img/store.png')} resizeMode='contain' style={styles.icon} />,
    activeIcon: <Image source={require('../containers/HomeTabs/TabIcon/img/Selected-store.png')} resizeMode='contain' style={styles.icon} />
  });

// 商场Tab icon
export const MineIcon = configTabIcon(TabIcon,
  {
    icon: <Image source={require('../containers/HomeTabs/TabIcon/img/me.png')} resizeMode='contain' style={styles.icon} />,
    activeIcon: <Image source={require('../containers/HomeTabs/TabIcon/img/Selected-me.png')} resizeMode='contain' style={styles.icon} />
  });