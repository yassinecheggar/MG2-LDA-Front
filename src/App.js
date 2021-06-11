
import './App.css';
import SignIn from './components/account/SignIn'


import {  BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NavbarUser from  './components/Navbar/NavbarUser';

function App() {
  return (
    <Router>
    <>
    <Route path="/" component={SignIn} exact/>
    <Route path="/Home2" component={Navbar} />
    <Route path="/Home" component={NavbarUser} />
    
    </>

    </Router>
  );
}

export default App;
