import React from 'react';
import Button from './Button';
import { entries } from '../entries';

export const LogIn = React.createClass({
  displayName: 'LogIn',

  propTypes: {
    history: React.PropTypes.object,
    setEntries: React.PropTypes.func,
    startGame: React.PropTypes.func
  },

  getInitialState() {
    return {
      userText: '',
      flagToPlay: true
    };
  },

  //The function decides if the user can continue
  //taking in count if the username input was filled,
  //also executes the action to set the entries and start the game.
  handleButtonClick(){
    if (this.state.userText && !this.flagToPlay) {
      this.props.loginUser({user: this.state.userText});
      this.props.setEntries(entries);
      this.props.startGame();
      // se supone q debo usar this.context.router.push pero no anda :(
      this.props.history.push('/game');
    }
  },

  //@params: e: Object
  //The function set the user input in a state
  //and enables or disables the play button
  //depending on the length of the input
  handleTextInput(e) {
    this.setState({ userText: e.target.value });
    this.setState({ flagToPlay: (e.target.value.length < 4) });
  },

  render() {
    return (
      <div className='login'>
        <div className='row'>
          <div className='col-md-12'>
            <label className='login-label'>Username</label>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <input className='login-input'
              onChange={this.handleTextInput}
              type='text'
            />
          </div>
        </div>
        <Button text='Play !' onHandleButtonClick={this.handleButtonClick}
          disabled={this.state.flagToPlay}
        />
      </div>);
  }
});
