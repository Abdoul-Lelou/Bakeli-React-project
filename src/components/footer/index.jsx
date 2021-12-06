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
                                  

                                      <div className="grid-container">
                                        {/* <div className="item1"> */}
                                          <div className='item1  row '>
                                            <div className=' middle-container d-flex w-100  align-items-center shadow tailleCol border  '>
                                              <img src={img} alt="" id='imgMain' srcSet="" className='profils pl-2' />
                                              <div className="col col-sm-2  widthImg" style={{backgroundColor:' ', padding:'2.3px'}}>
                                                  <b className="title">Mr Diatta</b>
                                                <p className='title '>
                                                    <span className="fa fa-star checked" id='fa'></span>
                                                    <span className="fa fa-star checked" id='fa'></span>
                                                      <span className="fa fa-star checked" id='fa'></span>
                                                    {/* <span className="fa fa-star"></span> */}
                                                  <span className="fa fa-star text-default"></span>
                                                </p>
                                               </div>

                                               <img src={img} alt="" id='imgSecond' srcSet="" className='profils' />
                                               

                                               <img src={img} alt="" id='imgSecond' srcSet="" className='profils pr-2' />
                                              

                                               <img src={img} alt="" id='imgSecond' srcSet="" className='profils ' />
                                              

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
