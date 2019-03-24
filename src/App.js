import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import Register from './components/users/Register'
import Login from './components/users/Login'
import ContactList from './components/contacts/ContactList';
import ContactNew from './components/contacts/ContactNew';
import ContactShow from './components/contacts/ContactShow';
import ContactEdit from './components/contacts/ContactEdit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
      <h2> Contact Manager App </h2>  
      <Link to='/users/register'> Register </Link> |
      <Link to='/users/login'> Login </Link>

    <Switch>
      <Route path = '/users/register' component = { Register } exact = {true} />
      <Route path = '/users/login' component = { Login } exact = {true} />
      <Route path = '/contacts'  component = {ContactList} exact = {true} />
      {/* new should be first before id */}
      <Route path = '/contacts/new' component = {ContactNew} exact = {true}/>
      <Route path = '/contacts/:id' component = {ContactShow} exact={true} />
      <Route path = '/contacts/edit/:id' component = {ContactEdit} exact = {true}/>
    </Switch>
     
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
