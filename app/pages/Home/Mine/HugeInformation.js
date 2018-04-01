import React,{Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import {fetchHugeInformationThunk} from '../../../redux/actions/official/hugeInformation';

import Header from '../../../components/Header/Header';
import InformationItem from "../../../containers/HugeInformation/InformationItem";


class HugeInformation extends Component{

  static propTypes = {
    fetchHugeInformationThunk: PropTypes.func.isRequired,
    hugeInformation: PropTypes.shape({
      data: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired
    })
  };

  constructor(props){
    super(props);

    this.state = {
      informationList: []
    };
  }

  render(){
    return <View style={styles.container}>
      <Header title='虎哥资讯'/>
      <FlatList style={styles.informationList} data={this.props.hugeInformation.data} renderItem={({item}) => <InformationItem item={item} />}/>
    </View>
  }

  async componentDidMount(){
    this.props.fetchHugeInformationThunk();
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

export default connect(mapStateToProps, {fetchHugeInformationThunk})(HugeInformation);