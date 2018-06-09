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
      <TextAdaption style={styles.message}>{this.props.item.storeName}</TextAdaption>
      <TextAdaption style={styles.message}>{this.props.item.address}</TextAdaption>
      {
        this.props.item.latitude && this.props.item.longitude ?
          <TextAdaption style={styles.toMap} onPress={() => this.toMap(this.props.item)}>查看地图</TextAdaption>
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
  },
  message: {
    fontSize: 30,
  },
  toMap: {
    position: 'absolute',
    right: 0,
    fontSize: 30,
  }
});

export default StoreOfflineItem;