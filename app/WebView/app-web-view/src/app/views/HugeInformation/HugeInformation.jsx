import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import styles from './HugeInformation.scss';

import {fetchHugeInformation} from '../../redux/actions/official/hugeInformation';

import FlatList from '../../components/List/FlatList';
import ListItem from '../../containers/HugeInformation/ListItem';
// import Banner from "../../components/Banner/Banner";


class HugeInformation extends PureComponent{

  static propTypes = {
    hugeInformation: PropTypes.shape({
      data: PropTypes.shape({
        carousel: PropTypes.array.isRequired,
        list: PropTypes.array.isRequired,
      }),
      isFetching: PropTypes.bool.isRequired
    })
  };

  render(){
    return <div className={styles["v-huge-information"]}>
      {/*<Banner/>*/}
      <FlatList className={styles.list} data={this.props.hugeInformation.data.list} renderItem={(item, index) => <ListItem key={index} item={item} />}/>
    </div>;
  }

  async componentDidMount(){
    this.props.fetchHugeInformation();
  }
}

function mapStateToProps(state){
  return {
    hugeInformation: state.official.hugeInformation
  }
}

export default connect(mapStateToProps, {fetchHugeInformation})(HugeInformation);