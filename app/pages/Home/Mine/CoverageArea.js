import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import {onEnter} from "../../../redux/actions/pagesLife/CoverageAreaLife";

import Header from "../../../components/Header/Header";
import StreetItem from "../../../containers/CoverageArea/StreetItem";
import TextAdaption from "../../../components/Text/TextAdaption";


class CoverageArea extends Component {

  static propTypes = {
    onEnter: PropTypes.func.isRequired,
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
                keyExtractor={(item,index) => index.toString()}
                ListHeaderComponent={<TextAdaption style={styles.header}>服务站正在全面铺设当中，现有站点如下：</TextAdaption>}
                renderItem={({item}) => <StreetItem street={item} style={styles.item}/>}
                ListFooterComponent={<TextAdaption style={styles.footer}>更多小区，敬请期待！</TextAdaption>}
                refreshControl={<RefreshControl refreshing={this.props.coverageArea.isFetching} onRefresh={() => this.props.onEnter()} />} />
    </View>
  }

  componentDidMount(){
    this.props.onEnter();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  header: {
    marginVertical: 36,
    paddingHorizontal: 36,
    fontSize: 26,
    color: '#000'
  },
  item: {
    paddingHorizontal: 36,
  },
  footer: {
    marginVertical: 96,
    paddingHorizontal: 36,
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

export default connect(mapStateToProps, {onEnter})(CoverageArea);