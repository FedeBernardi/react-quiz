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

export function loginSuccess(){
  return {
    type: 'LOGIN_SUCCESS'
  };
}

export function loginFailure(error){
  return {
    type: 'LOGIN_FAILURE',
    error
  };
}

//@TODO:
//  This function should recive some credentials to send to the API.
export function loginUser(){
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
          dispatch(loginSuccess());

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
