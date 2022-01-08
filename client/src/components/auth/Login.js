import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login,authRegister } from '../../functions/auth';
import setAuthToken from '../../utils/setAuthToken';

const Login = () => {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);    
    const errors = useSelector((state) => state.user.error);

    const dispatch = useDispatch();

    const history = useHistory()
    useEffect(() => {
        if(isAuthenticated){
            dispatch({type: 'CLEAR_ERROR'})
            history.push('/')
            
        }
        if(errors){
           setAlert(errors,'danger',5000)
        }
    
    },[errors,isAuthenticated,history]) 

    const [user, setUser] = useState({
        email : '',
        password: '',
    })

    const setAlert = (msg,type,timeout) => {
        dispatch({
            type: 'SET_ALERT',
            payload: {
                msg: msg, type: type}
        });
        setTimeout(()=> dispatch({type: 'REMOVE_ALERT'}), timeout)
    } 
    const {email,password} = user

    const onChange = e => 
        setUser({...user, [e.target.name] : e.target.value});

        const loadUser = () =>{
            if(localStorage.token){
                setAuthToken(localStorage.token)
            }
            
            authRegister().then(res =>{
              dispatch({
                  type:'USER_LOADED',
                  payload: res.data
              })
            })
            .catch(err =>{
                dispatch({
                    type:'AUTH_FAIL',
                    payload: err.response.msg
                })
            })
        }

    const onSubmit = e => {
        e.preventDefault()
       if(email === '' || password === ''){
           setAlert('Pleas fill in  fields','danger', 5000)
       }else{
           login({email,password}).then(res =>{
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data
                });
                loadUser()

           })
           .catch(err => {
            dispatch({
                type: 'LOGIN_FAIL',
                payload:err.response.data.msg
            })
           })
       }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor='email'>Email :</label>
                <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor='password'>Password :</label>
                <input type="password" name="password" value={password} onChange={onChange} />
            </div>
            <input type='submit' value="Register" className='bt btn-primary btn-block' />
            </form> 
        </div>
    )
}

export default Login
