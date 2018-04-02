import React,{Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableWithoutFeedback} from 'react-native';

import PropTypes from 'prop-types';


import AdaptLayoutWidth from "../../components/AdaptLayoutWidth";


class Holiday extends Component{

  static propTypes = {
    holidayData: PropTypes.arrayOf(
      PropTypes.shape({
        imageSrc: PropTypes.string.isRequired
      })
    ),
    hideHolidayPage: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      countDown: 3
    };
  }

  render(){
    return <AdaptLayoutWidth>
      <View style={styles.container} ref='componentExisted'>
        <Image style={styles.holidayImg} source={{uri: this.props.holidayData[0].imageSrc}} resizeMode='stretch'/>
        <TouchableWithoutFeedback onPress={() => this.props.hideHolidayPage()}>
          <View style={styles.countDownBtn}>
            <Text style={styles.text}>跳过 <Text style={styles.countDown}>{this.state.countDown}</Text>秒</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </AdaptLayoutWidth>
  }

  componentDidMount(){
    this.countDown();
  }

  // 倒计时
  countDown(){
    let time = setInterval(() => {
      if(this.refs.componentExisted){
        this.setState({countDown: this.state.countDown - 1});
        if(!this.state.countDown){
          clearInterval(time);
          this.props.hideHolidayPage();
        }
      }
      else {
        clearInterval(time);
      }
    }, 1000);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  // 背景图
  holidayImg: {
    flex: 1
  },
  // 跳过按钮
  countDownBtn: {
    position: 'absolute',
    top: 100,
    right: 50,
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 28
  },
  countDown: {
    color: '#ff0000',
    fontWeight: '700'
  }
});

export default Holiday;