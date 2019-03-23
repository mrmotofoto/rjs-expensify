import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpenseAction} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';


const store = configureStore();

store.dispatch(addExpenseAction({description: 'Water Bill', amount: 4550}));
store.dispatch(addExpenseAction({description: 'Gas Bill', createdAt: 23000}));
store.dispatch(addExpenseAction({description: 'Food Bill', amount: 550}));
// store.dispatch(setTextFilter(''));

// setTimeout(() => {
//   store.dispatch(setTextFilter('bill')); 
// }, 3000)

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render( jsx, document.getElementById('app'));
