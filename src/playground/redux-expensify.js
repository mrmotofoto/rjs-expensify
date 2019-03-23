import { createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ACTIONS -----------------------------------
const addExpenseAction = (
  {
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0
  } = {}) => {
  return {
    type: 'ADD_EXPENSE',
    expense: {
      id:uuid(),
      description,
      amount,
      createdAt
    }
  }
}

const removeExpenseAction = ({id}) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  }
}

const editExpenseAction = (id, updates) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates
  }
}

const setTextFilter = (text = '') => {
  return {
    type: 'SET_TEXT',
    text
  }
}

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

//REDUCERS ---------------------------------
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE' :
      return [...state, action.expense];
    case 'REMOVE_EXPENSE' :
      return state.filter(({id}) =>  {
        return id !== action.id
      })
    case 'EDIT_EXPENSE': 
      return state.map( (expense) => {
        if(expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      })
    default:
      return state;
  }
}


const filtersReducerDefaultState = {
  text: '', 
  sortBy: 'date', 
  startDate: undefined, 
  endDate: undefined  
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
      case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      } 
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      } 
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }    
    default:
      return state;
  }
}


const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if(sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if(sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1; 
    }
  })
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer 
  })
);


store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses);
});


const expenseOne = store.dispatch(addExpenseAction({description: 'rent', amount: 100, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpenseAction({description: 'food', amount: 250, createdAt: 23000}));
const expenseThree = store.dispatch(addExpenseAction({description: 'pop', amount: 50, createdAt: 1000}));
// store.dispatch(removeExpenseAction({id: expenseOne.expense.id }))
// store.dispatch(editExpenseAction(expenseTwo.expense.id, {amount: 23000}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter('rent'));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate()); 

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1200));

// STATE ---------------
const demoState = {
  expenses: [{
    id: 'asdadsa',
    description: 'Rent',
    note: 'Rent Payment Final',
    amount: 1200,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
}

