import React,{useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import img1 from '../../images/img1.jpg'
import './index.css';

const MainRight = () => {

    const [value, setCalendar] = useState(new Date());
  

    const tileClassName=({ date, view })=> {
        // Add class to tiles in month view only
  
        if (view === 'month') {
            setCalendar()
          // Check if a date React-Calendar wants to check is on the list of dates to add class to
        //   if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
        //     return 'myClassName';
        //   }
        }
      }

    return (
        <div className='mainRight   border border-success'>
            
            
            <Calendar
                onChange={setCalendar}
                value={value}
                className='calend w-75 p-4 m-4'
               
                tileClassName={tileClassName}
                defaultActiveStartDate={new Date()}

                
            />
           
            <div className='right-bar '>
                  <h6>About Teacher</h6>

                  <div className="item p-2">
                    <div class="card" style={{backgroundColor:'transparent',border: '0px'}}>
                        <div class="middle-container d-flex w-75 justify-content-between align-items-center ">
                            <div class="dollar-div px-3">
                                <div class="round-div">
                                  <i class="fa fa-dollar dollar"> </i>
                                </div>
                            </div>
                            <div class="col">
                              Mr Diatta
                            <p className="card-text ">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                            </p>
                            </div>
                        </div>
                        
                    </div>
                  </div>

                  <div className="row row-cols-2 mx-0 p-2 mb-2">

                   
                   <div className='item'>
                        <div class="card" style={{backgroundColor:'transparent', border:'0px'}}>
                            <div class="middle-container  d-flex justify-content-between align-items-center " id='displayCol'>
                                <div class="dollar-div">
                                    <div class="round-div">
                                      <i class="fa fa-dollar dollar"> </i>
                                    </div>
                                </div>
                                <div class="col">
                                  <b className='name'>Mr Diatta</b>
                                <p className="card-text displaytext">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                      <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                </p>
                                </div>
                            </div>
                            
                        </div>
                   </div>

                   <div className='item'>
                        <div class="card" style={{backgroundColor:'transparent', border:'0px'}}>
                            <div class="middle-container  d-flex justify-content-between align-items-center " id='displayCol'>
                                <div class="dollar-div">
                                    <div class="round-div">
                                      <i class="fa fa-dollar dollar"> </i>
                                    </div>
                                </div>
                                <div class="col">
                                  <b className='name'>Mr Diatta</b>
                                <p className="card-text displaytext">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                      <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                </p>
                                </div>
                            </div>
                            
                        </div>
                   </div>

                   <div className='item' >
                        <div class="card" style={{border: '0px'}}>
                            <div class="middle-container  d-flex justify-content-between align-items-center " id='displayCol'>
                                <div class="dollar-div">
                                    <div class="round-div">
                                      <i class="fa fa-dollar dollar"> </i>
                                    </div>
                                </div>
                                <div class="col">
                                  <b className='name'>Mr Diatta</b>
                                <p className="card-text displaytext">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                      <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                </p>
                                </div>
                            </div>
                            
                        </div>
                   </div>

                   <div className='item' >
                        <div class="card" style={{backgroundColor:'transparent', border:'0px'}}>
                            <div class="middle-container  d-flex justify-content-between align-items-center " id='displayCol'>
                                <div class="dollar-div">
                                    <div class="round-div">
                                      <i class="fa fa-dollar dollar"> </i>
                                    </div>
                                </div>
                                <div class="col">
                                  <b className='name'>Mr Diatta</b>
                                <p className="card-text displaytext">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                      <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                </p>
                                </div>
                            </div>
                            
                        </div>
                   </div>
                  

               </div>
            </div>         
        </div>
    )
}

export default MainRight
