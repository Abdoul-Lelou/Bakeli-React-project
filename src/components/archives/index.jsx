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
            console.log(data);
          });
          dbArchiveProfs.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setArchiveProfs(data)
            console.log(data);
          });
    }, [])

    const archive= ()=>{
        dbArchiveProfs.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setArchiveProfs(data)
            console.log(data);
          });
          
    }
    return (
       <div className='archive'>
           <div className='row row-cols-2'>
                <div
                    id="scrollableDiv"
                    style={{
                    height: 500,
                    overflow: 'auto',
                    // display: 'flex',
                    flexDirection: 'column-reverse',
                    }}
                    >
                        <h4>Archive Profs</h4>
                        <InfiniteScroll
                                dataLength={5}
                                // next={this.fetchMoreData}
                                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                                inverse={true} //
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                                scrollableTarget="scrollableDiv"
                            >  
                        {
                                archiveProfs.map((prof, index) => (
                                
                                    <div  key={index} className="pb-2">
                
                                    <div className="card" style={{maxWidth: '400px'}}>
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
                                                <small className="text-muted">
                                                    {/* <button className='btn btn-outline-warning' title='edit' onClick={()=>handleEdit(cour.id,cour.cours,cour.detail)}> <a href="#popup1"><i className="fa fa-edit" aria-hidden="true"></i></a></button> &nbsp;
                                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                                    <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button> */}
                                                </small>
                                                </p>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                
                                    </div>
                
                                    
                                ))
                        }
                        </InfiniteScroll>
                </div>
                <div
                    id="scrollableDiv"
                    style={{
                    height: 500,
                    overflow: 'auto',
                    // display: 'flex',
                    flexDirection: 'column-reverse',
                    }}
                    >
                        <h4>Archive Cours</h4>
                        <InfiniteScroll
                                dataLength={5}
                                // next={this.fetchMoreData}
                                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                                inverse={true} //
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                                scrollableTarget="scrollableDiv"
                            >  
                        {
                                archiveCours.map((cour, index) => (
                                
                                    <div  key={index} className="pb-2">
                
                                    <div className="card" style={{maxWidth: '400px'}}>
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
                                                    {/* <button className='btn btn-outline-warning' title='edit' onClick={()=>handleEdit(cour.id,cour.cours,cour.detail)}> <a href="#popup1"><i className="fa fa-edit" aria-hidden="true"></i></a></button> &nbsp;
                                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                                    <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button> */}
                                                </small>
                                                </p>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                
                                    </div>
                
                                    
                                ))
                        }
                        </InfiniteScroll>
                </div>
    
           </div>
       </div>
    )
}

export default Archives
