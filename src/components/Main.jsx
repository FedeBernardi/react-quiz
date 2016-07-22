import React from 'react';
import { connect } from 'react-redux';
import { LogIn } from './LogIn';
import * as actionCreators from '../action_creators';

export const Main = React.createClass({
  displayName: 'Main',
  
  render(){
    return (
      <div>
        <LogIn {...this.props} />
        {/*<div className='footer navbar navbar-default navbar-fixed-bottom'>
          <a href='#/demo'>Components Demo</a>
        </div>*/}
      </div>
    );
  }
});

function mapStateToProps(state){
  return {
    errorMessage: state.getIn(['auth','errorMessage'])
  };
}

export const MainContainer = connect(mapStateToProps, actionCreators)(Main);
