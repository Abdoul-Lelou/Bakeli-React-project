import React,{useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import SweetAlert from 'react-bootstrap-sweetalert';
import { dbArchiveProfs, dbFirestores, dbProf } from '../../firebase';
import img1 from'../../images/img1.jpg';
import './index.css';
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

const ListProf = () => {

    const [dataProf, setDataProf] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [profEdit, setProfEdit] = useState('');
    const [matiereEdit, setMatiereEdit] = useState('');
    const [editId, setEditId] = useState('');
    const [disableButton, setdisableButton] = useState(false);
    const [show, setshow] = useState(false);
    const [photo, setphoto] = useState([])

    const [color] = useState(['#758','#a87','#faa','#263'])

    let dataChange= '';

    let subtitle;
  
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

    const hideAlert=()=> {
      setshow(false);
    }

    useEffect(() => {
        dbProf.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataProf(data);
          dataChange =data
        });


        console.log(dataProf)
       
        dataProf.map((prof,index)=>{
          setphoto(prof.image)
        })
        
    }, [dataChange])  
    
    const notify=(msg) => toast(msg);
    
    const fetchImages = async(e) => {

      // e.map((prof,index)=>{
        // console.log(prof.image)
        return Promise.all(e)
      // })

    //   let result = await storageRef.child('cabinPictures').listAll();
    //   /// map() array of the imageRef.getDownloadURL() promises 
    //   let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
    //   // return all resolved promises
    //   return Promise.all(urlPromises);
    }
    // const urls = await fetchImages();
    // setphoto(urls);
    // console.log("inside .then() ", urls) ;
    
    

    const edit=(val)=>{
      val.preventDefault();
      const e=dbProf.doc(editId).set({name:profEdit,matiere:matiereEdit});
      console.log(e)
      e.then(r=> {  
          notify('Modifié')
          setTimeout(() => {
            window.location.reload()
          }, 1000);
          console.log(r)
        }
      );
    }

    const deleteProf=(e)=>{
      console.log(e)
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
          Swal.fire(
            'Archivé!',
            'Fichier archivé',
            'success'
          )
        
          
        }
      })
    }
    
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
          dependencies={[profEdit, matiereEdit]}
        >
         <div className="row sweetRow">
            <div className="col-sm-8  mb-3 mb-md-0 infoPostion ">
            <ul className="list-group w-100">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h4>Nom:</h4>
                <span className="badge badge-primary bg-primary badge-pill text">{matiereEdit}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
              <h4>Prenom:</h4>
                <span className="badge badge-primary bg-primary badge-pill"> {profEdit} </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
              <h4>Matiere:</h4>
                <span className="badge badge-primary bg-primary badge-pill"> {matiereEdit} </span>
              </li>
              
            </ul>
            </div>
          </div>
        </SweetAlert>
      );
    };

    const archive=(id,name,matiere)=>{
        dbArchiveProfs.doc(id).set({name,matiere}).then(resp=>{
            notify('Archivé avec succés');
           dbFirestores.collection("prof")
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

    return (
        <div className='prof bg-light shadow w-50 border '>
            <h4  className='text-start'>PROFESSEURS</h4>
            <div
              id="scrollableDiv"
              style={{
                height: 500,
                overflow: 'auto',
                flexDirection: 'column-reverse',
              }}
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={5}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                loader={
                    <>
                    <h4>Loading...</h4>
                        <p>Donnees introuvable</p>
                    </>
            }
                scrollableTarget="scrollableDiv"
              >
                {
                    dataProf.map((prof, index) => (
                    
                    <div  key={index} className="pb-2 ">
                      {/* <div className="card" style={{maxWidth: '600px',backgroundColor: color[index]}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <img src={photo} className="card-img" alt="..."/>
                              
                              <div className="card-body">
                                <p className="card-text text-center">
                                 <span className="card-text">{prof.name}</span>
                                  <small className="text-muted"></small>
                                </p>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card-body">
                                <p className="card-text">
                                    {prof.matiere}
                                    &nbsp;
                                  <small className="text-muted">
                                    <button className='btn btn-outline-warning' title='edit' onClick={()=>{setEditId(prof.id);setProfEdit(prof.name);setMatiereEdit(prof.matiere);openModal()}}> <i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(prof.id,prof.name,prof.matiere)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' onClick={()=>{setProfEdit(prof.name); setMatiereEdit(prof.matiere);setEditId(prof.id);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                  </small>
                                </p>
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
                                      <strong >{prof.name}</strong> <br />
                                      &nbsp; &nbsp;
                                      <em className='text  text-default'>{prof.name}</em>
                                      
                                  </div>
                                  </div>
                                  <div className="col-6 ">
                                  <div className="card-body">
                                      <p className="card-text">
                                      <small className="text-muted">
                                          <button className='btn btn-outline-warning' title='supprimer' onClick={(e)=> deleteProf(e)} ><i className="fa fa-trash" aria-hidden="true"></i></button> &nbsp;
                                          <button className='btn btn-outline-success' title='detail' onClick={()=>setshow(true)}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                      </small>
                                      </p>
                                  </div>
                                  </div>
                              </div>
                          </div>
  
                    </div>
  
                    
                  )
                )}
              </InfiniteScroll>

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
                              <label htmlFor="disabledTextInput">Prof</label>
                              <input type="text" value={profEdit}  className="form-control" placeholder="Cours" onChange={(e)=>{setProfEdit(e.target.value);console.log(e.target.value)}} />
                            </div>
                            
                             <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Matiere</label>
                                <textarea className="form-control" value={matiereEdit} onChange={(e)=> setMatiereEdit(e.target.value)} rows="3"></textarea>
                             </div>
                            <div className="form-check">
                              
                            </div>
                            {profEdit==='' || profEdit.length <=1 && matiereEdit==='' || matiereEdit.length <=4?(
                               <button type="submit" className="btn btn-primary disabled">Modifier</button>
                            ):(
                              <button type="submit" className="btn btn-primary " >Modifier</button>
                            )}
                            <button type="submit" className="btn btn-danger m-2" onClick={closeModal}>Annuler</button>
                          </fieldset>
                        </form>
                      
                 
              </Modal>

            </div>

            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
           

            <SweetAlertFunction
              show={show}
              disableButton={disableButton}
              submit={() => hideAlert()}
              hideAlert={() => hideAlert()}
            />
        </div>
    )
}

export default ListProf
