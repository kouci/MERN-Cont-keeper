import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { registerUser,authRegister } from '../../functions/auth'
import setAuthToken from '../../utils/setAuthToken';

const Register = () => {
    const dispatch = useDispatch();
    const errors  = useSelector((state) => state.user.error)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const history = useHistory()

    const [user, setUser] = useState({
        name :'',
        email : '',
        password: '',
        password2: ''
    })
    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }
        if(errors){
           setAlert(errors,'danger',5000)
        }
    
    },[errors,isAuthenticated,history])
    
    const {name,email,password,password2} = user;

    const setAlert = (msg,type,timeout) => {
        dispatch({
            type: 'SET_ALERT',
            payload: {
                msg: msg, type: type}
        });
        setTimeout(()=> dispatch({type: 'REMOVE_ALERT'}), timeout)
    } 
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

    const onChange = e => 
        setUser({...user, [e.target.name] : e.target.value});

    const onSubmit = e => {
        e.preventDefault()
        if(name === '' || email === '' || password === ''){
          setAlert('Please enter all fields','danger',5000)

        }else if(password !== password2){
            dispatch({type: 'SET_ALERT',payload:{msg: 'Password do not match',type: 'danger'}
            })
        }else{
               registerUser({name,email,password}).then(res => {
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: res.data,
                })
                loadUser();
               }).catch(err => {
                dispatch({
                    type: 'REGISTER_FAIL',
                    payload: err.response.data.msg
                })
               })
           
        }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor='name'>Name :</label>
                <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor='email'>Email :</label>
                <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor='password'>Password :</label>
                <input type="password" name="password" value={password} onChange={onChange} required minLength={6}/>
            </div>

            <div className="form-group">
                <label htmlFor='name'>Confirm password :</label>
                <input type="password" name="password2" value={password2} onChange={onChange} required  />
            </div>
            <input type='submit' value="Register" className='bt btn-primary btn-block' />
            </form> 
        </div>
    )
}

export default Register
