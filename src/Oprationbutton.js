import React from 'react'
import { ACTION } from './App'

function Oprationbutton({dispatch,opration}) {
  return (
    <button onClick={()=> dispatch({type:ACTION.CHOOSE_OPERATION, paylode: {opration}})}>
        {opration}
    </button>
  )
}

export default Oprationbutton;