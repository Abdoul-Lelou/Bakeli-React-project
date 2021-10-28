import React,{useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { dbArchiveProfs, dbFirestores, dbProf } from '../../firebase';
import img1 from'../../images/img1.jpg';
import './index.css';

const ListProf = () => {

    const [dataProf, setDataProf] = useState([]);

    let dataChange= '';

    useEffect(() => {
        dbProf.get().then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataProf(data);
          dataChange =data
        });
        
    }, [dataChange])  
    
    const notify=(msg) => toast(msg);
    
    const handleEdit=()=>{

    }


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
        <div className='prof bg-light shadow w-50 mt-2'>
            <h4  className='text-start'>Professeurs</h4>
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
                    
                    <div  key={index} className="pb-2">
                      <div className="card" style={{maxWidth: '600px'}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <img src={img1} className="card-img" alt="..."/>
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
                                    <button className='btn btn-outline-warning' title='edit' onClick={()=>handleEdit(prof.id,prof.name,prof.matiere)}> <a href="#popup1"><i className="fa fa-edit" aria-hidden="true"></i></a></button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(prof.id,prof.name,prof.matiere)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
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
        </div>
    )
}

export default ListProf
