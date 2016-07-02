import React from 'react';
import Button from './Button';

export default React.createClass({
  displayName: 'Quit',

  propTypes: {
    disabled: React.PropTypes.bool,
    history: React.PropTypes.object,
    onHandleButtonClick: React.PropTypes.func
  },

  handleButtonClick(){
    this.props.history.push('/');
  },

  render(){
    return (
      <Button align='pull-right' text='Quit'
        onHandleButtonClick={this.handleButtonClick}
        disabled={false}
      />
    );
  }

});
