import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import {fetchCoverageAreaThunk} from '../../../redux/actions/official/coverageArea';

import Header from "../../../components/Header/Header";
import StreetItem from "../../../containers/CoverageArea/StreetItem";


class CoverageArea extends Component {

  static propTypes = {
    fetchCoverageAreaThunk: PropTypes.func.isRequired,
    coverageArea: PropTypes.shape({
      data: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired
    })
  };

  render(){
    return <View style={styles.container}>
      <Header title='服务范围'/>
      <FlatList style={styles.content}
                data={this.props.coverageArea.data}
                ListHeaderComponent={<Text style={styles.header}>服务站正在全面铺设当中，现有站点如下：</Text>}
                renderItem={({item}) => <StreetItem street={item}/>}
                ListFooterComponent={<Text style={styles.footer}>更多小区，敬请期待！</Text>} />
    </View>
  }

  componentDidMount(){
    this.props.fetchCoverageAreaThunk();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: 36,
    backgroundColor: '#f7f7f7'
  },
  header: {
    marginVertical: 36,
    fontSize: 26,
    color: '#000'
  },
  footer: {
    marginVertical: 96,
    fontSize: 28,
    textAlign: 'center',
    color: '#878787'
  }
});

function mapStateToProps(state){
  return {
    coverageArea: state.official.coverageArea
  }
}

export default connect(mapStateToProps, {fetchCoverageAreaThunk})(CoverageArea);