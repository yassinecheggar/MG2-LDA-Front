
import './App.css';
import SignIn from './components/account/SignIn'


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
