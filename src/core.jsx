import { Map, List, fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';


/*
* Include entries in state (to use before start a new game)
*/
export function setEntries(state, entries) {
  return state.set('entries', fromJS(entries));
}

/*
* Init tally and first round to star to play
* @param Map state
*/
export function startGame(state) {
  const entries = state.get('entries');
  return state.merge({
    game: Map(
      {
        round: entries.first(),
        tally: 0
      }
    ),
    entries: entries.skip(1)
  });
}

/*
* Take answer selected by player and increment tally if
* answer selected is equal to correctAnswer
* @param Map gameState
* @param integer answer
*/
export function play(gameState, answer) {
  const correctAnswer = gameState.getIn(['round','correctAnswer']);
  const selected = fromJS({
    round: {
      selectedAnswer: answer
    }
  });
  if (correctAnswer === answer) {
    return gameState.updateIn(
        ['tally'],
        tally => tally + 1
      ).mergeDeep(selected);
  }
  return gameState.mergeDeep(selected);
}

/*
* Return next round if exists in entries
* when entries is empty, dont return any round
* @param Map state
*/
export function next(state) {
  const entries = state.get('entries');
  if (entries.size > 0) {
    return state.merge({
      game: Map(
        {
          round: entries.first(),
          tally: state.getIn(['game','tally'])
        }
      ),
      entries: entries.skip(1)
    });
  }
  return state.merge({
    game: Map(
      {
        tally: state.getIn(['game','tally'])
      }
    ),
    entries: List()
  });
}

/*
* Return the only the results list in state.
* For now, we return only the current game result
* Later we have to send this result to server and it returns the complete list
* @param Map state
*/
export function setResults(state) {
  const tallyInGame = state.getIn(['game','tally']);
  if (!state.hasIn(['game','round'])) {
    return Map({
      results: List.of(
        Map(
          {
            tally: tallyInGame
          }
        )
      )
    });
  }
  return state;
}


function app (state = Map(), action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.data);
    case 'START_GAME':
      return startGame(state);
    case 'PLAY':
      return state.update('game', gameState =>
        play(gameState, action.answer)
      );
    case 'NEXT':
      return next(state);
    case 'SET_RESULTS':
      return setResults(state);
    default:
      return state;
  }
}


//AUTH REDUCER
//

export function requestLogin(authState){
  return authState.merge({
    isFetching: true,
    isAuthenticated: false
  });
}

export function loginSuccess (authState, username) {
  return authState.merge({
    isFetching: false,
    isAuthenticated: true,
    user: username,
    errorMessage: ''
  });
}

export function loginFailure (authState, error) {
  return authState.merge({
    isFetching: false,
    isAuthenticated: false,
    errorMessage: error
  });
}


function auth (state = fromJS({
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true: false
}), action){

  switch(action.type) {
    case 'REQUEST_LOGIN':
      return requestLogin(state);
    case 'LOGIN_SUCCESS':
      return loginSuccess(state, action.username);
    case 'LOGIN_FAILURE':
      return loginFailure(state, action.error);
    default:
      return state;
  }

}

export default combineReducers({app, auth});
