import rootReducer from '../reducers';
import { createStore } from 'redux';

const option = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(
    rootReducer,
    option
);