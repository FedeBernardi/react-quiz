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

export function request(){
  return {
    type: 'REQUEST'
  };
}

export function logInSuccess(token){
  return {
    type: 'LOGIN_SUCCESS',
    token
  };
}

export function logInFailure(error){
  return {
    type: 'LOGIN_FAILURE',
    error
  };
}
