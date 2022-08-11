
// here we build the CRUD:
import axios from "axios"
const MY_SERVER_FLIGHTS = 'http://localhost:3005/flights/'
// ------------------------------- - get - ------------------------------------------
// A mock function to mimic making an async request for data
export function getFlight() {
  return new Promise((resolve) =>
    // setTimeout(() => resolve({ data: amount }), 1500)
    axios(MY_SERVER_FLIGHTS).then((res) => resolve({ data: res.data }))
  );
}
// ------------------------------- - post - ------------------------------------------
export function addFlight(newFlight) {
  return new Promise((resolve) =>
    axios.post(MY_SERVER_FLIGHTS, newFlight).then((res) => resolve({ data: res.data }))
  );
}
// ------------------------------- - put - ------------------------------------------
export function updateFlight(newBody, id) {
  console.log(newBody, id)
  return new Promise((resolve) =>
    axios.put(MY_SERVER_FLIGHTS + id, newBody).then((res) => resolve({ data: res.data }))
  );
}
// ------------------------------- - delete - ------------------------------------------

export function deleteFlight(id) {
  return new Promise((resolve) =>
    axios.delete(MY_SERVER_FLIGHTS + id).then((res) => resolve({ data: res.data }))
  );
}
