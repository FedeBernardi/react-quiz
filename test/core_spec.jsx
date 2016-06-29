/* global it, describe */
import { List, Map } from 'immutable';
import { expect } from 'chai';

import { request, logInSuccess, logInFailure, setEntries, startGame, play, next, setResults } from '../src/core';

describe('application logic', () => {

  describe('Log in process', () => {
    
    it('request was sent', () => {
      const state = Map();
      const nextState = request(state);
      expect(nextState).to.equal(Map({
        isFetching: true,
        isAuthenticated: false
      }));
    });

    //This test fails because of Local Storage
    it('login success', () => {
      const state = Map();
      const token = "2354-HGDFD-67"
      const nextState = logInSuccess(state, token);
      expect(nextState).to.equal(Map({
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }));
    });

    it('login failure', () => {
      const state = Map();
      const error = 'The user doesn\'t exists';
      const nextState = logInFailure(state, error);
      expect(nextState).to.equal(Map({
        isFetching: true,
        isAuthenticated: false,
        errorMessage: error
      }));
    });

  });


  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('round1', 'round2');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('round1', 'round2')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['round1', 'round2'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('round1', 'round2')
      }));
    });

    it('check that manage a more real list of entries', () => {
      const state = Map();
      const entries = [
        {
          'question': 'a question',
          'answers': [
            'answer1',
            'answer2',
            'answer2'
          ],
          'correctAnswer': 1
        },
        {
          'question': 'another question',
          'answers': [
            'answer1',
            'answer2',
            'answer2'
          ],
          'correctAnswer': 2
        }
      ];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of(
          Map({
            question: 'a question',
            'answers': List.of(
              'answer1',
              'answer2',
              'answer2'
            ),
            'correctAnswer': 1
          }
        ),
        Map({
          question: 'another question',
          'answers': List.of(
            'answer1',
            'answer2',
            'answer2'
          ),
          'correctAnswer': 2
        })
        )
      }));
    });

  });

  describe('startGame', () => {

    it('set user, tally and initial round when start game', () => {
      const state = Map({
        entries: List.of(
          Map({
            question: 'a question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          }),
          Map({
            question: 'another question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 2
          })
        )
      });
      const user = 'Test User';
      const nextState = startGame(state, user);
      expect(nextState).to.equal(Map({
        entries: List.of(
          Map({
            question: 'another question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 2
          })
        ),
        game: Map({
          round: Map({
            question: 'a question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          }),
          tally: 0,
          user: 'Test User'
        })
      }));
    });

  });

  describe('play', () => {

    it('user select correct answer', () => {
      const stateGame = Map({
        user: 'Test User',
        tally: 0,
        round: Map({
          question: 'a question',
          'answers': List.of(
            'answer1',
            'answer2'
          ),
          'correctAnswer': 1
        })
      });
      const answer = 1;
      const nextState = play(stateGame, answer);
      expect(nextState).to.equal(Map({
        user: 'Test User',
        tally: 1,
        round: Map({
          question: 'a question',
          'answers': List.of(
            'answer1',
            'answer2'
          ),
          'correctAnswer': 1,
          'selectedAnswer': 1
        })
      }));
    });

    it('user select incorrect answer', () => {
      const stateGame = Map({
        user: 'Test User',
        tally: 0,
        round: Map({
          question: 'a question',
          'answers': List.of(
            'answer1',
            'answer2'
          ),
          'correctAnswer': 2
        })
      });
      const answer = 1;
      const nextState = play(stateGame, answer);
      expect(nextState).to.equal(Map({
        user: 'Test User',
        tally: 0,
        round: Map({
          question: 'a question',
          'answers': List.of(
            'answer1',
            'answer2'
          ),
          'correctAnswer': 2,
          'selectedAnswer': 1
        })
      }));
    });

  });

  describe('next', () => {

    it('go to next round!', () => {
      const state = Map({
        entries: List.of(
          Map({
            question: 'another question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 2
          }),
          Map({
            question: 'last question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          })
        ),
        game: Map({
          round: Map({
            question: 'a question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          }),
          tally: 1,
          user: 'Test User'
        })
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of(
          Map({
            question: 'last question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          })
        ),
        game: Map({
          round: Map({
            question: 'another question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 2
          }),
          tally: 1,
          user: 'Test User'
        })
      }));
    });

    it('Last round to play', () => {
      const state = Map({
        entries: List.of(
          Map({
            question: 'another question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 2
          }),
          Map({
            question: 'last question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          })
        ),
        game: Map({
          round: Map({
            question: 'a question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          }),
          tally: 1,
          user: 'Test User'
        })
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of(
          Map({
            question: 'last question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          })
        ),
        game: Map({
          round: Map({
            question: 'another question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 2
          }),
          tally: 1,
          user: 'Test User'
        })
      }));
    });

    it('No more rounds, game end! ', () => {
      const state = Map({
        entries: List(),
        game: Map({
          round: Map({
            question: 'a question',
            'answers': List.of(
              'answer1',
              'answer2'
            ),
            'correctAnswer': 1
          }),
          tally: 5,
          user: 'Test User'
        })
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List(),
        game: Map({
          tally: 5,
          user: 'Test User'
        })
      }));
    });
  });

  describe('setResults', () => {

    it('get Results List', () => {
      const state = Map({
        entries: List(),
        game: Map({
          tally: 5,
          user: 'Test User'
        })
      });
      const nextState = setResults(state);

      expect(nextState.hasIn(['results'])).to.be.true;
      expect(nextState.hasIn(['game'])).to.be.false;
      expect(nextState.hasIn(['entries'])).to.be.false;
      expect(nextState.get('results')).to.have.size.above(0);
    });
  });

});
