import React from 'react';
import img from '../../images/img1.jpg'
import  './index.css'

const Footer = () => {
    return (
        // <div className='pos border border-success w-100'>
             <>
                            {/* <div className="middle-container d-flex justify-content-between align-items-center border border-success"> */}
                                {/* <div className="dollar-div px-3">
                                    <div className="round-div">
                                      <i className="fa fa-dollar dollar"> </i>
                                    </div>
                                </div> */}
                                <div className='row w-100 pos'>
                                  

                                      <div class="grid-container">
                                        {/* <div class="item1"> */}
                                          <div className='item1  row '>
                                            <div className=' middle-container d-flex w-100  align-items-center shadow tailleCol border  '>
                                              <img src={img} alt="" id='imgMain' srcset="" className='profils pl-2' />
                                              <div class="col col-sm-2  widthImg" style={{backgroundColor:' ', padding:'2.3px'}}>
                                                  <b className="title">Mr Diatta</b>
                                                <p className='title bg-dark'>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                      <span className="fa fa-star checked"></span>
                                                    {/* <span className="fa fa-star"></span> */}
                                                  <span className="fa fa-star"></span>
                                                </p>
                                               </div>

                                               <img src={img} alt="" id='imgSecond' srcset="" className='profils' />
                                               

                                               <img src={img} alt="" id='imgSecond' srcset="" className='profils pr-2' />
                                              

                                               <img src={img} alt="" id='imgSecond' srcset="" className='profils ' />
                                              

                                           </div>
                                          </div>
                                       
                                      </div>

                                </div>
                            
                            {/* </div> */}
                    
             </>
        // </div>
    )
}

export default Footer
