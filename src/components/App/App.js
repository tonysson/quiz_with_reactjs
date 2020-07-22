import React from 'react';
import {BrowserRouter as Router , Switch , Route  } from 'react-router-dom';
import '../../App.css'
import Header from './../Header/Header';
import Landing from './../Landing/Landing';
import Footer from '../Footer/Footer';
import Welcome from '../Welcome/Welcome';
import Login from './../Login/Login';
import SignUp from '../SignUp/SignUp';
import ErrorPage from '../Error/ErrorPage';
import ForgetPassword from './../ForgetPassword/ForgetPassword';
import {IconContext} from 'react-icons'





function App() {
  return (
    <Router >
      <IconContext.Provider value = {{ style : {verticalAlign:'middle'}}}>
        <Header/>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forget-password" component={ForgetPassword} />
            <Route  component={ErrorPage} />
        </Switch>
        <Footer/>
     </IconContext.Provider>
    </Router>
  );
}

export default App;
