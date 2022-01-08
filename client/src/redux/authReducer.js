import axios from "axios";
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_FAIL,
     LOGIN_FAIL, 
     LOGOUT,
     CLEAR_ERROR, 

} from "./Type";

const initialState = {
     token : localStorage.getItem('token'),
     isAuthenticated : null,
     loading : true,
     user: null,
     error: null
}

const authReducer = (state=initialState,action) => {
    switch (action.type) {
        case USER_LOADED : {
            return {
                ...state,
                isAuthiticated : null,
                user: action.payload,
                loading : false
            }
        }

        case  REGISTER_SUCCESS:
        case LOGIN_SUCCESS:{
            localStorage.setItem('token',action.payload.token)
            return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false
            };
        }
         
        case  REGISTER_FAIL:
        case  AUTH_FAIL : 
        case  LOGIN_FAIL:
        case  LOGOUT :     {
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading : false,
                error: action.payload
            }
        }
        case CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }

        default: return state
            
    }
}

export default authReducer