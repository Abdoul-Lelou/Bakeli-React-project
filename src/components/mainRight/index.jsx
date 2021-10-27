import React,{useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import img1 from '../../images/img1.jpg'
import './index.css';

const MainRight = () => {

    const [value, setCalendar] = useState(new Date());
     
    const calendarChange=(e)=>{
        console.log(e)
    }

    const tileClassName=({ date, view })=> {
        // Add class to tiles in month view only
        console.log('object')
        if (view === 'month') {
            setCalendar()
          // Check if a date React-Calendar wants to check is on the list of dates to add class to
        //   if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
        //     return 'myClassName';
        //   }
        }
      }

    return (
        <div className='mainRight '>
            mainRight
            {/* <div className='bg-light'> */}
            <Calendar
                onChange={setCalendar}
                value={value}
                className='calend w-75 m-4 mx-5'
                showNavigation='false'
                tileClassName={tileClassName}
                defaultActiveStartDate={new Date()}
                style={{border: 'none'}}
            />
            {/* </div> */}
            <div className="card" style={{maxWidth: '350px'}}>
                        <div className="row no-gutters">
                          <div className="col ">
                            <img src={img1} className="card-img" alt="..."/>
                            <div className="card-body">
                              <p className="card-text text-center">
                               <span className="card-text">Card title</span>
                                <small className="text-muted">  </small>
                              </p>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="card-body">
                              <p className="card-text">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
        </div>
    )
}

export default MainRight
