import { createSlice } from "@reduxjs/toolkit";

const initialState={
    success:true,
    boms:[],
    NumOfBoms:0
};
const bomReducer=createSlice({
    name:'bom',
    initialState,
    reducers:{
        getAllBoms(state,action){
            state.success=action.payload.success;
           state.boms=action.payload.boms;
        }
    }
})

export const {getAllBoms}=bomReducer.actions;
export default bomReducer.reducer;