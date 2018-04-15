import React, {PureComponent} from 'react';


import request from "../utils/request";
import config from "../utils/config";


class HugeInformation extends PureComponent{
  render(){
    return <div>虎哥资讯</div>;
  }

  async componentDidMount(){
    const res = await request.get(config.api.publish);
    console.log(res);
  }
}

export default HugeInformation;