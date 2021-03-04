import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import GetReddits from './GetReddits/GetReddits'
import ListFavReddits from './ListFavReddits/ListFavReddits'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

function App() {

  return (
    <Router>
    <div>
         <Switch>
           <Route exact path="/" component={GetReddits}/>
           <Route exact path="/favReddits" component={ListFavReddits}/>

           {/* <Route exact path="/comments/:sub/:parentId" component={Comments} /> */}
         </Switch>
       <div className='app-bottom'></div>
    </div>
    </Router>
  );
}

export default App;
