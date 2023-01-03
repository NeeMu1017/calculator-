import React from 'react'
import { ACTION } from './App'

function Digitbutton({dispatch,digit}) {
  return (
    <button onClick={()=> dispatch({type:ACTION.ADD_DIGIT, paylode: {digit}})}>
        {digit}
    </button>
  )
}

export default Digitbutton