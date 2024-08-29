
import React, { useEffect, useState } from "react";
import './../styles/App.css';
import Axios from "axios";
import 'regenerator-runtime/runtime';
const App = () => {
  const [apiData, setApiData] = useState([])
  const [fetchOn, setFetchOn] = useState(false)
  const [dataGot, setDataGot] = useState(false)


  const fetchData = async () => {
    try {
      const data = await Axios.get('https://reqres.in/api/users')
      setApiData(data.data.data)
      setFetchOn(true)
      console.log(data.data.data);
    }
    catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (apiData.length > 0) {
      setDataGot(true);
    }
  }, [apiData]);
  return (
    <div id='main' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',  width: '60%', margin: 'auto', marginTop: '50px' }}>
      <nav id='header' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span id='title' style={{
          fontSize: '30px', fontWeight: '400'
        }}>Blue Whales</span>
        <button
          className="btn"
          style={{
            border: 'none',
            padding: '10px',
            margin: '0',
            boxSizing: 'border-box',
            width: '150px',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          Get User List
        </button>
      </nav>
      <table id='table'>
        <tbody id='tbody'>
          <tr className='tr'>
            <th className="th" id='firstName'>First Name</th>

            <th className="th" id='lastName'>Last Name</th>

            <th className="th" id='email'>Email</th>

            <th className="th" id='avatar'>Avatar</th>
          </tr>
          {
            dataGot && (
              apiData.map((data) => {
                return (
                  <tr className="tr" key={data.id}>
                    <td className="td" id='firstName'>{data.first_name}</td>
                    <td className="td" id='lastName'>{data.last_name}</td>
                    <td className="td" id='email'>{data.email}</td>
                    <td className="td" id='avatar'><img src={data.avatar} alt="avatar" id="image" /></td>
                  </tr>
                )
              })

            )
            }
        </tbody>
      </table>
      {
        !dataGot && <h3 >No data found to display</h3>
      }

    </div>
  )
}

export default App
