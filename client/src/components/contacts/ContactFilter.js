import React,{useRef,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';


export const ContactFilter = () => {
    const dispatch = useDispatch();
    const filtred = useSelector((state) => state.contacts.filtred)
    const text = useRef('');
    useEffect(()=>{
        if(filtred === null){
            text.current.value =''
        }
    })
    const onChange = e => {
      if(text.current.value !== ''){
        dispatch({type: 'FILTER_CONTACTS', payload: e.target.value})
      }else{
          dispatch({type: 'CLEAR_FILTER'})
      }

    }
    return (

        <form>
            <input ref={text} type="text" placeholder="Filter contacts" onChange={onChange} />
        </form>
    )
}
