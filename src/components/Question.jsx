require('../css/Question.css');

import React from 'react';

export default React.createClass({
  displayName: 'Question',
  
  propTypes: {
    questionText: React.PropTypes.string
  },

  render() {
    return (
      <div className='question panel panel-default' >
        <div className='panel-body' >
          {this.props.questionText}
        </div>
      </div>
    );
  }
});
