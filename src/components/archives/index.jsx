import React,{useEffect,useState} from 'react';
import './index.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import SweetAlert from 'react-bootstrap-sweetalert';

import {auth, dbArchive, dbArchiveProfs, dbArchiveUsers } from '../../firebase';
import img1 from '../../images/img1.jpg';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';




const Archives = () => {

    const [archiveCours, setArchiveCours] = useState([]);
    const [archiveProfs, setArchiveProfs] = useState([]);
    const [archiveUses, setArchiveUses] = useState([])
    const [detailName, setdetailName] = useState('');
    const [detailMatiere, setdetailMatiere] = useState('')
    const [nomUser, setnomUser] = useState('');
    const [prenomUser, setprenomUser] = useState('');
    const [emailUser, setemailUser] = useState('');
    const [roleUser, setroleUser] = useState('')
    const [show, setshow] = useState(false);
    const [showUser, setshowUser] = useState(false);

    const path= useHistory('')

    

    useEffect(() => {
        const uid = localStorage.getItem('uidLogin');
        if (!uid) {
            path.push('')
           
        }
        dbArchive.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setArchiveCours(data)
          });

          dbArchiveProfs.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setArchiveProfs(data)
          });

          dbArchiveUsers.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setArchiveUses(data)
          });

    }, [])

    const archive= ()=>{
        dbArchiveProfs.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setArchiveProfs(data)
          });
          
    }

    const deleteArchiveProf=(id)=>{
        Swal.fire({
            title: 'Supprimer?',
            text: "Action irreversible!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Spprimer!',
            width:'30%',
          }).then((result) => {
            if (result.isConfirmed) {
              
              dbArchiveProfs.doc(id).delete(); 
              Swal.fire(
                'Supprimé!',
                'Prof supprimé',
                'success'
              )
              setTimeout(() => {
                window.location.reload()
              }, 3000);
            }
          })
    }

    const deleteArchiveCour=(id)=>{
        Swal.fire({
            title: 'Supprimer?',
            text: "Action irreversible!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Spprimer!',
            width:'30%',
          }).then((result) => {
            if (result.isConfirmed) {
            
              dbArchive.doc(id).delete(); 
              Swal.fire(
                'Supprimé!',
                'Cour supprimé',
                'success'
              )
              setTimeout(() => {
                  window.location.reload()
              }, 3000);
            }
          })
    }

    const deleteArchiveUser=(id,email)=>{
        // const user= auth.
        Swal.fire({
            title: 'Supprimer?',
            text: "Action irreversible!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Spprimer!',
            width:'30%',
          }).then((result) => {
            if (result.isConfirmed) {
            
              dbArchiveUsers.doc(id).delete(); 
                Swal.fire(
                    'Supprimé!',
                    'Apprenant supprimé',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
          })
    }    

    const hideAlert=()=> {
        setshow(false);
        setemailUser('')
      }

    const SweetAlertFunction =  ({ show, disableButton, submit, hideAlert }) => {
        return (
          <SweetAlert
            info
            show={show}
            confirmBtnBsStyle="success"
            title="Détails"
            onConfirm={hideAlert}
            onCancel={hideAlert}
            dependencies={archiveProfs}
          >
           <div className="row sweetRow">
            <div className="col-sm-8  mb-3 mb-md-0 infoPostion ">
            <ul className="list-group w-100">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h4> {detailName}</h4>
                <span className="badge badge-primary bg-danger badge-pill text">{detailMatiere}</span>
              </li>
              

              {emailUser !==''?(
                 <li className="list-group-item d-flex justify-content-between align-items-center">
                 <h4> Email</h4>
                 <span className="badge badge-primary bg-danger badge-pill text">{emailUser}</span>
               </li>
              ):(
                null
              )
              
              }
              
              
            </ul>
            </div>
          </div>
          </SweetAlert>
        );
    };


    return (
       <div className='archive '>
           <div className='row row-cols-1 bg-light shadow pt-2 '>
                <ul className="nav nav-pills clearfix border mb-2 " >
                        <li className="active " id='linkActive'><a data-toggle="pill" href="#home">PROFS</a></li>
                        <li><a data-toggle="pill" href="#menu2">USERS</a></li>
                        <li><a data-toggle="pill" href="#menu1">COURS</a></li>
                </ul>
                <div
                    id="scrollableDiv"
                    style={{
                    height: 450,
                    overflow: 'auto',
                    flexDirection: 'column-reverse',
                    }}
                    
                    className='border border-success bg-light shadow'
                    >
                        
                        <InfiniteScroll
                                dataLength={5}
                                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                                inverse={true} //
                                hasMore={true}
                                // loader={<h4>Loading...</h4>}
                                scrollableTarget="scrollableDiv"
                            >  
                        {
                            <>
                                    
                                   

                                <div className="tab-content w-75">
                                    
                                    <div id="home" className="tab-pane fade in active">
                                        <h3>PROFESSEURS</h3>                                

                                            {archiveProfs.length >0?(
                                                archiveProfs.map((prof, index) => (
                                                    
                                                    <div  key={index} className=" mb-2 ">
    
                                                            <div  className="card " style={{maxWidth: '480px',backgroundColor:"#" + ((1<<16)*Math.random() | 4).toString(16)}}>
                                                                <div className="row no-gutters">
                                                                    <div className="col ">
                                                                    <div className="card-body   " id='card-body'>
                                                                        <img src={prof.url} className=" " alt="vide"/>
                                                                        &nbsp; &nbsp;
                                                                        <strong >{prof.nom}</strong> <br />
                                                                        &nbsp; &nbsp;
                                                                        <em className='text  text-default'>{prof.matieres}</em>
                                                                        
                                                                    </div>
                                                                    </div>
                                                                    <div className="col-6 ">
                                                                    <div className="card-body">
                                                                        <p className="card-text">
                                                                        <small className="text-muted">
                                                                            <button className='btn btn-outline-warning' title='supprimer' onClick={()=> deleteArchiveProf(prof.id)} ><i className="fa fa-trash" aria-hidden="true"></i></button> &nbsp;
                                                                            <button className='btn btn-outline-success' title='detail' onClick={()=>{setdetailName(prof.nom);setdetailMatiere(prof.matieres);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                                                        </small>
                                                                        </p>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
    
                                                            
                                
                                                    </div>          
                                                ))
                                            ):(

                                                <div className="card p-4 bg-danger">
                                                    <div className="card-body border border-warning w-75 bg-light shadow">
                                                        <h5 className="card-title"><strong>Liste vide</strong></h5>
                                                        <p className="card-text"> Aucun professeur n'est archivé</p>
            
                                                    </div>
                                                </div>

                                            )
                                            
                                            }
                    
                                        {/* </p> */}
                                    </div>
                                    
                                    <div id="menu1" className="tab-pane fade">
                                        <h3>COURS</h3>
                                            {archiveCours.length >0?(

                                                archiveCours.map((cour, index) => (
                                                                                                    
                                                    <div  key={index} className="mb-2">

                                                        {/* <div className="card" style={{maxWidth:'50rem',height:'8rem',backgroundColor:"#" + ((1<<24)*Math.random() | 2).toString(16)}}>
                                                            <div className="row  no-gutters">
                                                                <div className="col  ">
                                                                <img src={img1} className="" id='imgArchive' alt="..."/>
                                                                <div className="card-body">
                                                                    <p className="card-text text-center">
                                                                    <span className="card-text">{cour.cours} </span>
                                                                    <small className="text-muted"></small>
                                                                    </p>
                                                                </div>
                                                                </div>
                                                                <div className="col col-sm-4 h-25">
                                                                <div className="card-body">
                                                                    <button className='btn btn-default' title='supprimer' > <i className="fa fa-info" aria-hidden="true"></i></button>
                                                                    &nbsp;
                                                                    <button className='btn btn-default ' title='supprimer' > <i className="fa fa-trash text-danger" aria-hidden="true"></i></button>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                        <div id='bgDiv' className="card " style={{maxWidth: '480px',backgroundColor:"#" + ((1<<16)*Math.random() | 4).toString(16)}}>
                                                            <div className="row no-gutters">
                                                                <div className="col ">
                                                                <div className="card-body   " id='card-body'>
                                                                    <img src={img1} className=" " alt="..."/>
                                                                    &nbsp; &nbsp;
                                                                    <strong >{cour.cour}</strong> <br />
                                                                    &nbsp; &nbsp;
                                                                    <em className='text  text-default'>{cour.date}</em>
                                                                    
                                                                </div>
                                                                </div>
                                                                <div className="col-6 ">
                                                                <div className="card-body">
                                                                    <p className="card-text">
                                                                    <small className="text-muted">
                                                                        <button className='btn btn-outline-danger' title='supprimer' onClick={()=> deleteArchiveCour(cour.id)} ><i className="fa fa-trash" aria-hidden="true"></i></button> &nbsp;
                                                                        <button className='btn btn-outline-success' title='detail' onClick={()=>{setdetailName(cour.cour);setdetailMatiere(cour.date);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                                                    </small>
                                                                    </p>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>    

                                                        
                                                ))

                                            ):(
                                                <div className="card p-4 bg-danger">
                                                    <div className="card-body  border border-warning w-75 bg-light shadow">
                                                        <h5 className="card-title"><strong>Liste vide</strong></h5>
                                                        <p className="card-text"> Aucun cour n'est archivé</p>
            
                                                    </div>
                                                </div>
                                            )
                                             
                                            }
                                        {/* </p> */}
                                    </div>  

                                     <div id="menu2" className="tab-pane fade">
                                        <h3>APPRENANTS</h3>
                                        
                                            {archiveUses.length >0?(

                                                archiveUses.map((user, index) => (
                                                                                                    
                                                    <div  key={index} className="mb-2">
                                                        
                                                        
                                                        <div id='bgDiv' className="card " style={{maxWidth: '480px',backgroundColor:"#" + ((1<<16)*Math.random() | 4).toString(16)}}>
                                                            <div className="row no-gutters">
                                                                <div className="col ">
                                                                <div className="card-body   " id='card-body'>
                                                                    <img src={user.url} className=" " alt="..."/>
                                                                    &nbsp; &nbsp;
                                                                    <strong >{user.prenom} {user.nom}</strong> <br />
                                                                    &nbsp; &nbsp;
                                                                    <em className='text  text-default'>{user.role}</em>
                                                                    
                                                                </div>
                                                                </div>
                                                                <div className="col-6 ">
                                                                <div className="card-body">
                                                                    <p className="card-text">
                                                                    <small className="text-muted">
                                                                        <button className='btn btn-outline-danger' title='supprimer' onClick={()=> deleteArchiveUser(user.id,user.uid)} ><i className="fa fa-trash" aria-hidden="true"></i></button> &nbsp;
                                                                        <button className='btn btn-outline-success' title='detail' onClick={()=>{setemailUser(user.email);setdetailName(user.prenom+' '+user.nom);setdetailMatiere(user.role);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                                                    </small>
                                                                    </p>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>    

                                                        
                                                ))

                                            ):(
                                                <div className="card p-4 bg-danger">
                                                    <div className="card-body  border border-warning w-75 bg-light shadow">
                                                        <h5 className="card-title"><strong>Liste vide</strong></h5>
                                                        <p className="card-text"> Aucun cour n'est archivé</p>
            
                                                    </div>
                                                </div>
                                            )
                                             
                                            }
                                        {/* </p> */}
                                    </div>  
                                </div>
                            
                            </>
                        }
                        </InfiniteScroll>


                        
                </div>
                <SweetAlertFunction
                    show={show}
                    // disableButton={false}
                    submit={() => hideAlert()}
                    hideAlert={() => hideAlert()}
                />

                {/* <SweetAlertFunctionUser
                    show={()=>showUser}
                    // disableButton={false}
                    submit={() => hideAlert()}
                    hideAlert={() => hideAlert()}
                /> */}
    
           <br />
           </div>
       </div>
    )
}

export default Archives
