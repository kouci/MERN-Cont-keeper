import React, {Fragment,useEffect} from 'react'

import { useSelector,useDispatch} from 'react-redux'

import { getContactDb } from '../../functions/contact'
import ContactItem from './ContactItem'

const Contact = () => {
    const contacts = useSelector((state) => state.contacts.contact);
    const filtred = useSelector((state) => state.contacts.filtred);
    const dispatch = useDispatch();

    useEffect(() => {
       getContacts()
    }, [])

    const getContacts = () => {
        getContactDb().then(res => {
            dispatch({
                type: 'GET_CONTACTS',
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type:'CLEAR_CONTACT',
                payload: err.response.data.msg
            })
        })
    }

    if(contacts !== null && contacts.length === 0){
        return <h4>Please add contact</h4>
    }
    return (
        <Fragment>
         {filtred !== null ? filtred.map(contact => (
             <ContactItem contact={contact} />
         )):
         contacts && contacts.map(contact => (
           
            <ContactItem contact={contact} />
            ))} 
     
        </Fragment>
    )
}

export default Contact