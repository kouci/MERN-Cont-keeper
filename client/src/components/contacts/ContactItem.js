import React from 'react'
import { useDispatch} from 'react-redux'
import { deleteContactDb, updateContactDb } from '../../functions/contact'

const ContactItem = ({contact}) => {
    const dispatch = useDispatch()
    const {_id,name,email,phone,type} = contact

    const setCurrent = (contact)=> {
        dispatch({
            type: 'SET_CURRENT',
            payload: contact
        })


    }
        const onDelete = () =>{
            deleteContactDb(_id)
            dispatch({type: 'DELETE_CONTACT', payload: _id})
        }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}
                <span style={{float: 'right'}} 
                className={
                    'badge' + (type === 'professional' ? ' badge-success' : ' badge-primary')
                }>
                    {type.charAt(0).toUpperCase() +type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && 
                (<li><i className="fas fa-envelope-open"></i>{email}</li> )}
                {phone && 
                (<li><i className="fas fa-phone"></i>{phone}</li> )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={()=> setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

export default ContactItem

