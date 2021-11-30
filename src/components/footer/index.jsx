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
                                          <div className='item1 row '>
                                            <div className=' middle-container d-flex  align-items-center tailleCol  '>
                                                <img src={img} alt="" id='img' srcset="" className='profils ' />
                                              <div class="col col-sm-2  widthImg" style={{backgroundColor:'#c4c4c4 ', padding:'2.3px'}}>
                                                  <b className="title">Mr Diatta</b>
                                                <p className='title'>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                      <span className="fa fa-star checked"></span>
                                                    {/* <span className="fa fa-star"></span> */}
                                                  <span className="fa fa-star"></span>
                                                </p>
                                               </div>

                                               <img src={img} alt="" id='imgs' srcset="" className='profils' />
                                               

                                               <img src={img} alt="" id='imgs' srcset="" className='profils pr-2' />
                                              

                                               <img src={img} alt="" id='imgs' srcset="" className='profils pr-2' />
                                              

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
