import React, { useEffect, useState } from 'react';
import { dbFirestore, dbProf } from '../../firebase';
import img from '../../images/img1.jpg'
import  './index.css'

const Footer = ({nom,prenom,url}) => {

  // const [nom, setNom] = useState('');
  // const [prenom, setPrenom] = useState('')
  // const [url, setUrl] = useState('')

    useEffect(() => {
    //  dbFirestore.doc(uidLogin).get().then(res => {
    //   setUrl(res.data().url)
    //   setPrenom(res.data().prenom)
    //   setNom(res.data().nom)
    //   console.log(res.data().prenom)
    //  })

     const prof= dbProf.get().then(res=>{

     })

    }, [])

    return (
             <>

                      <div className="grid-container " >
                          <div className='item1   row mb-3'  style={{ width: '85%', padding:'5px'}}>
                            <div className=' middle-container d-flex  w-100  align-items-center shadow tailleCol border'  style={{ maxHeight: '80px'}}>
                              <img src={url} id='imgMain' alt="vide" srcSet="" className='profils' />
                              <div className="col col-sm-2  widthImg" style={{ padding:'2.3px'}}>
                                  <h5 className="title" style={{fontSize: '15px'}}>{prenom} {nom}</h5>
                                <p className='title '>
                                    <span className="fa fa-star checked" id='fa'></span>
                                    <span className="fa fa-star checked" id='fa'></span>
                                      <span className="fa fa-star checked" id='fa'></span>
                                    <span className="fa fa-star"></span>
                                  <span className="fa fa-star text-default"></span>
                                </p>
                                </div>

                                <img src={img} alt="" id='imgSecond' srcSet="" className='profils' />
                                

                                <img src={img} alt="" id='imgSecond' srcSet="" className='profils pr-2' />
                              

                                <img src={img} alt="" id='imgSecond' srcSet="" className='profils ' />
                              

                            </div>
                          </div>
                        
                      </div>
    
             </>
    )
}

export default Footer
