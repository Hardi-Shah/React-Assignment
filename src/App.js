import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import PageList from './Components/PageList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <PageList/>
    </div>
  );
}
export default App;
