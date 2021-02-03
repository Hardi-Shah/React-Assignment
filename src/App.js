import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageList from './Components/PageList.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={PageList} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
