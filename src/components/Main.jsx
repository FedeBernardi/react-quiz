import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

const Main = React.createClass({
  displayName: 'Main',
  
  render(){
    return (
      <div>
      </div>
    );
  }
});

function mapStateToProps(state){
  return {};
}

export const MainContainer = connect(mapStateToProps, actionCreators)(Main);
