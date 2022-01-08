import './App.css';
import {Fragment} from 'react'
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { PrivateRoute } from './routing/PrivateRoute';
import {PersistGate} from'redux-persist/integration/react'




const  App = () => {
  return (
    <Provider store={store}>

    <Fragment>
    <BrowserRouter>
    <PersistGate persistor={persistor} >
      <NavBar title="ContactKeeper" icon='fas fa-id-card-alt' />
      <div className="container">
      <Alert />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
        </div> 
        </PersistGate>  
      </BrowserRouter> 
    
    </Fragment>
    </Provider>
   
  );
}

export default App;
