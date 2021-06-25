import React, { Suspense, lazy } from 'react';
import './App.css';
import SignIn from './components/account/SignIn'




import {  BrowserRouter as Router, Route, Switch  } from 'react-router-dom';

const Home2 = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./components/Navbar/NavbarUser'));

function App() {
  return (
    <Router>
    <Suspense fallback={<div className="container "><h1 className="center">Loading  please wait ....</h1> </div>}>
    <Route path="/" component={SignIn} exact/>
    
    <Route path="/Home2" component={Home2} />
    <Route path="/Home" component={Home} />
    
    </Suspense>

    </Router>
  );
}

export default App;
