import logo from './logo.svg';
import './App.css';
import SignIn from './components/account/SignIn'
import Dashboard from './components/Dashboard/Dashboard'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
    <>
   
    <Switch>
    <Route path="/" component={SignIn} exact/>
    <Route path="/Home" component={Navbar} exact/>
    </Switch>
    
    </>

    </BrowserRouter>
  );
}

export default App;
