import React, { Component, useReducer } from 'react';
import "./style.css"
import './App.css';


function reducer(state,action){

}

function App() {
  const [{previouseoprand,currentoprand,opration},dispatch] =useReducer(reducer,{})

  return (
    <div className="calculator-grid">
      <div className="output" >
        <div className='previous' >{previouseoprand}{opration}</div>
        <div className="current">{currentoprand}</div>
      </div>
      <button className='span-two' >AC</button>
      <button>Del</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className='span-two' >=</button>
    </div>
  );
}

export default App;
