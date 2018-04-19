import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';


import styles from './ListItem.scss';


class ListItem extends PureComponent{

  static propTypes = {
    item: PropTypes.shape({
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      summary: PropTypes.string,
      createTime: PropTypes.string,
      url: PropTypes.string,
    })
  };

  render(){
    return <div>
      <a href={this.props.item.url}>
        <div className={styles["m-list-item"]}>
          <img className={styles.img} src={this.props.item.imageUrl} alt='' />
          <div className={styles.subject}>
            <div className={styles.title}>{this.props.item.title}</div>
            <div className={styles.content}>
              <div className={styles.summary} dangerouslySetInnerHTML={{__html: this.props.item.summary}} />
              <div className={styles.tag}>
                <span className={styles.createTime}>{this.props.item.createTime}</span>
                {
                  '垃圾分类 虎哥回收'
                }
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  }
}

export default ListItem;