import React,{Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import {onEnter} from "../../../redux/actions/pagesLife/HugeInformationLife";

import Header from '../../../components/Header/Header';
import InformationItem from "../../../containers/HugeInformation/InformationItem";


class HugeInformation extends Component{

  static propTypes = {
    onEnter: PropTypes.func.isRequired,
    hugeInformation: PropTypes.shape({
      data: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired
    })
  };


  render(){
    return <View style={styles.container}>
      <Header title='虎哥资讯'/>
      <FlatList style={styles.informationList}
                data={this.props.hugeInformation.data}
                renderItem={({item}) => <InformationItem item={item} />}
                refreshControl={<RefreshControl refreshing={this.props.hugeInformation.isFetching} onRefresh={() => this.props.onEnter()} />} />
    </View>
  }

  async componentDidMount(){
    this.props.onEnter();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  informationList: {
    flex: 1,
    backgroundColor: '#e7e7e7'
  }
});

function mapStateToProps(state){
  return {
    hugeInformation: state.official.hugeInformation
  }
}

export default connect(mapStateToProps, {onEnter})(HugeInformation);