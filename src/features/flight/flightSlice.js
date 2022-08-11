import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFlight, addFlight, updateFlight,deleteFlight } from './flightAPI';

const initialState = {
  status: 'idle',
  flightArr1: []
};


// ------------------------------------------  -GET-  ------------------------------------------
// // call the method in the API
export const getFlightAsync = createAsyncThunk(
  'flight/getFlight',
  async () => {
    const response = await getFlight();
    return response.data;
  }
);
// ------------------------------------------  -POST-  ------------------------------------------
// // call the method in the API
export const addFlightAsync = createAsyncThunk(
  'flight/addFlight',
  async (newFlight) => {
    const response = await addFlight(newFlight);
    return response.data;
  }
);
// ------------------------------------------  -UPDATE-  ------------------------------------------
export const updateFlightAsync = createAsyncThunk(
  'flight/updateFlight',
  async (newFlight) => {
    let newBody = {
      companyName: newFlight.companyName,
      destination: newFlight.destination
    }
    let id = newFlight.id
    const response = await updateFlight(newBody, id);
    return response.data;
  }
);

// we can allsow:

// export const updateFlightAsync = createAsyncThunk(
//   'flight/updateFlight',
//   async (newFlight) => {
//     let newBody= newFlight
//     let id= newFlight.id
//     const response = await updateFlight(newBody,id);
//     return response.data;
//   }
// );

// ------------------------------------------  -DELETE-  ------------------------------------------
export const deleteFlightAsync = createAsyncThunk(
  'flight/deleteFlight',
  async (id) => {
    const response = await deleteFlight(id);
    // response.data contin empty object therfor we send id to extra reducer the line abuve dont rellevant
    return id;
    // here we return id to extra
  }
);
// ------------------------------------------  -reducers-  ------------------------------------------
export const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      // ------------------------------- - getFlightAsync - ------------------------------------------
      .addCase(getFlightAsync.pending, (state) => {
        state.status = 'loading';
        // console.log(state.status)
      })
      .addCase(getFlightAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.flightArr1 = action.payload;
      })
      // ------------------------------- - addFlightAsync - ------------------------------------------
      .addCase(addFlightAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFlightAsync.fulfilled, (state, action) => {
        state.flightArr1.push(action.payload);
        state.status = 'fulfilled';
        // console.log(state.status)
      })
      // ------------------------------- - updateFlightAsync - ------------------------------------------
      .addCase(updateFlightAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateFlightAsync.fulfilled, (state, action) => {
        let updFlight = state.flightArr1.find(flight => flight.id === action.payload.id);
        // ask eyal why thers no if statment
        updFlight.companyName = action.payload.companyName
        updFlight.destination = action.payload.destination
        state.status = 'fulfilled';
        // console.log(state.status)
      })
      // ------------------------------- - deleteFlightAsync - ------------------------------------------
      .addCase(deleteFlightAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFlightAsync.fulfilled, (state, action) => {
        state.flightArr1 = state.flightArr1.filter(flight => flight.id !== action.payload);
        state.status = 'fulfilled';
        // console.log(state.status)
      })


  }
});

// export const { increment, decrement, incrementByAmount } = flightSlice.actions;

export const selectCountStatus = (state) => state.flight.status;
export const selectFlightArr1 = (state) => state.flight.flightArr1;



// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default flightSlice.reducer;
