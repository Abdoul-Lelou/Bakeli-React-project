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
                className='calend    m-4'
                minDate={new Date()}
                next2Label={null}
                prev2Label={null}
                showNavigation={true}
                tileDisabled={({activeStartDate, date, view }) => date.getDay() === 0}
                onClickDay={(v,e)=>(console.log(v))}
                tileClassName={tileClassName}
                defaultActiveStartDate={new Date()}

                
            />
           
            <div className='right-bar '>
                  <h6>About Teacher</h6>

                  <div className="item p-2">
                    <div className="card" style={{backgroundColor:'transparent',border: '0px'}}>
                        <div className="middle-container bg-default d-flex  justify-content-between align-items-center " id='widthContainer'>
                            <div className="dollar-div ">
                                <div className="round-div">
                                  <i className="fa fa-dollar dollar"> </i>
                                </div>
                            </div>
                            <div className="col">
                             <p className="card-text colTextName "> Mr Diatta</p>
                            <p className="card-text  colTextName" >
                                <span className="fa fa-star checked" id='fa'></span>
                                <span className="fa fa-star checked" id='fa'></span>
                                <span className="fa fa-star checked" id='fa'></span>
                                <span className="fa fa-star"></span>
                            </p>
                            </div>
                        </div>
                        
                    </div>
                  </div>

                  <div className="row row-cols-2 mx-0 ">

                      <div className="col">

                      <pre className='text-start bgPre card m-2 w-75'>
                          Completed
                          <p className='text-start'>
                            
                            Courses</p>
                          {/* <p className='text-start border w-25' id='chiffre'>12</p> */}
                          12
                        </pre> 

                        <pre className='text-start bgPre card m-2 w-75'>
                          Completed
                          <p className='text-start'>
                            
                            Courses</p>
                          {/* <p className='text-start border w-25' id='chiffre'>12</p> */}
                          12
                        </pre> 


                      </div>

                      <div className="col ">

                        <pre className='text-start card bgPre m-2 w-75'>
                          Completed
                          <p className='text-start'>
                            
                            Courses</p>
                          {/* <p className='text-start border w-25' id='chiffre'>12</p> */}
                          12
                        </pre> 

                        <pre className='text-start bgPre card m-2 w-75'>
                          Completed
                          <p className='text-start'>
                            
                            Courses</p>
                          {/* <p className='text-start border w-25' id='chiffre'>12</p> */}
                          12
                        </pre> 


                      </div>
                  
               </div>
            </div>         
        </div>
    )
}

export default MainRight
