import React,{useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import SweetAlert from 'react-bootstrap-sweetalert';
import { dbArchiveProfs, dbFirestores, dbProf, storageFirebase } from '../../firebase';
import img1 from'../../images/img1.jpg';
import './index.css';
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

const ListProf = () => {

    const [dataProf, setDataProf] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [nom, setNom] = useState('');
    const [matieres, setMatiere] = useState('');
    const [editId, setEditId] = useState('');
    const [disableButton, setdisableButton] = useState(false);
    const [show, setshow] = useState(false);
    const [url, setUrl] = useState('')
    const [color] = useState(['#758','#a87','#faa','#263'])

    const path= useHistory('')

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

        const uid = localStorage.getItem('uidLogin');
        if (!uid) {
          path.push('')
        }

        dbProf.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataProf(data);
          dataChange =data
        });


       
        // dataProf.map((prof,index)=>{
        //   setphoto(prof.image)
        // })

        // const fetchImages = async () => {
        //   let result = await storageFirebase.ref('images/');
        //   // console.log((await result.list()).items.map(item=>{
        //   //   console.log(item.data)
        //   // }))
        //   // let urlPromises = result.items.map((imageRef) =>
        //   //   imageRef.getDownloadURL()
        //   // );
    
        //   // return Promise.all(urlPromises);
        // };
        // fetchImages();
        // const loadImages = async () => {
        //   const urls = await fetchImages();
        //   setFiles(urls);
        // };
        // loadImages();
        
    }, [])  
    
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
   


    const edit=(val)=>{
      val.preventDefault();
      console.log(nom+' '+matieres+' '+editId)
      const e=dbProf.doc(editId).set({nom,matieres},{merge:true});
     
      e.then(r=> {  
          notify('Modifié')
          setTimeout(() => {
            window.location.reload()
          }, 1000);
     
        }
      );
    }

    const deleteProf=(e)=>{
    
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
          dependencies={[nom, matieres]}
        >
         <div className="row ">
            <div className="col-sm-12 m-0 mb-md-0 infoPostion ">
            <ul className=" w-100 bg-light shadow">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h4>Nom:</h4>
                <span className="badge badge-primary bg-primary badge-pill text">{nom}</span>
              </li>
             
              <li className="list-group-item d-flex justify-content-between align-items-center">
              <h4>Matiere:</h4>
                <span className="badge badge-primary bg-primary badge-pill text-break"> {matieres} </span>
              </li>
              
            </ul>
            </div>
          </div>
        </SweetAlert>
      );
    };



    const archive=(id,nom,matieres,url)=>{

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
  
              dbArchiveProfs.doc(id).set({nom,matieres,url},{merge:true}).then(resp=>{
                notify('Archivé avec succés');
                dbFirestores.collection("prof")
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



    return (
        <div className='prof bg-light  '>
          <div className='pt-2'>
            <ul className="nav nav-pills clearfix border  mb-2" >
                <li className="active " id='linkActive'><a data-toggle="pill" href="#home">PROFESSEURS</a></li>       
            </ul>
            <div
              id="scrollableDiv"
              style={{
                height: 500,
                overflow: 'auto',
                flexDirection: 'column-reverse',
                paddingBottom:'5px'
              }}

              className='border border-success bg-light shadow'
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={5}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                
                scrollableTarget="scrollableDiv"
              >
                <div className="tab-content  w-75">
                                    
                  <div id="home" className="tab-pane fade in active"> 
                       <h3>PROFESSEURS</h3>

                      {dataProf.length >0?(
                          dataProf.map((prof, index) => (
                        
                            <div  key={index} className="pb-2  pt-2">
                              <div id='bgDiv' className="card " style={{backgroundColor:"#" + ((1<<16)*Math.random() | 4).toString(16)}}>
                                    <div className="row no-gutters">
                                        <div className="col ">
                                        <div className="card-body   " id='card-body'>
                                            <img src={prof.url} className=" " alt="..."/>
                                            &nbsp; &nbsp;
                                            <strong >{prof.nom}</strong> <br />
                                            &nbsp; &nbsp;
                                            <em className='text  text-break'>{prof.matieres}</em>
                                            
                                        </div>
                                        </div>
                                        <div className="col-6 ">
                                        <div className="card-body">
                                            <p className="card-text">
                                            <small className="text-muted">
                                                <button className='btn btn-outline-warning' title='edit' onClick={(e)=> {setEditId(prof.id);setNom(prof.nom);setMatiere(prof.matieres);setUrl(prof.url);openModal()}} ><i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                                <button className='btn btn-outline-warning' title='archive' onClick={()=>{setUrl(prof.url);archive(prof.id,prof.nom,prof.matieres,prof.url)}} ><i className="fa fa-archive" aria-hidden="true"></i></button> &nbsp;
                                                <button className='btn btn-outline-success' title='detail' onClick={()=>{setMatiere(prof.matieres);setNom(prof.nom);setshow(true)}}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                            </small>
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                              </div>
        
                          </div>
        
                          
                        )
                        )
                      ):(
                        <div className="card p-4 bg-danger">
                            <div className="card-body  border border-warning w-75 bg-light shadow">
                                <h5 className="card-title"><strong>Liste vide</strong></h5>
                                <p className="card-text"> Aucun professeur dans la base</p>

                            </div>
                        </div>
                      )
                      
                      }
                  </div>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
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
                              <input type="text" value={nom}  className="form-control" placeholder="Cours" onChange={(e)=>{setNom(e.target.value)}} />
                            </div>
                            
                             <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Matiere</label>
                                <textarea className="form-control" value={matieres} onChange={(e)=> setMatiere(e.target.value)} rows="3"></textarea>
                             </div>
                            <div className="form-check">
                              
                            </div>
                            {!nom || !matieres ?(
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
        </div>
    )
}

export default ListProf
