require('../css/formStyle.css');

import React from 'react';
import Button from './Button';
import registerUser from '../action_creators.js';

export default React.createClass({
  displayName: 'Registration',


  getInitialState() {
      return {
          username : '',
          password : '',
          repPassword : '',
          //Error codes:
          //  0 = first render,
          //  1 = incorrect input,
          //  2 = correct input
          errorUsername: 0,
          errorPassword: 0,
          errorRepPassword: 0,
          disabledSubmition: true,
          submitionMsg: ''
      };
  },

  handleUsernameInput(e){
    this.setState({username : e.target.value});
  },

  handlePasswordInput(e){
    this.setState({password : e.target.value});
  },

  handleRepPasswordInput(e){
    this.setState({repPassword : e.target.value});
  },

  //Checks if the form can be submited by adding the codes of the inputs error
  //messages. If all inputs are okay then the total will be 6 and the button will
  //be enabled.
  checkSubmitionState(){
    if(this.state.errorUsername + this.state.errorPassword + this.state.errorRepPassword != 6) {
      this.setState({disabledSubmition : true});
    }
    else{
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
            this.setState({errorUsername : 1});
          }
          else{
            this.setState({errorUsername : 2});
          }
          this.checkSubmitionState();
        }
      case 'password':
        return (e) => {
          if(e.target.value.length < 6){
            this.setState({errorPassword : 1});
          }
          else{
            this.setState({errorPassword : 2})
          }
          this.checkSubmitionState();
        }
      case 'repPassword':
        return (e) => {
          if(e.target.value != this.state.password){
            this.setState({errorRepPassword : 1});
          }
          else{
            this.setState({errorRepPassword : 2});
          }
          this.checkSubmitionState();
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
            {this.state.errorUsername == 1 ? 'Username must be between 6 and 15 characters.' : ''}
          </li>
        </ul>

        <label htmlFor='password' className='form-label'>Password </label>
        <input id='password' type='password'
          className='form-input' onChange={this.handlePasswordInput}
          onBlur={this.onBlurEvent('password')} />
        <ul>
          <li id='hiddenMsgPassword'>
            {this.state.errorPassword == 1 ? 'Password must be between 6 and 15 characters.' : ''}
          </li>
        </ul>

        <label htmlFor='repeatedPassword' className='form-label'>Repeated Password </label>
        <input id='repeatedPassword' type='password'
          className='form-input' onChange={this.handleRepPasswordInput}
          onBlur={this.onBlurEvent('repPassword')} />
        <ul>
          <li id='hiddenMsgRepPassword'>
            {this.state.errorRepPassword == 1 ? 'Passwords must be the same.' : ''}
          </li>
        </ul>

        <Button text='Create account !' onHandleButtonClick={this.handleRegistrationClick} 
          disabled={this.state.disabledSubmition} />

        <h2 className='successfulMsg'>{this.state.submitionMsg}</h2>
      </div>
    );
  }
})
