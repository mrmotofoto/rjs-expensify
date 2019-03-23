import React from 'react';
import { connect } from 'react-redux';
import ExpeneseForm from './ExpenseForm';
import { editExpenseAction,removeExpenseAction } from '../actions/expenses';

const EditExpensePage = (props) =>  {
  return (
    <div>
      <ExpeneseForm 
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(editExpenseAction(props.expense.id, expense));
          props.history.push('/');
        }}
      />
      <button onClick={() => {
        props.dispatch(removeExpenseAction({id: props.expense.id}))
        props.history.push('/');
      }}>Removes</button>
    </div>
  )
};


const mapStateToProps = (state, ownProps) => {
return  {
  expense: state.expenses.find((expense) => {
    return expense.id === ownProps.match.params.id;
  })
}
}
export default connect(mapStateToProps)(EditExpensePage);