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
    history: React.PropTypes.object,
    setEntries: React.PropTypes.func,
    startGame: React.PropTypes.func,
    userName: React.PropTypes.string
  },

  handlePlayAgainButtonClick(){
    const user = this.props.userName;
    this.props.setEntries(entries);
    this.props.startGame(user);
    this.props.history.push('/game');
  },

  handleLogInButtonClick(){
    this.props.history.push('/');
  },

  render() {
    return (
      <div className='main container-fluid'>
        <Header appName='React Quiz' />
        <div className='resultText'>
          <h1>You finished the game !</h1>
          <h2>Final score:</h2>
          <h3>{this.props.tally}/6</h3>
        </div>
        <div>
          <Button text='Play Again!' onHandleButtonClick={this.handlePlayAgainButtonClick} />
          <Button text='Go to Log In' onHandleButtonClick={this.handleLogInButtonClick} />
        </div>
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    tally: state.getIn(['app','game', 'tally']),
    userName: state.getIn(['app','game', 'user'])
  };
};

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
