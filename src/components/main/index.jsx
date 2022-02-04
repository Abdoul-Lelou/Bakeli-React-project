import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import {dbCours,dbArchive,dbFirestores, dbFirestore} from "../../firebase";
import img1 from '../../images/Cours.jpg';
import img2 from '../../images/teach.jpeg';
import img3 from '../../images/learn.png';
import img4 from '../../images/cerveau.jpg';
import img5 from '../../images/exo.jpeg';
import img6 from '../../images/exoLecteur.jpeg';
import img7 from '../../images/exoTree.jpeg';
import img8 from '../../images/info.jpeg';


import Modal from 'react-modal';
import './index.css';
import Footer from '../footer';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    margin: 'auto',
    transform: 'translate(-50%, -50%)',
    background:'#fff',
    width: '30%',
    border: '1px solid #445'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('');

const Main = ({nom,prenom,url}) => {

  const [dataCours, setDataCours] = useState([]);
  const [search, setSearch] = useState('');
  const [coursEdit, setCourEdit] = useState('');
  const [detailEdit, setdEtailEdit] = useState('');
  const [editId, setEditId] = useState('');
  const [dataSearch, setdataSearch] = useState([]);
  const [disableButton, setdisableButton] = useState(false);
  const [show, setshow] = useState(false);
  const [role, setRole] = useState('')

  const path= useHistory('');

  const imageTitle= [img1,img2,img3,img4,img5,img6,img7,img8];


  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal=()=> {
    setIsOpen(true);
  }

  const afterOpenModal=()=> {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#fa0';
  }

  const closeModal=()=> {
    setIsOpen(false);
  }


    let dataChange= '';

    // function pour afficher les notifications
    const notify = (msg) => toast(msg);


    useEffect(() => {

        const uid = localStorage.getItem('uidLogin');
        if (!uid) {
          path.push('');
          return false;
        }

        dbCours.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataCours(data);
          dataChange =data
        });

        dbFirestore.doc(uid).get().then(res => {
          setRole(res.data().role);
        })
        
    }, [dataChange])  
    
    
     // function pour effectuer l'archivage d'un cours

    const archive=(id,cours,detail,date)=>{
        console.log(date);
      Swal.fire({
        title: 'Archiver?',
        text: "Action irreversible!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Archiver!',
        width:'30%',
      }).then((result) => {
        if (result.isConfirmed) {

          dbArchive.doc(id).set({cours:cours,detail:detail,date:date},{merge:true}).then(resp=>{
           dbFirestores.collection("cours")
           .doc(id)
           .delete()
           .then(() => {

            Swal.fire(
              'Archivé!',
              'Fichier archivé',
              'success'
            )
            setTimeout(() => {
              window.location.reload();
            }, 2000);
           }) // Document deleted
           .catch((error) =>Swal.fire(
              'Erreur!',
              'Oups! erreur',
              'error'
            ));
         })
          
        }
      })
     
    }

    // function pour effectuer la recherche d'un cours
    const filterSearch=()=>{
        let dataFind= [],srchCapital='',courCapital='';
        let srch= search;
        srchCapital= srch.toUpperCase()
        dataCours.map((data)=>{
          courCapital= data.cour.toUpperCase();
          if (courCapital === srchCapital ) {
            dataFind.push(data)
            setdataSearch(dataFind)
          }
          return true;
        })
    }


   // function pour determiner le contenu du modal de modification
   //  installer le module react-bootstrap-sweetalert pour cela
    const SweetAlertFunction =  ({ show, disableButton, hideAlert }) => {
        return (
          <SweetAlert
            info
            show={show}
            confirmBtnBsStyle="success"
            disabled={disableButton}
            title={coursEdit}
            onConfirm={hideAlert}
            onCancel={hideAlert}
            dependencies={[coursEdit, detailEdit]}
          >

            <div className="card p-0" style={{border:'none'}}>
              <div className="card-body bg-light shadow">
                  
                  <p className="card-text text-break text-start"> {detailEdit}</p>

              </div>
            </div>

          </SweetAlert>
        );
    };

    // function pour masquer le modal de modification
    const hideAlert=()=> {
      setshow(false);
    }

    // function pour modifier un cours
    const submit=(e)=> {
      console.log(coursEdit);
      return;
      dbCours.doc(editId).update({'courss':coursEdit,'detail':detailEdit}).then();

      setdisableButton(true );
      notify('Modifié avec succes');
      setshow(false);
      setTimeout(() => {
        setdisableButton(false );

        window.location.reload();
      }, 2000);
    }

    const edit=(val)=>{
      val.preventDefault();
      const e=dbCours.doc(editId).update({cours:coursEdit,detail:detailEdit});
      
      e.then(r=> {  
          notify('Modifié')
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      );
    }
    

    return (
        <div className='mains shadow border '>
         
            <div className="search-box mb-2">
                <input type="text" className="search-input" placeholder="Search.." value={search} onChange={(e)=>{setSearch(e.target.value);filterSearch()}}/>

                <button className="btn btn-search search-button" onClick={()=>filterSearch()} >
                <i className="text-success fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <h4  className='text-start'>Popular coursses</h4>
            <div
              id="scrollableDiv"
              style={{
                height: 320,
                overflow: 'auto',
                // display: 'flex',
                flexDirection: 'column-reverse',
              }}
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={5}
                // next={this.fetchMoreData}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {search !==''?(
                  dataSearch.map((cour, index) => (
                   cour.cour.toUpperCase() === search.toUpperCase()?(

                    <div  key={index} className="pb-2">

                    <div id='bgDiv' className="card " style={{maxWidth: '480px',backgroundColor:"#" + ((1<<16)*Math.random() | 4).toString(16)}}>
                        <div className="row no-gutters">
                          <div className="col ">
                            <div className="card-body   " id='card-body'>
    
                              <img src={imageTitle[Math.floor(Math.random() * imageTitle.length)]} className="img " alt="..."/>
                             
                               <strong >{cour.cour}</strong> <br />
                               <em className='text  text-default'>{cour.date}</em>
                              
                            </div>
                          </div>
                          <div className="col-6 ">
                            <div className="card-body">
                              <p className="card-text">
                                <small className="text-muted">
                                  {role !=='apprenant'?(
                                      <>
                                        <button className='btn btn-outline-warning' title='edit'  onClick={() => {setCourEdit(cour.cour); setdEtailEdit(cour.detail); setEditId(cour.id);openModal() }}><i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                        <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cour,cour.detail,cour.date)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                        <button className='btn btn-outline-success' title='detail' onClick={()=>{setCourEdit(cour.cour); setdEtailEdit(cour.detail);setEditId(cour.id);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                      </>
                                  ):(
                                    <button className='btn btn-outline-success' title='detail' onClick={()=>{setCourEdit(cour.cour); setdEtailEdit(cour.detail);setEditId(cour.id);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                  )}
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                    </div>

                  </div>

                   ):(
                    <div key={index} className="card p-4 bg-danger">
                      <div className="card-body  border border-warning w-75 bg-light shadow">
                          <h5 className="card-title"><strong>Liste vide</strong></h5>
                          <p className="card-text"> Ce cour n'existe pas dans la liste</p>

                      </div>
                    </div>
                   )   
                  ))
                          
                ):(
                  dataCours.map((cours, index) => (
                    <div  key={index} className="w-100 mb-4   ">
                     
                    
                        <div  className="card " style={{maxWidth: '480px',maxHeight: '70px',backgroundColor:"#" + ((1<<16)*Math.random() | 4).toString(16)}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <div className="card-body   " id='card-body'>
                                <img src={imageTitle[Math.floor(Math.random() * imageTitle.length)]} className=" " alt="..."/>
                               
                                 <strong >{cours.cour}</strong> <br />
                                 <em className='text-default'>{cours.date}</em>
                                
                              </div>
                            </div>
                            <div className="col-6 ">
                              <div className="card-body">
                                {/* <p className="card-text"> */}
                                  <small className="text-muted">
                                    
                                    {role !=='apprenant'?(
                                      <>
                                      <ul className="list-group w-25">
                                        <li className="list-group-item justify-content-between align-items-center">
                                         
                                          <span className="badge bg-primary rounded-pill">14</span>
                                    
                                        </li>
                        
                                      </ul>

                                      <span className='btn-action'>
                                          <button className='btn btn-outline-warning' title='edit'  onClick={() => {setCourEdit(cours.cour); setdEtailEdit(cours.detail); setEditId(cours.id);openModal() }}><i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                          <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cours.id,cours.cour,cours.detail,cours.date)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                          <button className='btn btn-outline-success' title='detail' onClick={()=>{setCourEdit(cours.cour); setdEtailEdit(cours.detail);setEditId(cours.id);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                      </span>
                                        
                                      </>
                                  ):(
                                    <button className='btn btn-outline-success' title='detail' onClick={()=>{setCourEdit(cours.cour); setdEtailEdit(cours.detail);setEditId(cours.id);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                  )}
                                  </small>
                                {/* </p> */}
                              </div>
                            </div>
                          </div>
                        </div>
  
                    </div>
  
                    
                  ))
                )}

              </InfiniteScroll>
                    
            </div>
              <Footer prenom={prenom} nom={nom} url={url}/>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                appElement={document.getElementById('root')}
                contentLabel="Example Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='text-info'>Modifier </h2>
                

                      <form className='border border-success' onSubmit={e=>edit(e)}>
                        <fieldset >
                          <div className="form-group">
                            <label htmlFor="disabledTextInput">Cours</label>
                            <input type="text" value={coursEdit}  className="form-control" placeholder="Cours" onChange={(e)=>{setCourEdit(e.target.value);console.log(e.target.value)}} />
                          </div>
                          
                            <div className="form-group">
                              <label htmlFor="exampleFormControlTextarea1">Details</label>
                              <textarea className="form-control" value={detailEdit} onChange={(e)=> setdEtailEdit(e.target.value)} rows="3"></textarea>
                            </div>
                          <div className="form-check">
                            
                          </div>
                          {(!coursEdit) || (!detailEdit) ?(
                              <button type="submit" className="btn btn-primary disabled">Modifier</button>
                          ):(
                            <button type="submit" className="btn btn-primary " >Modifier</button>
                          )}
                          <button type="submit" className="btn btn-danger m-2" onClick={closeModal}>Annuler</button>
                        </fieldset>
                      </form>
                    
                
              </Modal>
              <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              color='#258'
              />
              {/*  Affichage des notifications*/}
              <ToastContainer />

                  

          {/* Affichage du modal sweet Alert pour la modification      */}
            <SweetAlertFunction
              show={show}
              disableButton={disableButton}
              submit={() => submit()}
              hideAlert={() => hideAlert()}
            />

        </div>
    )
}

export default Main
