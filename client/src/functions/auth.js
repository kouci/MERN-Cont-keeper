import axios from 'axios'


export const registerUser = async formData => {
    const config = {
        headers:{
            'Content-Type' : 'Application/json'
        }
    }
    return await axios.post('/api/users',formData,config)
  
}

export const authRegister = async () => await axios.get('/api/auth');

export const login = async formData => {
    const config = {
        headers : {
            'Content-Type' : 'Application/json'
        }
    }

    return await axios.post('/api/auth',formData,config)
}