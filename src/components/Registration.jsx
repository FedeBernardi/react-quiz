require('../css/formStyle.css');

import React from 'react';
import Button from './Button';
import registerUser from '../action_creators.js';

export default React.createClass({
  displayName: 'Registration',


  getInitialState() {
      return {
          usernameInput : '',
          passwordInput : '',
          repPasswordInput : '',
          //State codes:
          //  0 = first render,
          //  1 = incorrect input,
          //  2 = correct input
          stateUsername: 0,
          statePassword: 0,
          stateRepPassword: 0,
          disabledSubmition: true,
          submitionMsg: ''
      };
  },

  componentDidUpdate(prevProps, prevState) {
    this.checkSubmitionState();
  },

  handleUsernameInput(e){
    this.setState({usernameInput : e.target.value});
  },

  handlePasswordInput(e){
    this.setState({passwordInput : e.target.value});
  },

  handleRepPasswordInput(e){
    this.setState({repPasswordInput : e.target.value});
  },

  //Checks if the form can be submited by adding the codes of the inputs error
  //messages. If all inputs are okay then the total will be 6 and the button will
  //be enabled. In order to avoid infinite loops in the life cycle, before update the
  //state we check if we need to do it.
  checkSubmitionState(){
    if(this.state.stateUsername + this.state.statePassword + this.state.stateRepPassword != 6) {
      if(!this.state.disabledSubmition){
        this.setState({disabledSubmition : true});
      }
    }
    else if(this.state.disabledSubmition){
      this.setState({disabledSubmition : false});
    }
  },

  //This function is executed when the component is rendered and returns the corresponding
  //function that handles the error messages of the input when the user
  //loses the focus of it.
  onBlurEvent(type){

    switch(type){
      case 'username':
        return (e) => {
          if(e.target.value.length < 6){
            this.setState({stateUsername : 1});
          }
          else{
            this.setState({stateUsername : 2});
          }
        }
      case 'password':
        return (e) => {
          if(e.target.value.length < 6){
            this.setState({statePassword : 1});
          }
          else{
            this.setState({statePassword : 2})
          }
        }
      case 'repPassword':
        return (e) => {
          if(e.target.value != this.state.passwordInput){
            this.setState({stateRepPassword : 1});
          }
          else{
            this.setState({stateRepPassword : 2});
          }
        }
    }        
  },

  // @todo: make the call of the function 'registerUser' and
  // apply the callbacks to the promise.
  handleRegistrationClick() {
    if(true){
      this.setState({submitionMsg : 'Successfuly registered!'});
      setTimeout(() =>{
        this.props.history.push('/');
      }, 1000);
    }
    else{
      this.setState({submitionMsg : 'There was a problem with the registration :('});
    }
  },

  render() {
    return (
      <div className='form'>
        <h2 className='title'>Registration</h2>
        <label htmlFor='username' className='form-label'>Username </label>
        <input id='username' type='text'
          className='form-input' onChange={this.handleUsernameInput}
          onBlur={this.onBlurEvent('username')} />
        <ul>
          <li id='hiddenMsgUsername'>
            {this.state.stateUsername == 1 ? 'Username must be between 6 and 15 characters.' : ''}
          </li>
        </ul>

        <label htmlFor='password' className='form-label'>Password </label>
        <input id='password' type='password'
          className='form-input' onChange={this.handlePasswordInput}
          onBlur={this.onBlurEvent('password')} />
        <ul>
          <li id='hiddenMsgPassword'>
            {this.state.statePassword == 1 ? 'Password must be between 6 and 15 characters.' : ''}
          </li>
        </ul>

        <label htmlFor='repeatedPassword' className='form-label'>Repeated Password </label>
        <input id='repeatedPassword' type='password'
          className='form-input' onChange={this.handleRepPasswordInput}
          onBlur={this.onBlurEvent('repPassword')} />
        <ul>
          <li id='hiddenMsgRepPassword'>
            {this.state.stateRepPassword == 1 ? 'Passwords must be the same.' : ''}
          </li>
        </ul>

        <Button text='Create account !' onHandleButtonClick={this.handleRegistrationClick} 
          disabled={this.state.disabledSubmition} />

        <h2 className='successfulMsg'>{this.state.submitionMsg}</h2>
      </div>
    );
  }
})
