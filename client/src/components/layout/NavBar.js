import React, { Fragment } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'



 const NavBar = ({title,icon}) => {
     const user = useSelector((state) => state.user)
     const dispatch = useDispatch()

     const history = useHistory()

     const onLogout = () => {
        dispatch({type: 'LOGOUT'})
        dispatch({type: 'CLEAR_CONTACTS'});
        history.push('/login')

     }

     const authLinks = (
         <Fragment>
             <li>Hello {user.user && user.user.name }</li>
             <li>
                 <a onClick={onLogout} >
                    Logout
                 </a>
             </li>
         </Fragment>
     );

     const guestLinks = (
         <Fragment>
            <li>
                    <NavLink to='/about'>About</NavLink>
            </li>
             <li>
                    <NavLink to='/register'>Register</NavLink>
            </li>
            <li>
                    <NavLink to='/login'>Login</NavLink>
            </li>
         </Fragment>
     )
    return (
       
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />{title}
            </h1>
            <ul>
               {user.isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    
    )
}

export default NavBar 
