import React, {  useReducer } from 'react';
import "./style.css"
import Digitbutton from './Digitbutton';
import Oprationbutton from './Oprationbutton';

export const ACTION = {
  ADD_DIGIT: 'add_digit',
  CHOOSE_OPERATION: 'choose_opreartion',
  DELETE_DIGIT: 'delete_digit',
  CLEAR: 'clear',
  EVALUATE: 'evaluate',

}

function reducer(state, { type, paylode }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (state.overwrite){
        return{
          ...state,
          currentoprand:paylode.digit,
          overwrite: false,

        }
      }
      
      if (paylode.digit === "0" && state.currentoprand === "0") return state
      if (paylode.digit === "." && state.currentoprand.includes('.')) return state
      return {
        ...state,
        currentoprand: `${state.currentoprand || ""}${paylode.digit}`
      }
    case ACTION.CHOOSE_OPERATION:
      if (state.currentoprand == null && state.previouseoprand == null) {
        return state
      }
    if (state.currentoprand == null){
      return{
        ...state,
        opration : paylode.opration
      }
    }
      if (state.previouseoprand == null) {
        return {
          ...state,
          
          opration: paylode.opration,
          previouseoprand: state.currentoprand,
          currentoprand: null

        }

      }
      return {
        ...state,
        
        previouseoprand: evaluate(state),
        opration : paylode.opration,
        currentoprand :null
      }
    case ACTION.CLEAR:
      return {}
    case ACTION.EVALUATE:
      if (state.opration == null || state.previouseoprand== null|| state.currentoprand== null){
        return state
      }
      return{
        ...state,
        previouseoprand : null,
        opration : null,
        overwrite : true,
        currentoprand: evaluate(state),
      }
    case ACTION.DELETE_DIGIT:
      if (state.overwrite) return{}
      if (state.currentoprand == null) return state
      if (state.currentoprand === 1){
        return{
          ...state,
          currentoprand : null
        }
      }
      return{
        ...state,
        currentoprand:state.currentoprand.slice(0,-1)
      }
  }

}

function evaluate({previouseoprand, currentoprand, opration}) {
  const prev = parseFloat(previouseoprand);
  const current = parseFloat(currentoprand);
  if (isNaN(prev) || isNaN(current)) return ""
  let coputation = '';

  switch (opration) {
    case '+':
      coputation = prev + current;
      break;
    case '-':
      coputation = prev - current;
      break;
    case '*':
      coputation = prev * current;
      break;
    case '÷':
      coputation = prev / current;
      break;
    

  }
  return coputation.toString()
}
const INTGER_FROMATE  = new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0
})

function fromateOparated(oprate){
  if(oprate ==null) return
  const [intger ,disimal] = oprate.split('.');
  if (disimal == null) return INTGER_FROMATE.format(intger);
  return `${ INTGER_FROMATE.format(intger)}.${disimal}`

}
function App() {
  const [{ previouseoprand, currentoprand, opration }, dispatch] = useReducer(reducer, {})



  return (
    <div className="calculator-grid">
      <div className="output" >
        <div className='previous' >{fromateOparated(previouseoprand)}{opration} </div>
        <div className="current">{fromateOparated (currentoprand)}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: ACTION.CLEAR })}>AC</button>
      <button onClick={()=> dispatch({type: ACTION.DELETE_DIGIT}) }>Del</button>

      <Oprationbutton opration='÷' dispatch={dispatch} />
      <Digitbutton digit="1" dispatch={dispatch} />
      <Digitbutton digit="2" dispatch={dispatch} />
      <Digitbutton digit="3" dispatch={dispatch} />
      <Oprationbutton opration='*' dispatch={dispatch} />
      <Digitbutton digit="4" dispatch={dispatch} />
      <Digitbutton digit="5" dispatch={dispatch} />
      <Digitbutton digit="6" dispatch={dispatch} />
      <Oprationbutton opration='+' dispatch={dispatch} />
      <Digitbutton digit="7" dispatch={dispatch} />
      <Digitbutton digit="8" dispatch={dispatch} />
      <Digitbutton digit="9" dispatch={dispatch} />
      <Oprationbutton opration='-' dispatch={dispatch} />
      <Digitbutton digit="0" dispatch={dispatch} />
      <Digitbutton digit="." dispatch={dispatch} />
      <button className='span-two'onClick={()=>dispatch({type:ACTION.EVALUATE})} > = </button>
    </div>
  );
}

export default App;
