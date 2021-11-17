import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import {dbCours,dbArchive,dbFirestores} from "../../firebase";
import img1 from '../../images/img1.jpg'
import Modal from 'react-modal';
import './index.css';
import { useHistory } from 'react-router';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background:'#541'
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
  const route= useHistory();

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

  // const route= useHistory();

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
        
    }, [dataChange])        
     // function pour effectuer l'archivage d'un cour

    const archive=(id,cours,detail)=>{
      dbArchive.doc(id).set({cours,detail}).then(resp=>{
        notify('Archivé avec succés');
       dbFirestores.collection("cours")
       .doc(id)
       .delete()
       .then(() => {
        notify('Deplacé avec succes');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
       }) // Document deleted
       .catch((error) => notify(error));
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
          showCancel
          confirmBtnText="editer"
          cancelBtnText="annuler"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="default"
          disabled={disableButton}
          title="Editer"
          onConfirm={submit}
          onCancel={hideAlert}
          dependencies={[courEdit, detailEdit]}
        >
          <form>
            <label htmlFor="cour">Cours</label>
            <br /> 
            <input 
                value={courEdit} 
                disabled
                /> <br /> 
            <label htmlFor="cour">Details</label>
            <br /> 
            <input value={detailEdit} />
          </form>

        </SweetAlert>
      );
  };

  // function pour masquer le modal de modification
  const hideAlert=()=> {
    setshow(false);
  }

  // function pour modifier un cour
  const submit=(e)=> {

    dbCours.doc(editId).update({'cours':courEdit,'detail':detailEdit}).then();

    setdisableButton(true );
    notify('Modifié avec succes');
    setshow(false);
    setTimeout(() => {
      setdisableButton(false );

      window.location.reload();
    }, 2000);
  }

  const edit=(er)=>{
    er.preventDefault();
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
                height: 500,
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
  
                      <div className="card" style={{maxWidth: '480px'}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <img src={img1} className="card-img" alt="..."/>
                              <div className="card-body">
                                <p className="card-text text-center">
                                 <span className="card-text">{cour.cours}</span>
                                  <small className="text-muted"></small>
                                </p>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card-body">
                                <p className="card-text">
                                  <small className="text-muted">
                                    <button className='btn btn-outline-warning' title='edit' onClick={() =>{setCourEdit(cour.cours); setdEtailEdit(cour.detail);setEditId(cour.id); openModal()}}>
                                      <i className="fa fa-edit" aria-hidden="true"></i>
                                    </button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail) }> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' onClick={setshow(true)} > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
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
                    <div  key={index} className="pb-2">
                     
                    
                      <div className="card" style={{maxWidth: '480px'}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <img src={img1} className="card-img" alt="..."/>
                              <div className="card-body">
                                <p className="card-text text-center">
                                 <span className="card-text">{cour.cours}</span>
                                  <small className="text-muted"></small>
                                </p>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card-body">
                                <p className="card-text">
                                  <small className="text-muted">
                                    <button className='btn btn-outline-warning' title='edit'  onClick={() => {setCourEdit(cour.cours); setdEtailEdit(cour.detail); setEditId(cour.id); openModal()}}><i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' onClick={()=> setshow(true)}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
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

              <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        appElement={document.getElementById('root')}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Modifier </h2>
        <div className='col-md-4 col-md-offset-4 w-75'>
            
                <form className='form-group' onSubmit={e=>edit(e)}>
                  <div className='container'>
                    <div className="row">
                      <label htmlFor="cours">Cour</label>
                      <input className='input-control' value={courEdit} onChange={e=>setCourEdit(e.target.value)}/>
                    </div>
                    <div className="row">
                      <label htmlFor="detail">Detail</label>
                      <input className='input-control' value={detailEdit} onChange={e=>setdEtailEdit(e.target.value)}/>
                    </div>
                  <br />
                  <button type="submit">Modifier</button>

                  </div>
                </form>
            
        </div>
      </Modal>
    </div>
            </div>
  
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
