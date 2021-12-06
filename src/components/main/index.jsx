import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import {dbCours,dbArchive,dbFirestores} from "../../firebase";
import img1 from '../../images/img1.jpg'
import Modal from 'react-modal';
import './index.css';
import Footer from '../footer';
import Swal from 'sweetalert2';


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

const Main = () => {

  const [dataCours, setDataCours] = useState([]);
  const [search, setSearch] = useState('');
  const [courEdit, setCourEdit] = useState('');
  const [detailEdit, setdEtailEdit] = useState('');
  const [editId, setEditId] = useState('');
  const [dataSearch, setdataSearch] = useState([]);
  const [disableButton, setdisableButton] = useState(false);
  const [show, setshow] = useState(false);


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
        dbCours.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataCours(data);
          dataChange =data
        });

        // console.log(storageFirebase.put(`${img1}`)
        //     .then( url => {
        //         url.ref.getDownloadURL().then(p=>console.log(p))
        //     })
        // );


        // const fetchImages = async () => {

        //   let result = await storageFirebase.child('images/').listAll();
        //       let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
          
        //       return Promise.all(urlPromises);
      
        //   }
          
        //   const loadImages = async () => {
        //       const urls = await fetchImages();
        //       setFiles(urls);
        //   }
        //   loadImages();
        
    }, [dataChange])  
    
    
     // function pour effectuer l'archivage d'un cour

    const archive=(id,cours,detail)=>{

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

          dbArchive.doc(id).set({cours,detail}).then(resp=>{
            notify('Archivé avec succés');
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

    // function pour effectuer la recherche d'un cour
    const filterSearch=()=>{
        let dataFind= []
        const srch= search.toLowerCase();
        dataCours.map((data,index)=>{
          console.log(data.cours)
          if (srch === data.cours ) {
            dataFind.push(data)
            setdataSearch(dataFind)
          }
        })
    }


   // function pour determiner le contenu du modal de modification
   //  installer le module react-bootstrap-sweetalert pour cela
    const SweetAlertFunction =  ({ show, disableButton, submit, hideAlert }) => {
        return (
          <SweetAlert
            info
            show={show}
            confirmBtnBsStyle="success"
            disabled={disableButton}
            title="Détails"
            onConfirm={hideAlert}
            onCancel={hideAlert}
            dependencies={[courEdit, detailEdit]}
          >
           <div className="row m-0">
              <div className="col-sm-8  mb-3 mb-md-0 infoPostion ">
                <div className="card bg-light shadow">
                  <div className="card-body">
                    <p className="card-text ">{detailEdit}</p>
                    <span  className="btn btn-primary" disabled>{courEdit}</span>
                  </div>
                </div>
              </div>
            </div>
          </SweetAlert>
        );
    };

    // function pour masquer le modal de modification
    const hideAlert=()=> {
      setshow(false);
    }

    // function pour modifier un cour
    const submit=(e)=> {
      console.log(courEdit);
      return;
      dbCours.doc(editId).update({'cours':courEdit,'detail':detailEdit}).then();

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
      const e=dbCours.doc(editId).set({cours:courEdit,detail:detailEdit});
      
      e.then(r=> {  
          notify('Modifié')
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      );
    }
    

    return (
        <div className='mains'>
         
            <div className="search-box mb-2">
                <input type="text" className="search-input" placeholder="Search.." value={search} onChange={(e)=>setSearch(e.target.value)}/>

                <button className="search-button" onClick={()=>filterSearch()} >
                <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <h4  className='text-start'>Popular courses</h4>
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
                  
                    <div  key={index} className="pb-2">
  
                        <div id='bgDiv' className="card " style={{maxWidth: '480px',backgroundColor:"#" + ((1<<16)*Math.random() | 4).toString(16)}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <div className="card-body   " id='card-body'>
                                <img src={img1} className=" " alt="..."/>
                               
                                 <strong >{cour.cours}</strong> <br />
                                 <em className='text  text-default'>{cour.date}</em>
                                
                              </div>
                            </div>
                            <div className="col-6 ">
                              <div className="card-body">
                                <p className="card-text">
                                  <small className="text-muted">
                                    <button className='btn btn-outline-warning' title='edit'  onClick={() => {setCourEdit(cour.cours); setdEtailEdit(cour.detail); setEditId(cour.id);openModal() }}><i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' onClick={()=>{setCourEdit(cour.cours); setdEtailEdit(cour.detail);setEditId(cour.id);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
  
                    </div>
  
                    
                  ))
                ):(
                  dataCours.map((cour, index) => (
                    <div  key={index} className="w-100 mb-4   ">
                     
                    
                        <div  className="card " style={{maxWidth: '480px',backgroundColor:"#" + ((1<<16)*Math.random() | 4).toString(16)}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <div className="card-body   " id='card-body'>
                                <img src={img1} className=" " alt="..."/>
                               
                                 <strong >{cour.cours}</strong> <br />
                                 <em className='text  text-default'>{cour.date}</em>
                                
                              </div>
                            </div>
                            <div className="col-6 ">
                              <div className="card-body">
                                <p className="card-text">
                                  <small className="text-muted">
                                    <button className='btn btn-outline-warning' title='edit'  onClick={() => {setCourEdit(cour.cours); setdEtailEdit(cour.detail); setEditId(cour.id);openModal() }}><i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' onClick={()=>{setCourEdit(cour.cours); setdEtailEdit(cour.detail);setEditId(cour.id);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
  
                    </div>
  
                    
                  ))
                )}

              </InfiniteScroll>
                    
            </div>
              <Footer />
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
                              <label for="disabledTextInput">Cours</label>
                              <input type="text" value={courEdit}  className="form-control" placeholder="Cours" onChange={(e)=>{setCourEdit(e.target.value);console.log(e.target.value)}} />
                            </div>
                            
                             <div className="form-group">
                                <label for="exampleFormControlTextarea1">Details</label>
                                <textarea className="form-control" value={detailEdit} onChange={(e)=> setdEtailEdit(e.target.value)} rows="3"></textarea>
                             </div>
                            <div className="form-check">
                              
                            </div>
                            {(courEdit==='' || courEdit.length <=1) && detailEdit==='' || detailEdit.length <=4?(
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
