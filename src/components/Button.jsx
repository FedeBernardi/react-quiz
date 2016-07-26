require('../css/Button.css');

import React from 'react';

export default React.createClass({
  displayName: 'Button',

  propTypes: {
    text: React.PropTypes.string,
    onHandleButtonClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    align: React.PropTypes.string,
    displayAs: React.PropTypes.string,
    buttonType: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      align: 'center-block',
      displayAs: 'row',
      buttonType: 'btn-primary'
    };
  },

  buttonOptions() {
    return `btn btn-lg fadeInUp ${this.props.align} ${this.props.buttonType}`;
  },

  displayButtonAs() {
    return 'button ' + this.props.displayAs;
  },

  render() {
    return (
      <div className={this.displayButtonAs()}>
        <div className='col-md-12'>
          <button className={this.buttonOptions()}
            onClick={this.props.onHandleButtonClick}
            disabled={this.props.disabled}
          >
              {this.props.text}
          </button>
        </div>
      </div>
    );
  }
});
