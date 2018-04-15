import React, {PureComponent} from 'react';

import {connect} from 'react-redux';


import {fetchHugeInformation} from "../redux/actions/official/hugeInformation";


class HugeInformation extends PureComponent{
  render(){
    return <div>虎哥资讯</div>;
  }

  async componentDidMount(){
    this.props.fetchHugeInformation();
  }
}

export default connect(null, {fetchHugeInformation})(HugeInformation);