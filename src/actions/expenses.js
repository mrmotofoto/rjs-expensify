import uuid from 'uuid';

export const addExpenseAction = (
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

export const removeExpenseAction = ({id}) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  }
}

export const editExpenseAction = (id, updates) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates
  }
}