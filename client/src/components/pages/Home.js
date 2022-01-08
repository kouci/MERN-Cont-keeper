import React,{useEffect} from 'react'
import Contact from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import { ContactFilter } from '../contacts/ContactFilter';
import { useDispatch,useSelector } from 'react-redux';


const Home = () => {
   const dispatch =  useDispatch()
   const errors = useSelector(state => state.user.error)
    useEffect(() => {
       if(errors)
       dispatch({type:'REMOVE_ALERT'})
    }, [])
    
    return (
        <div className="grid-2">
            <div className="">
             
             <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contact / >
            </div>
        </div>
    )
};

export default Home
