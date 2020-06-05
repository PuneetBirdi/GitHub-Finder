import React from 'react'

export const alert = ({alert}) => {
   return (
      alert !== null &&(
         <div className={`alert alert-${alert.type}`}>
            <i className="fas fa-info-circle">{alert.msg}</i>
         </div>
      )
   )
}

export default alert