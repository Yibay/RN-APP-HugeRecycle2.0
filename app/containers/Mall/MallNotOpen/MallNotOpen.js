import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import SubmitBtn from '../../../components/Form/Btn/SubmitBtn';
import TextAdaption from "../../../components/Text/TextAdaption";
import StoreOfflineItem from './StoreOfflineItem';


class MallNotOpen extends Component {

  static propTypes = {
    storeOffline: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({})
      ),
      isFetching: PropTypes.bool.isRequired,
    }),
  };

  render(){
    return <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} resizeMode='contain' source={require('./img/notOpenIcon.png')} />
        <Text style={styles.explain}>当前小区暂末开通在线商城服务</Text>
        {
          this.props.storeOffline.data.length ?
            <View style={styles.offline}>
              <TextAdaption style={styles.offlineTitle}>您可以到以下店铺消费环保金</TextAdaption>
              {
                this.props.storeOffline.data.map((item, index) => <StoreOfflineItem key={index} item={item} />)
              }
            </View>
            :
            <SubmitBtn style={styles.submitBtn} text='重新选择小区' submit={() => Actions.locationPage()}/>
        }
      </View>
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  img: {
    width: 400,
    height: 382,
    marginTop: 44
  },
  explain: {
    marginTop: 54,
    fontSize: 30,
    fontWeight: '700',
    color: '#888'
  },
  submitBtn: {
    // width: 300,
    marginTop: 130
  },
  // 线下店
  offline:{
    marginTop: 150,
  },
  offlineTitle: {
    marginBottom: 40,
    fontSize: 40,
    fontWeight: '700',
  }
});

function mapStateToProps(state){
  return {
    storeOffline: state.mall.storeOffline
  }
}

export default connect(mapStateToProps)(MallNotOpen);