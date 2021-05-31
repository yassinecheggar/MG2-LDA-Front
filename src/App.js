import logo from './logo.svg';
import './App.css';
import SignIn from './components/account/SignIn'
import Dashboard from './components/Dashboard/Dashboard'

import {  BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
    <>
   
    
    <Route path="/" component={SignIn} exact/>
    <Route path="/Home" component={Navbar} />
    
    
    </>

    </Router>
  );
}

export default App;
