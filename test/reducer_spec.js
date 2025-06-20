import { Map, fromJS } from "immutable";
import { expect } from "chai";
import reducer from "../src/reducer";

describe('reducer', () =>{
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['F1']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['F1']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entires: ['F1', 'Ballerina']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['F1', 'Ballerina']
            },
            entries: []
        }));

    });
    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['F1', 'Ballerina']
            },
            entries : []
        });
        const action = {type: 'VOTE', entry: 'F1'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['F1', 'Ballerina'],
                tally: {
                    F1:1
                }
            },
            entries: []
        }));
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['F1']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['F1']
        }));
    });
    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['F1', 'MI7']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'F1'},
            {type: 'VOTE', entry: 'MI7'},
            {type: 'VOTE', entry: 'MI7'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'MI7'
        }));
    })
});