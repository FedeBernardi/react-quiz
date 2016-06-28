import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Button from './Button';
import * as actionCreators from '../action_creators';
import { entries } from '../entries';

export const Results = React.createClass({
  displayName: 'Results',

  propTypes: {
    tally: React.PropTypes.number,
    userName: React.PropTypes.string,
    history: React.PropTypes.object
  },
  playAgainButtonClick(){
    const user = this.props.userName;
    this.props.setEntries(entries);
    this.props.startGame(user);
    this.props.history.push('/game');
  },

  logInButtonClick(){
    this.props.history.push('/');
  },

  render: function() {
    return (
      <div className='main container-fluid'>
        <Header appName='React Quiz' />
        <div className='resultText'>
          <h1>You finished the game !</h1>
          <h2>Final score:</h2>
          <h3>{this.props.tally}/6</h3>
        </div>
        <div>
          <Button text='Play Again!' onHandleButtonClick={this.playAgainButtonClick} />
          <Button text='Go to Log In' onHandleButtonClick={this.logInButtonClick}/>
        </div>
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    tally: state.getIn(['game', 'tally']),
    userName: state.getIn(['game', 'user'])
  };
};

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
