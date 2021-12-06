import React,{useEffect,useState} from 'react';
import './index.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import SweetAlert from 'react-bootstrap-sweetalert';

import { dbArchive, dbArchiveProfs } from '../../firebase';
import img1 from '../../images/img1.jpg';
import Swal from 'sweetalert2';




const Archives = () => {

    const [archiveCours, setArchiveCours] = useState([]);
    const [archiveProfs, setArchiveProfs] = useState([]);
    const [show, setshow] = useState(false);

    

    useEffect(() => {
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

    const deleteArchive=()=>{
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

    const hideAlert=()=> {
        setshow(false);
      }

    const SweetAlertFunction =  ({ show, disableButton, submit, hideAlert }) => {
        return (
          <SweetAlert
            info
            show={show}
            // showCancel
            // confirmBtnText="OK !"
            // cancelBtnText="OK !"
            confirmBtnBsStyle="success"
            // cancelBtnBsStyle="success"
            // disabled={false}
            title="Détails"
            onConfirm={hideAlert}
            onCancel={hideAlert}
            dependencies={archiveProfs}
          >
           <div className="row sweetRow">
            <div className="col-sm-8  mb-3 mb-md-0 infoPostion ">
            <ul className="list-group w-100">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h4>Nom:</h4>
                <span className="badge badge-primary bg-primary badge-pill text">archiveProfs</span>
              </li>
              
              
            </ul>
            </div>
          </div>
          </SweetAlert>
        );
    };


    return (
       <div className='archive '>
           <div className='row row-cols-1 bg-light shadow pt-2 '>
                <ul className="nav nav-pills clearfix  mb-2 p-4" >
                        <li className="active " id='linkActive'><a data-toggle="pill" href="#home">Profs</a></li>
                        <li><a data-toggle="pill" href="#menu1">Cours</a></li>
                </ul>
                <div
                    id="scrollableDiv"
                    style={{
                    height: 450,
                    overflow: 'auto',
                    flexDirection: 'column-reverse',
                    }}
                    
                    >
                        
                        <InfiniteScroll
                                dataLength={5}
                                // next={this.fetchMoreData}
                                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                                inverse={true} //
                                hasMore={true}
                                // loader={<h4>Loading...</h4>}
                                scrollableTarget="scrollableDiv"
                            >  
                        {
                            <>
                                    
                                   

                                <div className="tab-content ">
                                    
                                    <div id="home" className="tab-pane fade in active">
                                    <h3>PROFESSEURS</h3>
                                        
                                        {/* <p> */}

                                            {archiveProfs.map((prof, index) => (
                                            
                                                <div  key={index} className=" mb-2 ">
                            
                                                {/* <div className="card" style={{maxWidth:'50rem',height:'8rem',backgroundColor:"#" + ((1<<24)*Math.random() | 2).toString(16)}}>
                                                    <div className="row  no-gutters">
                                                        <div className="col  ">
                                                        <img src={img1} className="" id='imgArchive' alt="..."/>
                                                        <div className="card-body">
                                                            <p className="card-text text-center">
                                                            <span className="card-text">{prof.name} {prof.matiere}</span>
                                                            <small className="text-muted"></small>
                                                            </p>
                                                        </div>
                                                        </div>
                                                        <div className="col col-sm-4 h-25">
                                                        <div className="card-body ">
                                                            <button className='btn btn-default' title='supprimer' onClick={()=>setshow(true)}> <i className="fa fa-info" aria-hidden="true"></i></button>
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
                                                                    <strong >{prof.name}</strong> <br />
                                                                    &nbsp; &nbsp;
                                                                    <em className='text  text-default'>{prof.name}</em>
                                                                    
                                                                </div>
                                                                </div>
                                                                <div className="col-6 ">
                                                                <div className="card-body">
                                                                    <p className="card-text">
                                                                    <small className="text-muted">
                                                                        <button className='btn btn-outline-warning' title='supprimer' onClick={()=> deleteArchive()} ><i className="fa fa-trash" aria-hidden="true"></i></button> &nbsp;
                                                                        <button className='btn btn-outline-success' title='detail' onClick={()=>setshow(true)}> <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                                                    </small>
                                                                    </p>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        
                            
                                                </div>          
                                                ))
                                            }
                    
                                        {/* </p> */}
                                    </div>
                                    
                                    <div id="menu1" className="tab-pane fade">
                                        <h3>COURS</h3>
                                        {/* <p> */}
                                            { archiveCours.map((cour, index) => (
                                                    
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
                                                                    <strong >{cour.cours}</strong> <br />
                                                                    &nbsp; &nbsp;
                                                                    <em className='text  text-default'>{cour.date}</em>
                                                                    
                                                                </div>
                                                                </div>
                                                                <div className="col-6 ">
                                                                <div className="card-body">
                                                                    <p className="card-text">
                                                                    <small className="text-muted">
                                                                        <button className='btn btn-outline-warning' title='edit'  ><i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                                                        <button className='btn btn-outline-primary' title='archive' > <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                                                        <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                                                    </small>
                                                                    </p>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                            
                                                     </div>    
                                    
                                                        
                                                    ))
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
    
           <br />
           </div>
       </div>
    )
}

export default Archives
