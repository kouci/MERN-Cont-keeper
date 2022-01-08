import { GET_CONTACT,ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT,CLEAR_CURRENT,CLEAR_CONTACTS,SET_CURRENT,FILTER_CONTACTS,CLEAR_FILTER,CONTACT_ERROR  } from "./Type";


const initialState = {
contact: null,
current : null,
filtred : null,
loading : false,
error: null
};

const contactReducer = (state=initialState,action) => {
    switch (action.type) {
        case GET_CONTACT:
            return {
                ...state,
                contact: action.payload,
                loading: false
            }
        case ADD_CONTACT: 
        return {
            ...state,
            contact:[...state.contact,action.payload],
            loading: false
        }

        case UPDATE_CONTACT :{
            return {
                ...state,
                contact: state.contact.map(contact =>
                    contact._id === action.payload._id ? action.payload : contact
                ),
                loading: false
            }
        }
        case DELETE_CONTACT:
        return {
            ...state,
            contact: state.contact.filter(contact => contact._id !== action.payload ),
            loading: false
        }
        case SET_CURRENT :
            return {
                ...state,
                current : action.payload
            }
        case CLEAR_CURRENT : {
            return {
                ...state,
                current: null
            }
        }
        case FILTER_CONTACTS : {
            return {
                ...state,
                filtred : state.contact.filter(contact =>{
                const regex = new RegExp(`${action.payload}`, 'gi')
                return contact.name.match(regex) || contact.email.match(regex)
                })
            }

        }
        case CLEAR_FILTER : {
            return {
                ...state,
                filtred : null
            }
        }
        case CONTACT_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case CLEAR_CONTACTS:
            return {
                ...state,
                contact: null,
                filtred: null,
                current: null,
                error:null
            }
        default:
            break;
    }
    return state
}

export default contactReducer