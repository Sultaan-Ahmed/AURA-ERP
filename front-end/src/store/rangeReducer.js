import { createSlice } from "@reduxjs/toolkit";

const initialState={
    success:true,
    ranges:[],
    NumOfRanges:0
};
const rangeReducer=createSlice({
    name:'range',
    initialState,
    reducers:{
        getAllRanges(state,action){
            state.success=action.payload.success;
            state.NumOfRanges=action.payload.NumOfRanges;
           state.ranges=action.payload.ranges;
        }
    }
})

export const {getAllRanges}=rangeReducer.actions;
export default rangeReducer.reducer;