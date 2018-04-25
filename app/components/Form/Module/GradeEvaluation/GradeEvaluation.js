/**
 * 等级评价 组件
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    width: 144,
    fontSize: 28,
    color: '#888',
    fontWeight: '700'
  },
  scoringBar: {
    minWidth: 316,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scoringBarIcon: {
    width: 53,
    height: 53,
    marginRight: 24
  }
});


class GradeEvaluation extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    activityIcon: PropTypes.element.isRequired,
    inactivityIcon: PropTypes.element.isRequired,
    onChangeScore: PropTypes.func.isRequired
  };

  static defaultProps = {
    label: '被选项标题',
    level: 3,
    activityIcon: <Image style={styles.scoringBarIcon} source={require('./img/star33x.png')} resizeMode='contain' />,
    inactivityIcon: <Image style={styles.scoringBarIcon} source={require('./img/star13x.png')} resizeMode='contain' />,
    onChangeScore: score => {console.log('未绑定获取score的回调')}
  };

  constructor(props){
    super(props);

    this.state = {
      score: 0
    };
  }

  render(){

    let levelIcons = [];

    for(let i=0;i<this.props.level;i++){
      levelIcons.push(
        <TouchableWithoutFeedback key={i} onPress={() => this.grade(i+1)}>
          {
            this.state.score > i ? this.props.activityIcon : this.props.inactivityIcon
          }
        </TouchableWithoutFeedback>
      )
    }

    return(<View style={[styles.container].concat(this.props.style)}>
      <Text style={styles.label}>{this.props.label}</Text>
      <View style={styles.scoringBar}>
        {
          levelIcons
        }
      </View>
    </View>)
  }

  // 评价
  grade(score){
    this.setState({score});
    this.props.onChangeScore(score);
  }
}




export default GradeEvaluation;