import React from 'react';

import { LogIn } from './LogIn';
import Header from './Header';
import Question from './Question';
import { Answer } from './Answer';

export default React.createClass({
  displayName: 'Demo',

  render() {
    return (
      <div>
        <ul>
          <li><a href='#header-component'>{"Header"}</a></li>
          <li><a href='#login'>{"LogIn"}</a></li>
        </ul>
        <div id='header-component' className='component-demo'>
          <h3>{"Header"}</h3>
          <div className='javascript'>
            {"<Header appName='name' />"}
          </div>
          <Header appName='React Quiz' />
        </div>
        <div id='login-component' className='component-demo'>
          <h3>{"LogIn"}</h3>
          <div className='javascript'>
            {"<LogIn />"}
          </div>
          <LogIn />
        </div>          
        <div id='answer-component' className='component-demo'>
          <h3>{"Answer"}</h3>
          <div className='javascript'>
          {"<Answer text='answerText' id='answerIndex' play='action' />"}
          </div>            
          <Answer text="I'm the Answer's text!" select={false} />
        </div>
        <div id='question-component' className='component-demo'>
          <h3>Question</h3>
          <div className='javascript'>
            {"<Question questionText='Is this a question?' />"}
          </div>
          <Question questionText='Is this a question?' />
        </div>
      </div>
    );
  }
});
