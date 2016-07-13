import axios from 'axios';


function callApi (config) {

  //Adding token to header
  let token = JSON.parse(localStorage.getItem('id_token')) || null;
  config.headers.Authorization = `Bearer ${token}`;

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