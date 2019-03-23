import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import AddExpensePage from '../components/AddExpense';
import EditExpense from '../components/EditExpense';
import HelpExpense from '../components/HelpExpense';
import NotFound from '../components/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Dashboard}/> 
        <Route path="/create" component={AddExpensePage}/> 
        <Route path="/edit/:id" component={EditExpense}/> 
        <Route path="/help" component={HelpExpense}/> 
        <Route component={NotFound}/> 
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter;