import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
import _ from 'lodash';


const countDown = (WrappedComponent, countDown=60) => class extends PureComponent{

  static propTypes = {
    text: PropTypes.string,
    submit: PropTypes.func,
  };

  static defaultProps = {
    text: '',
    submit: () => {console.log('未绑定函数')},
  };

  constructor(props){
    super(props);

    this.state={
      countDown: 0,
    };
  }

  render(){
    return <WrappedComponent {..._.omit(this.props,['text','submit'])}
                             text={this.state.countDown ? `( ${this.state.countDown}s )` : this.props.text}
                             submit={() => this.submit()}
                             style={[this.props.style, this.state.countDown ? styles.disable : null]}
                             textStyle={[this.props.textStyle, this.state.countDown ? styles.disableText : null]}
    />;
  }

  componentWillUnmount(){
    this.setInterval && clearInterval(this.setInterval);
  }

  submit(){
    if(this.state.countDown){
      return;
    }

    this.props.submit();
    this.setState({countDown});
    this.setInterval = setInterval(() => {
      this.setState(state => {
        if(state.countDown > 0){
          return {countDown: state.countDown - 1};
        }
        else {
          clearInterval(this.setInterval);
        }
      });
    }, 1000);
  }
};

const styles = StyleSheet.create({
  disable: {
    backgroundColor: '#888',
  },
  disableText: {
    color: '#fff',
  },
});

export default countDown;