const { expect } = require('chai');
const { List, Map } = require('immutable');

const { setEntries, next, vote } = require('../src/core.js');

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
                entries: List.of('F1', 'Ballerina', 'Superman', 'MI7')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("F1",'Ballerina')
                }),
                entries: List.of('Superman', 'MI7')
            }));
        });
        it('puts winner of current vote back to entries', () =>{
            const state = Map({
                vote: Map({
                    pair: List.of('F1', 'Ballerina'),
                    tally: Map({
                        'F1':3,
                        'Ballerina':2
                    })
                }),
                entries: List.of('Superman', 'MI7')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Superman', 'MI7')
                }),
                entries: List.of('F1')
            }));
        });
        it('puts both from the tied votes', () =>{
            const state = Map({
                vote: Map({
                    pair: List.of('F1', 'Ballerina'),
                    tally: Map({
                        'F1':3,
                        'Ballerina':3
                    })
                }),
                entries: List.of('Superman', 'MI7')
        });
        const nextState = next(state);
        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Superman', 'MI7')
            }),
            entries: List.of('F1', 'Ballerina')
        }));
        it('marks winner when one entry is left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('F1', 'M1'),
                    tally: Map({
                        'F1':3,
                        'MI7': 4
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'MI7'
            }));
        });
    });
    });

    describe('vote', () => {
        it('creates tally for the voted entry', () => {
            const state = Map({
                pair: List.of('F1', 'Ballerina')
            });
            const nextState = vote(state, 'F1');
            expect(nextState).to.equal(Map({
                
                    pair: List.of('F1','Ballerina'),
                    tally: Map({
                        'F1': 1
                    })
            }));
        });

        it('adds to existing tally', () => {
            const state = Map({
                    pair: List.of('F1', 'Ballerina'),
                    tally: Map({
                        'F1': 2,
                        'Ballerina': 2
                    })
            });
            const nextState = vote(state, 'F1');
            expect(nextState).to.equal(Map({
               
                    pair: List.of('F1','Ballerina'),
                    tally: Map({
                        'F1': 3,
                        'Ballerina':2
                    })
        }));
    });
    
    });
});