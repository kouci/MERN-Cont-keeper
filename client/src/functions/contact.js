import axios from "axios";


export const addContactDb  = async (data) =>{
 const config ={
     hedears :{
         'Content-Type' : 'Application/json'
     }
 }
        return await axios.post('/api/contacts',data,config)
};


export const getContactDb = async () => await axios.get('/api/contacts')

export const deleteContactDb = async (id) => await axios.delete(`/api/contacts/${id}`)

export const updateContactDb = async (contact) => {
    const config ={
        headers : {
            'Content-type' : 'Application/json'
        }
    }
    return await axios.put(`/api/contacts/${contact._id}`,contact,config)
}
