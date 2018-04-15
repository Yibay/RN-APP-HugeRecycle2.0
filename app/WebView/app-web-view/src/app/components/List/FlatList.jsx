import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';


import styles from './FlatList.scss';


class FlatList extends PureComponent{

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: '',
    data: [],
    renderItem: item => null,
  };

  render(){
    return <ul className={[styles["m-flat-list"]].concat(this.props.className).join(' ')}>
      {
        this.props.data.map(this.props.renderItem)
      }
    </ul>
  }
}

export default FlatList;