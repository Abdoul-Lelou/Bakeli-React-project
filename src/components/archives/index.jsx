import React,{useEffect,useState} from 'react';
import './index.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { dbArchive, dbArchiveProfs } from '../../firebase';
import img1 from '../../images/img1.jpg';


const Archives = () => {

    const [archiveCours, setArchiveCours] = useState([]);
    const [archiveProfs, setArchiveProfs] = useState([]);


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
    return (
       <div className='archive'>
           <div className='row row-cols-1 bg-light shadow pt-4'>
                    <ul className="nav nav-pills clearfix mb-2 p-4" >
                            <li className="active"><a data-toggle="pill" href="#home">Profs</a></li>
                            <li><a data-toggle="pill" href="#menu1">Cours</a></li>
                    </ul>
                <div
                    id="scrollableDiv"
                    style={{
                    height: 500,
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
                                    
                                   

                                    <div className="tab-content w-100">
                                        <div id="home" className="tab-pane fade in active">
                                            <h3>APPRENANTS</h3>
                                            <p>

                                                {archiveProfs.map((prof, index) => (
                                                
                                                    <div  key={index} className="pb-2  ">
                                
                                                    <div className="card" style={{maxWidth: '600px'}}>
                                                        <div className="row no-gutters">
                                                            <div className="col ">
                                                            <img src={img1} className="" id='imgArchive' alt="..."/>
                                                            <div className="card-body">
                                                                <p className="card-text text-center">
                                                                <span className="card-text">{prof.name} {prof.matiere}</span>
                                                                <small className="text-muted"></small>
                                                                </p>
                                                            </div>
                                                            </div>
                                                            <div className="col-6">
                                                            <div className="card-body">
                                                                <p className="card-text">
                                                                <small className="text-muted">
                                                                <button className='btn btn-danger' title='supprimer' > <i className="fa fa-trash" aria-hidden="true"></i></button>

                                                                </small>
                                                                </p>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                
                                                    </div>          
                                                    ))
                                                }
                        
                                            </p>
                                        </div>
                                        <div id="menu1" className="tab-pane fade">
                                            <h3>COURS</h3>
                                            <p>
                                                { archiveCours.map((cour, index) => (
                                                        
                                                            <div  key={index} className="pb-2">
                                        
                                                            <div className="card" style={{maxWidth: '600px'}}>
                                                                <div className="row no-gutters">
                                                                    <div className="col ">
                                                                    <img src={img1} id='imgArchive' className="" alt="..."/>
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
                                                                            
                                                                            <button className='btn btn-danger' title='supprimer' > <i className="fa fa-trash" aria-hidden="true"></i></button>
                                                                        </small>
                                                                        </p>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                </div>
                                        
                                                            </div>
                                        
                                                            
                                                        ))
                                                }
                                            </p>
                                        </div>   
                                    </div>
                            
                            </>
                        }
                        </InfiniteScroll>
                </div>
                
    
           </div>
       </div>
    )
}

export default Archives
