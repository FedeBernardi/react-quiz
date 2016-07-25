require('../css/formStyle.css');

import React from 'react';
import Button from './Button';

export const LogIn = React.createClass({
  displayName: 'LogIn',

  propTypes: {
    history: React.PropTypes.object,
    fetchQuestions: React.PropTypes.func,
    startGame: React.PropTypes.func
  },

  getInitialState() {
    return {
      userText: '',
      passText: ''
    };
  },

  //The function decides if the user can continue
  //taking in count if the username input was filled,
  //also executes the action to set the entries and start the game.
  handlePlayClick(){
    if (this.state.userText && !this.flagToPlay) {
      this.props.loginUser({username: this.state.userText, password: this.state.passText})
        .then((response) => {
          if(response){
            this.props.fetchQuestions()
              .then(() => {
                this.props.startGame();
                this.props.history.push('/game');
            }, () => {
                alert('Connection Error');
            });
          }
        });
    }
  },

  handleRegistrationClick(){
    this.props.history.push('/registration');
  },

  //@params: e: Object
  //The function set the user input in a state
  handlePassInput(e){
    this.setState({ passText: e.target.value });
  },

  //@params: e: Object
  //The function set the user input in a state
  handleTextInput(e) {
    this.setState({ userText: e.target.value });
  },

  render() {
    return (
      <div className='form'>
        <div className='row'>
          <div className='col-md-12'>
            <label className='form-label' htmlFor='userInput'>Username</label>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <input id='userInput' className='form-input'
              onChange={this.handleTextInput}
              type='text'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <label className='form-label' htmlFor='passInput'>Password</label>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <input id='passInput' className='form-input'
              onChange={this.handlePassInput}
              type='password'
            />
          </div>
        </div>
        {this.props.errorMessage ? <div className='errorMsg fadeInUp '>{this.props.errorMessage}</div> : ''}
        <Button text='Play !' onHandleButtonClick={this.handlePlayClick} />
        <Button text='Registration' onHandleButtonClick={this.handleRegistrationClick} />
      </div>);
  }
});
