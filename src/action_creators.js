import axios from 'axios';

const BASE_URL = 'http://localhost:3001/';

//We don't need this function anymore because we access to
//it from 'fetchQuestions'.
/*export function setEntries(entries){
  return {
    type: 'SET_ENTRIES',
    entries
  };
}*/

export function fetchQuestions (){
  return {
    callApi: {
      config: {
        baseURL: BASE_URL,
        url: '/questions',
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      },
      types: [null, 'SET_ENTRIES', null]
    }

  }
}

export function startGame(){
  return {
    type: 'START_GAME'
  };
}

export function play(id){
  return {
    type: 'PLAY',
    answer: id
  };
}

export function next(){
  return {
    type: 'NEXT'
  };
}

export function setResults(){
  return {
    type: 'SET_RESULTS'
  };
}

export function requestLogin(){
  return {
    type: 'REQUEST_LOGIN'
  };
}

export function loginSuccess(username){
  return {
    type: 'LOGIN_SUCCESS',
    username
  };
}

export function loginFailure(error){
  return {
    type: 'LOGIN_FAILURE',
    error
  };
}

//Makes the call to the API for the login. Sends the credential
//that will be used to verify the existence of the user. If exists
//the state tree is modify and the token returned by the API is stored
//in the localstorage.
//@return: promise.
export function loginUser(creds){
  let config = {
    baseURL: BASE_URL,
    url: 'users/login',
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    data: creds
  };

  return (dispatch) => {
    dispatch(requestLogin());
    return axios(config)
      .then(response => {
        if(!response.data.error) {
          dispatch(loginSuccess(response.data.username));

          //Persisting Token in Local Storage
          let token = JSON.stringify(response.data.token);
          localStorage.setItem('id_token', token);
          return true;
        }
        else {
          dispatch(loginFailure(response.data.error));
          return false;
        }
      });
  }
}

//The function executes the call to the API with the credentials
//of the new user to be stored on the data base.
//@return: promise
export function registerUser(creds){
  let config = {
    baseURL: BASE_URL,
    url: 'users/registration',
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    data: creds
  };

  return axios(config);
}
