import React, { Component } from 'react';
import cx from 'classnames';

class Spinner extends Component {

  render() {
    const {
      cssClass,
      width,
      height,
      color,
      borderColor
    } = this.props;
    const style = {
      'width': width,
      'height': height,
      'border': `0.25rem solid ${borderColor}`,
      'borderTopColor': color
    };
    return (
      <div className={cx('loading', cssClass)} style={style} />
    );
  }
}

export default Spinner;

