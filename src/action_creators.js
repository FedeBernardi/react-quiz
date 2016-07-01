import axios from 'axios';

const BASE_URL = 'http://localhost:3002';

export function setEntries(entries){
  return {
    type: 'SET_ENTRIES',
    entries
  };
}

export function startGame(user){
  return {
    type: 'START_GAME',
    user
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
    type: 'REQUEST'
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

//@TODO:
//  Add the credentials to the API call as data.
export function loginUser(creds){
  let config = {
    baseURL: BASE_URL,
    url: '/tokens/0',
    method: 'GET',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
  }

  return (dispatch) => {
    dispatch(requestLogin());
    return axios(config)
      .then(response => {
        if(response.status === 200) {
          dispatch(loginSuccess(creds.user));

          //Persisting Token in Local Storage
          let token = JSON.stringify(response.data.token)
          localStorage.setItem('id_token', token);
        }
        else {
          dispatch(loginFailure(response.error));
          return Promise.reject();
        }
      }).catch(err => console.log("Error: ", err))
  }
}
