import React from 'react';
import {removeExpenseAction} from '../actions/expenses';
import EditExpense from './EditExpense';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({id, description, amount, createdAt}) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h2>{description}</h2>
      </Link>
      <h3>{amount}</h3>
      <h4>{createdAt}</h4>
    </div>
  )
}

export default ExpenseListItem; 
