require('../css/Answer.css');

import React from 'react';

export const Answer = React.createClass({
  displayName: 'Answer',

  propTypes: {
    id: React.PropTypes.number,
    play: React.PropTypes.func,
    select: React.PropTypes.number,
    style: React.PropTypes.string,
    text: React.PropTypes.string
  },

  handleClickAnswer() {
    this.props.play(this.props.id);
  },

  getStyleClass() {
    if(!this.props.select)
      return 'answerBlock answerBlockHover centeredElement fadeInUp';
    else
      return `answerBlock centeredElement ${this.props.style}`;
  },

  getIcon(){
    if(this.props.select == this.props.id && this.props.style == 'correctAnswer') {
      return 'glyphicon glyphicon-ok-circle';
    }
    else if (this.props.select == this.props.id){
      return 'glyphicon glyphicon-remove-circle';
    }
  },

  render() {
    return (<div>
      <button className={this.getStyleClass()} onClick={this.handleClickAnswer}
        disabled={this.props.select} 
      >
        <span className={this.getIcon()}></span>
        {this.props.text}
      </button>
    </div>);
  }
});
