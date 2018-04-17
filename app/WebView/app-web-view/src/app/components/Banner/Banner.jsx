import React, {PureComponent} from 'react';

import Slide from 'react-slick';
import PropTypes from 'prop-types';


import styles from './Banner.scss';


class Banner extends PureComponent{

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
    width: PropTypes.string,
    height: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    width: '100vw',
    height: '40vw'
  };

  constructor(props){
    super(props);

    this.state = {
      settings: {
        autoplay: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
      }
    };
  }

  render(){
    return <div className={[styles["m-banner"]].concat(this.props.className).join(' ')}>
      <Slide {...this.state.settings}>
        {
          this.props.data.map((item, index) => <div key={index} className={styles.slider}>
              <a href={item.url}>
              {
                item.imageUrl ?
                  <img src={item.imageUrl} style={{width: this.props.width,height: this.props.height}} />
                  :
                  <div style={{width: this.props.width,height: this.props.height}} />
              }
              </a>
              <div className={styles.title}>{item.title}</div>
            </div>
          )
        }
      </Slide>
    </div>
  }
}

function PrevArrow(props){
  const {className, style, onClick} = props;
  return <div className={[className, 'iconfont icon-menuleft'].join(' ')} onClick={onClick} />
}

function NextArrow(props){
  const {className, style, onClick} = props;
  return <div className={[className, 'iconfont icon-menuright'].join(' ')} onClick={onClick} />
}

export default Banner;