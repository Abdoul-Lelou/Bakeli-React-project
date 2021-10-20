import React from 'react'
import './index.css';

const Main = () => {
  const serachClick=()=>{
    const seachContainer = document.getElementById('search');
    const input = document.getElementById('input');
    const divChange = document.querySelectorAll('.change')


seachContainer.addEventListener('click', () => {
    divChange.forEach(changer => {
       changer.classList.add('active')
    })
     input.focus();
})
  }  

    return (
        <div className='mains'>
             <div className="mainSearch" >
              <div className="search-container change" id="search" onClick={serachClick}>
                  <div className="cursor change">
                      <input type="text" className="rq-form-element" id="input"/>
                  </div>
                  <div className="icon change">
                      <span className="circle">
                      </span>
                      <span className="stick"></span>
                  </div>
          </div>
          </div>
        </div>
    )
}

export default Main
