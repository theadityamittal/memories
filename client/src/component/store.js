import {createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

import reducers from '../reducers'

const reducer = reducers;

const makeStore = createStore(reducer, compose(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, {debug: true});
