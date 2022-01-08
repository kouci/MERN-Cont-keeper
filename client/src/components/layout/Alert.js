import React, { Fragment,useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
const Alert = () => {
    const alerts = useSelector((state) => state.alerts)
 

  

    return (
       <Fragment>
           {alerts.length > 0 && alerts.map(alert =>(
               <div key={alert.id} className={`alert alert-${alert.type}`}>
                   {alert.msg}
               </div>
           ))}
       </Fragment>
    )
}

export default Alert
