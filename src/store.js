import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';

export default function makeStore() {
    return configureStore({
        reducer: reducer
    });
}

