import React from 'react'
import {Route,useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'


export const PrivateRoute = ({component :Component, ...rest}) => {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  
   
    const history = useHistory()
    return (
      <Route {...rest} render = {
        (props) => {
          if(isAuthenticated){
            return <Component {...props}/>
          }else{
            history.push('/login')
          }
          
        }
      } />
    );
}
