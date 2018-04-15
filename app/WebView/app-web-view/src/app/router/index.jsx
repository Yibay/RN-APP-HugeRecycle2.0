import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';


import config from '../utils/config';
import HugeInformation from '../views/HugeInformation';


class AppRouter extends PureComponent{
  render(){
    return <BrowserRouter>
      <div>
        <Route path={`${config.publicPath}/test`} component={HugeInformation} />
        <Route path={`${config.publicPath}/test2`} component={HugeInformation} />
      </div>
    </BrowserRouter>
  }
}

export default AppRouter;