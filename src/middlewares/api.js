import axios from 'axios';

//@TODO:
//  Add the token to as data to send to the API.
function callApi (config) {
  //We are not using this for the moment, but in the future
  //we will need it to make the request.
  let token = localStorage.getItem('id_token') || null

  return axios(config)
    .then((response) => {
      if(response.status === 200){
        return response.data;
      }
      else {
        return Promise.reject();
      }
    })
}

export default store => next => action =>{
  //This evaluates if the action needs to call the API
  //to do his job. If not, the action is executed. 
  if (!action.callApi) {
    return next(action);
  }

  let { config, types } = action.callApi
  
  const [ requestType, successType, errorType ] = types

  if(requestType != null){
    next({type: requestType});
  }

  return callApi(config).then(
    response => 
      next({
        type: successType,
        data: response
    }),
    error =>
      next({
        type: errorType,
        data: error.message || 'There was an error'
    })
  );

}