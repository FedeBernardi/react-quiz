import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Question from './Question';
import Tally from './Tally';
import Next from './Next';
import Quit from './Quit';
import { Answer } from './Answer';

import * as actionCreators from '../action_creators';

export const Game = React.createClass({
  displayName: 'Game',

  propTypes: {
    answers: React.PropTypes.object,
    correct: React.PropTypes.number,
    history: React.PropTypes.object,
    play: React.PropTypes.func,
    question: React.PropTypes.string,
    tally: React.PropTypes.number,
    userName: React.PropTypes.string,
    selected: React.PropTypes.number,
    next: React.PropTypes.func
  },

  componentWillUpdate(nextProps){

    if (!nextProps.answers) {
      this.props.history.push('/results');
    }
  },

  setAnswerStyle(id){
    if(this.props.selected){
      if(id == this.props.correct){
        return 'correctAnswer';
      } else if(id == this.props.selected){
        return ('incorrectAnswer');
      }
    }
    return '';
  },

  render() {
    return (
      <div className='main container-fluid'>
        <Header appName='React Quiz' />
        <div className='row'>
          <div className='col-md-6'>
            <p className='user'>Player: {this.props.userName}</p>
          </div>
          <div className='col-md-6'>
            <Quit history={this.props.history} />
            <span className='text-right tally'>
              <Tally total={this.props.tally} />
            </span>
          </div>
        </div>
        <div className='game'>
          <Question questionText={this.props.question} />
          {this.props.answers ? this.props.answers.map( ans =>
            <Answer key={ans.get('id')} id={ans.get('id')}
              text={ans.get('text')} play={this.props.play}
              style={this.setAnswerStyle(ans.get('id'))} select={this.props.selected}
            />
          ) : ''}
        </div>

        {this.props.selected ? <Next next={this.props.next} /> : ''}
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    question: state.getIn(['app','game', 'round', 'question']),
    tally: state.getIn(['app','game', 'tally']),
    userName: state.getIn(['auth', 'user']),
    answers: state.getIn(['app','game', 'round', 'answers']),
    correct: state.getIn(['app','game','round','correctAnswer']),
    selected: state.getIn(['app','game', 'round', 'selectedAnswer'])
  };
};

export const GameContainer = connect(mapStateToProps, actionCreators)(Game);
