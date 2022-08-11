
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFlightArr1, getFlightAsync, addFlightAsync, updateFlightAsync, deleteFlightAsync } from './flightSlice';


const FlightsPage = () => {
  const flightArr1 = useSelector(selectFlightArr1);
  const dispatch = useDispatch();
  // -------------------------------------- - useStates - ---------------------------------------------
  const [companyName, setCompanyName] = useState("")
  const [destination, setDestination] = useState("")
  const [search, setSearch] = useState("")
  const [searchCompany, setSearChcompany] = useState("")
  // -------------------------------------- - useEffect-for-flightArr1 - ------------------------------
  useEffect(() => {
    dispatch(getFlightAsync())
  }, [])
  // ----------------------------------------------------------------------------------------------------------

  return (
    <div>FlightsPage

      <div style={{ backgroundColor: "cyan" }}>
        <h1>admin area</h1>
        companyName: <input onChange={(e) => setCompanyName(e.target.value)}></input>
        destination: <input onChange={(e) => setDestination(e.target.value)}></input>
        <button onClick={() => dispatch(addFlightAsync({ companyName: companyName, destination: destination }))}>Add Flight</button>
        <hr></hr>
        Search by companyName: <input onChange={(e) => (setSearChcompany(e.target.value))} />
        <br></br>
        Search by destination: <input onChange={(e) => (setSearch(e.target.value))} />
      </div>

      <h1>ELALA-AIR</h1>
      {/* <button onClick={() => dispatch(getFlightAsync())}>get flight</button> //we use useEffect insted a button */}
      flightArr1-length: {flightArr1.length}
      {/* // using filter FOR SEARCH: */}
      {flightArr1.length > 0 && flightArr1.filter((f) => (f.destination.includes(search) && f.companyName.includes(searchCompany))).map((item, i) =>
        // {flightArr1.length > 0 && flightArr1.map((item, i) =>
        <div
          key={i}> id: |{item.id}| comp: |{item.companyName}| des: |{item.destination}|   <button onClick={() => dispatch(updateFlightAsync(
            {
              id: item.id,
              companyName: companyName,
              destination: destination

            }
          ))}>Update Flight</button>

          <button onClick={() =>  dispatch(deleteFlightAsync(item.id))}>delete Flight</button>

        </div>)}
    </div>
  )
}

export default FlightsPage