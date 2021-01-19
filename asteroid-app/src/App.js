import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import Landing from './Components/landing';
import AsteroidDetail from './Components/details'

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing}>
        </Route>
        <Route exact path='/details' component={(props)=>{return <AsteroidDetail {...props}/>}}>

        </Route>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
