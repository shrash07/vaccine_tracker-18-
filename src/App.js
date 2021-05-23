import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = React.useState({ centers: [] });
  const [ref, setRef] = React.useState()

  const refreshPage = () => {
    setInterval(() => {
      setRef(true);
      console.log(ref)
    }
      , 60000);
  }

  // const val = true

  const Display = (props) => {
    return (
      <tr className='text-white d-flex justify-content-center'>
        <td className='p-3 h6' style={{ border: '2px solid white', width: '170px' }}>{props.name}</td>
        <td className='p-3 h6' style={{ border: '2px solid white', width: '170px' }}>{props.pin}</td>
        <td className='p-3 h6' style={{ border: '2px solid white', width: '170px' }}>{props.fee}</td>
        <td className='p-3 h6' style={{ border: '2px solid white', width: '170px' }}>{props.age}</td>
        <td className='p-3 h6' style={{ border: '2px solid white', width: '170px' }}>{props.vaccine}</td>
        <td className='p-3 h6' style={{ border: '2px solid white', width: '170px' }}>{props.dose1}</td>
        <td className='p-3 h6' style={{ border: '2px solid white', width: '170px' }}>{props.dose2}</td>
        <td className='p-3 h6' style={{ border: '2px solid white', width: '170px' }}>{props.date}</td>
      </tr>
    );
  }
  const DisplayData = () => {
    return (data.centers.map((element) => {
      if (element.fee_type !== 'Free') {
        return element.sessions.map(point => {
          if (point.min_age_limit === 18 && point.vaccine === 'COVISHIELD')
            return <Display name={element.name} pin={element.pincode} fee={element.fee_type} age={point.min_age_limit} vaccine={point.vaccine} dose1={point.available_capacity_dose1} dose2={point.available_capacity_dose2} date={point.date} />
        })
      }
    })
    )
  }
  React.useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    const req = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=294&date=' + today;

    axios.get(req)
      .then(response => {
        // console.log(response)
        const res = response.data;

        setData(res)

        // console.log(data);


      })
  }, [ref])


  const getData = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    const req = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict/?district_id=265&date=' + today;

    axios.get(req)
      .then(response => {
        console.log(response)
        const res = response.data;
        setData(res)
        console.log(data);
      })
  }

  return (
    <div className='' style={{ backgroundColor: '#12123a', minHeight: '100vh' }}>
      <div className='container-fluid'>
        <div className='text-center pb-5' style={{ width: '100%' }}>
          <h1 className='p-5 text-warning'>Vaccine Tracker</h1>
          <button onClick={getData} className='btn btn-outline-danger mb-5 rounded-pill' style={{ width: 170 }}>Refresh</button>
          <table className='' >
            <thead className='text-warning d-flex justify-content-center'>
              <th>
                <td className='p-3 h4' style={{ border: '2px solid white', width: '170px' }}>
                  Place
                </td>
                <td className='p-3 h4' style={{ border: '2px solid white', width: '170px' }}>
                  Pincode
                </td>
                <td className='p-3 h4' style={{ border: '2px solid white', width: '170px' }}>
                  Fee
                </td>
                <td className='p-3 h4' style={{ border: '2px solid white', width: '170px' }}>
                  Age
                </td>
                <td className='p-3 h4' style={{ border: '2px solid white', width: '170px' }}>
                  Vaccine
                </td>
                <td className='p-3 h4' style={{ border: '2px solid white', width: '170px' }}>
                  Dose1
                </td>
                <td className='p-3 h4' style={{ border: '2px solid white', width: '170px' }}>
                  Dose2
                </td>
                <td className='p-3 h4' style={{ border: '2px solid white', width: '170px' }}>
                  Date
                </td>
              </th>
            </thead>
            <tbody className="mb-5">
              {DisplayData()}
            </tbody>
          </table>
        </div>
      </div>
      {refreshPage()}
    </div>
  );
}

export default App;
