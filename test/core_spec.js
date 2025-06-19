import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

describe('application logic', () =>{
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('F1', 'Ballerina');
            const nextState = setEntries(state, entries);
            expect(nextState).to.eql(Map({
                entries: List.of('F1', 'Ballerina')
            }));
        });
        it('converts to immutable', () => {
            const state = Map();
            const entries =['F1', 'Ballerina'];
            const nextState = setEntries(state, entries);
            expect(nextState.to.equal(Map({
                entries: List.of('F1', 'Ballerina')
            })));
        });
    });
});