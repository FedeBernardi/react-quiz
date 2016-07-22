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
        <a href='#/demo'>Components Demo</a>
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
