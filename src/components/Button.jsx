require('../css/Button.css');

import React from 'react';

export default React.createClass({
  displayName: 'Button',

  propTypes: {
    text: React.PropTypes.string,
    onHandleButtonClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    align: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      align: 'center-block'
    };
  },
  alignButton: function() {
    return 'btn btn-lg btn-primary fadeInUp ' + this.props.align;
  },

  render() {
    return (
      <div className='row button'>
        <div className='col-md-12'>
          <button className={this.alignButton()}
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
