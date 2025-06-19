import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

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

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('F1', 'Ballerina', 'SUperman')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("F1",'Ballerina')
                }),
                entries: List.of('Superman')
            }));
        });
    });

    describe('vote', () => {
        it('creates tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('F1', 'Ballerina'),
                    tally: Map({
                        'F1': 1
                    })
                }),
                entries: List()  
            });
            const nextState = vote(state, 'F1');
            expect(nextState).to.equal(Map({
                vote:Map({
                    pair: List.of('F1','Ballerina'),
                    tally: Map({
                        'F1': 1
                    })
                }),
                entries: List()
            }));
        });

        it('adds to existing tally', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('F1', 'Ballerina'),
                    tally: Map({
                        'F1': 2,
                        'Ballerina': 2
                    })
                }),
                entries: List()  
            });
            const nextState = vote(state, 'F1');
            expect(nextState).to.equal(Map({
                vote:Map({
                    pair: List.of('F1','Ballerina'),
                    tally: Map({
                        'F1': 3,
                        'Ballerina':2
                    })
                }),
                entries: List()
        }));
    });
    });
});