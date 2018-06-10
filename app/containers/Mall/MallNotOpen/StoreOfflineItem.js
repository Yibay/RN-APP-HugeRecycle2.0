import React,{PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';


import {showMap} from '../../../util/mapManager';

import TextAdaption from "../../../components/Text/TextAdaption";


class StoreOfflineItem extends PureComponent{

  static propTypes = {
    item: PropTypes.shape({
      storeName: PropTypes.string,
      address: PropTypes.string,
    })
  };

  render(){
    return <View style={[styles.container]}>
      <View style={styles.messageSection}>
        <TextAdaption style={styles.message}>{this.props.item.storeName}</TextAdaption>
        <TextAdaption style={styles.message}>{this.props.item.address}</TextAdaption>
      </View>
      {
        this.props.item.latitude && this.props.item.longitude ?
          <TextAdaption style={styles.toMap} onPress={() => this.toMap(this.props.item)}>&#xe8c9;</TextAdaption>
          :
          null
      }
    </View>;
  }

  toMap({longitude,latitude,address}){
    // let longitude = '121.2477511168';  // ---经度 121.248078
    // let latitude = '31.0913734181';   // ---纬度 31.091769
    // let address = '上海松江王家厍路55弄';
    showMap(longitude,latitude,address);
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageSection: {

  },
  message: {
    fontSize: 30,
  },
  toMap: {
    fontSize: 60,
    fontFamily: 'iconfont',
  }
});

export default StoreOfflineItem;