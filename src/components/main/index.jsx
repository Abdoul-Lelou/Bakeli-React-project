import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {dbCours,dbArchive,dbFirestores} from "../../firebase";
import img1 from '../../images/img1.jpg'
import './index.css';

const Main = () => {

  const [dataCours, setDataCours] = useState([]);
  const [search, setSearch] = useState('');
  const [courEdit, setCourEdit] = useState('');
  const [detailEdit, setdEtailEdit] = useState('');
  const [editId, setEditId] = useState('');
  const [dataSearch, setdataSearch] = useState([]);
  const route= useHistory();
   let dataChange= '';

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

    const filterSearch=()=>{
        let dataFind= []

        dataCours.map((data,index)=>{
          if (search.toUpperCase() === data.cours.toUpperCase() && search !=='' ) {
            dataFind.push(data)
            setdataSearch(dataFind)
          }
        })
    }

    const handleEdit=(id,cour,detail)=>{
      setEditId('');
        setCourEdit(cour);
        setdEtailEdit(detail);
        setEditId(id);
       setTimeout(() => {
        console.log(editId)
       }, 2000);
    }

    const handleEditClick=(id,cour,detail)=>{
          console.log(editId)
    //   dbCours.doc(id).set({cour,detail}).then(resp=>{
    //     notify();
    //  })
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
                                    <button className='btn btn-outline-warning' title='edit' onClick={()=>handleEdit(cour.id,cour.cours,cour.detail)}> <a href="#popup1"><i className="fa fa-edit" aria-hidden="true"></i></a></button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
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
                      {console.log(cour)}
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
                                    <button className='btn btn-outline-warning' title='edit' onClick={()=>handleEdit(cour.id,cour.cours,cour.detail)}> <a href="#popup1"><i className="fa fa-edit" aria-hidden="true"></i></a></button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
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
            {/* Same as */}
            <ToastContainer />
{/*             
            <div class="box">
              <a class="button" href="#popup1">Let me Pop up</a>
            </div> */}

                      <div id="popup1" className="overlay">
                        <div className="popup">
                          <a className="close" href="#">&times;</a>
                          <div className="content">
                          <form id="contact" onSubmit={()=>handleEditClick(editId,courEdit,detailEdit)}>
                              <h6>AJOUTER UN COURS</h6>
                              <fieldset>
                                <input placeholder=" Cours" type="text" tabIndex="2" value={courEdit} required onChange={(e)=>setCourEdit(e.target.value)}/>
                              </fieldset>
                              <fieldset>
                                <input placeholder=" detail" type="text" tabIndex="2" value={detailEdit} required onChange={(e)=>setdEtailEdit(e.target.value)}/>
                              </fieldset>
                              <fieldset>
                                  <button type="submit"> Editer</button>
                              </fieldset>
                            </form>
                          </div>
                        </div>
                      </div>
           
                  
        </div>
    )
}

export default Main
