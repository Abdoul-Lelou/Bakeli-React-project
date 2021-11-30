import React,{useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import SweetAlert from 'react-bootstrap-sweetalert';
import { dbArchiveProfs, dbFirestore, dbFirestores } from '../../firebase';
import img1 from'../../images/img1.jpg';
import './index.css';

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

const ListApprenant = () => {

    const [dataProf, setDataProf] = useState([]);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [profEdit, setProfEdit] = useState('');
    const [matiereEdit, setMatiereEdit] = useState('');
    const [editId, setEditId] = useState('');
    const [disableButton, setdisableButton] = useState(false);
    const [show, setshow] = useState(false);
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();

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
        dbFirestore.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataProf(data);
          dataChange =data
        });
        
    }, [dataChange])  
    
    const notify=(msg) => toast(msg);
    
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
         <div className="row m-0">
            <div className="col-sm-8  mb-3 mb-md-0 infoPostion ">
            <ul className="list-group w-100">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h4>Nom</h4>
                <span className="badge badge-primary bg-primary badge-pill">{nom}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
              <h4>Prenom</h4>
                <span className="badge badge-primary bg-primary badge-pill"> {prenom} </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
              <h4>Email</h4>
                <span className="badge badge-primary bg-primary badge-pill"> {email} </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
              <h4>Role</h4>
                <span className="badge badge-primary bg-primary badge-pill"> {role} </span>
              </li>
            </ul>
            </div>
          </div>
        </SweetAlert>
      );
    };

    const edit=(val)=>{
      val.preventDefault();
      const e=dbFirestore.doc(editId).set({nom:nom,prenom:prenom,email:email,role:role});
      console.log(e)
      e.then(r=> {  
          notify('Modifié')
          setTimeout(() => {
            window.location.reload()
          }, 1000);
         
        }
      );
    }

    const archive=(id)=>{
        dbArchiveProfs.doc(id).set({nom:nom,prenom:prenom,email:email,role:role}).then(resp=>{
            notify('Archivé avec succés');
           dbFirestores.collection("users")
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
        <div className='prof w-50 bg-light shadow pt-2'>
            <h4  className='text-start'>Apprenants</h4>
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
                    dataProf.map((aprnt, index) => (
                      aprnt.role ==='apprenant'?(
                        <div  key={index} className="pb-2">
                             
                            <div className="card" style={{maxWidth: '600px'}}>
                                <div className="row no-gutters">
                                  <div className="col ">
                                    <img src={img1} className="card-img" alt="..."/>
                                    <div className="card-body">
                                      <p className="card-text text-center">
                                       <span className="card-text">{aprnt.prenom} {aprnt.nom}</span>
                                        <small className="text-muted"></small>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="card-body">
                                      <p className="card-text">
                                          {aprnt.matiere}
                                          &nbsp;
                                        <small className="text-muted">
                                          <button className='btn btn-outline-warning' title='edit' onClick={()=>{setEditId(aprnt.id);setNom(aprnt.nom);setPrenom(aprnt.prenom);setEmail(aprnt.email);setRole(aprnt.role);openModal()}}> <i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                          <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(aprnt.id,aprnt.nom,aprnt.prenom,aprnt.email,aprnt.role)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                          <button className='btn btn-outline-success' title='detail' onClick={()=>{setNom(aprnt.nom); setPrenom(aprnt.prenom);setEmail(aprnt.email);setRole(aprnt.role);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                        </small>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
        
                          </div>
                        ):(null)
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
                              <label htmlFor="disabledTextInput">Nom</label>
                              <input type="text" value={nom}  className="form-control" placeholder="Cours" onChange={(e)=>{setNom(e.target.value)}} />
                            </div>

                            <div className="form-group">
                              <label htmlFor="disabledTextInput">Nom</label>
                              <input type="text" value={prenom}  className="form-control" placeholder="Cours" onChange={(e)=>{setPrenom(e.target.value)}} />
                            </div>

                            <div className="form-group">
                              <label htmlFor="disabledTextInput">email</label>
                              <input type="email" value={email}  className="form-control" placeholder="Cours" onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>

                           
                            
                             <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Role</label>
                                <select className="form-select" aria-label="Default select example" onChange={(e)=>{setRole(e.target.value)}}>
                                  <option value="apprenant">admin</option>
                                  <option value="admin" defaultValue>apprenant</option>
                                </select>
                             </div>
                            <div className="form-check">
                              
                            </div>
                            {nom===''  || prenom==='' || email==='' ?(
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

export default ListApprenant
