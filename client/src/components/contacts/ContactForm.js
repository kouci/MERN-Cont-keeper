import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { addContactDb, updateContactDb } from '../../functions/contact';




const ContactForm = () => {
    const dispatch = useDispatch();
    const current = useSelector((state) => state.contacts.current)
    const [go, setGo] = useState(true)
    const [contact,setContact] = useState({

        _id: '',
        name: '',
        email: '',
        phone: '',
        type:'personal'
    })

    const {name,email,phone,type} = contact;


    useEffect( () =>{
        if(current !== null){
            setContact(current)
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type:'personal'
            });
        }
    },[current])

    const AddContact = ()   => {
        addContactDb(contact).then(res => {
            dispatch({
                type: "ADD_CONTACT",
                payload:res.data
            })
            setContact({
                name: '',
                email: '',
                phone: '',
                type:'personal'
            });
        }).catch(err => {
            dispatch({
                type:'CONTACT_ERROR',
                payload: err.response.data.msg
            })
        })
      
    }

 


    const onChange = e => 
        setContact({...contact, [e.target.name]: e.target.value})
    const onSubmit = e =>{
        e.preventDefault();
        if(current){
            updateContactDb(contact).then(res => {
            dispatch({type: 'CLEAR_CURRENT'})
            dispatch({type:'UPDATE_CONTACT', payload: res.data})
            e.preventDefault()
            }).
            catch(err => {

            })
            
        }else{
            if(contact){
                setGo(false)
                console.log(go)
           }
           AddContact()
        }
     

    }
    
    return(
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add contact'}</h2>
            <input type="text" placeholder="Name" value={name} onChange={onChange} name="name" />
            <input type="email" placeholder="Email" value={email} onChange={onChange} name="email" />
            <input type="text" placeholder="Phone" value={phone} onChange={onChange} name="phone" />
            <h5>Contact Type</h5>
            <input type="radio" name="type"  value="personal"  checked={type ==="personal"} onChange={onChange} />Personnal {''}
            <input type="radio" name="type"  value="professional"  checked={type ==="professional"} onChange={onChange}/> Professional {''}
            <div>
                <input type="submit" disabled={!email || !name} value={current ? 'Edit Contact' : 'Add contact'} className="btn btn-primary btn-block" />
            </div>
        </form>
    )
        
}

export default ContactForm
