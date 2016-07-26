require('../css/formStyle.css');

import React from 'react';
import Button from './Button';
import { registerUser } from '../action_creators.js';

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
          //submitionMsg[0] = Message
          //submitionMsg[1] = cssClass
          submitionMsg: ['','']
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

  //When the user clicks, first we verify if the form can be submited.
  //If it can, then we send an object with form's fields to the function
  //that makes the call to the API. If it is successful the user sees a message
  //and is redirected to the login page. If not another message is shown.
  handleRegistrationClick() {
    if(!this.state.disabledSubmition){
      let creds = {
        username: this.state.usernameInput,
        password: this.state.passwordInput
      };

      registerUser(creds).then( () => {
        this.setState({submitionMsg : ['Successfuly registered!', 'successfulMsg']});
        setTimeout(() =>{
          this.props.history.push('/');
        }, 1000);
      },
        () => {
          this.setState({submitionMsg : ['There was a problem with the registration :(', 'generalError']});
        }
      )
    }
  },

  //This function is the callback executed by the Cancel button,
  //just redirecting to the login page.
  handleCancelClick(){
    this.props.history.push('/');
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

        <div className='centeredElement'>
          <Button text='Cancel' displayAs='lined' buttonType='btn-danger'
            onHandleButtonClick={this.handleCancelClick} />
          <Button text='Create account !' displayAs='lined' buttonType='btn-success'
            onHandleButtonClick={this.handleRegistrationClick}
            disabled={this.state.disabledSubmition} />
        </div>

        <h2 className={this.state.submitionMsg[1]}>{this.state.submitionMsg[0]}</h2>
      </div>
    );
  }
})
