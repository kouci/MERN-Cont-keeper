import {createStore, combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import contactReducer from './contactReducer'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','contacts','alerts']
}

const rootReducer = combineReducers({
    user :authReducer,
    contacts: contactReducer,
    alerts: alertReducer,
    
})

const persistAll = persistReducer(persistConfig,rootReducer )



export const store = createStore(persistAll,composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)

export default  {store, persistor}

