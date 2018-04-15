import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';


import styles from './index.scss';

import config from '../utils/config';
import HugeInformation from '../views/HugeInformation/HugeInformation';


class AppRouter extends PureComponent{
  render(){
    return <BrowserRouter>
      <div className={styles["m-router"]}>
        <Route path={`${config.publicPath}/hugeInformation`} component={HugeInformation} />
      </div>
    </BrowserRouter>
  }
}

export default AppRouter;