import React,{PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';


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
    </View>;
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  message: {
    fontSize: 30,
  }
});

export default StoreOfflineItem;