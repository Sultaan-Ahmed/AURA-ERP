import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    success: true,
    noOfItems: 0,
    items: [ ],
}

const materialReducer= createSlice({
    name:'materials',
    initialState,
    reducers:{
        getAllMaterials(state,action){
            state.loading=false;
            state.noOfItems=action.payload.noOfItems;
            state.success=action.payload.success;
            state.items=action.payload.items;
        }
    }
});


export const {getAllMaterials}= materialReducer.actions;
export default materialReducer.reducer;