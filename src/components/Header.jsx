require('../css/Header.css');

import React from 'react';

export default React.createClass({
  displayName: 'Header',

  propTypes: {
    appName: React.PropTypes.string
  },

  render() {
    return (
      <div className='header navbar navbar-default'>
        <div className='navbar-header'>
          <h1 className='navbar-brand-name'>{this.props.appName}</h1>
        </div>
      </div>
    );
  }
});
