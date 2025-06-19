import {expect} from 'chai';
import Immutable from 'immutable';
const { List } = Immutable;

describe('immutability', () => {
    describe('a number', () => {
        function increment(currentState){
            return currentState + 1;
        }
        it('is immutable', () =>{
            let state = 42;
            let nextState = increment(state);
            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });

    
    });

    describe('A List', () => {
        function addMovie(currentState, movie){
            return currentState.push(movie);
        }
        it('is immutable', () => {
            let state = List.of('F1', 'Ballerina');
            let nextState = addMovie(state, 'Superman');

            expect(nextState).to.eql(List.of(
                'F1',
                'Ballerina',
                'Superman'
            ));
            expect(state).to.eql(List.of(
                'F1',
                'Ballerina'
            ));
        });
    });

    describe('a tree', () => {
        function addMovie(currentState, movie){
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('F1', 'Ballerina')
            });
            let nextState = addMovie(state, 'Superman');

            expect(nextState).to.eql(Map({
                movies: List.of(
                    'F1',
                    'Ballerina',
                    'Superman'
                )
            }));
            expect(state).to.eql(Map({
                movies: List.of(
                    'F1',
                    'Ballerina'
                )
            }));
        });
    });
});