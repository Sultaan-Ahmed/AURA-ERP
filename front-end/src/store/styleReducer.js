import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:true,
    success:false,
    NoOfStyles:0,
    styles:[]
}

const styleReducer=createSlice({
    name:'style',
    initialState,
    reducers:{
        getAllStyles(state,action){
            state.success=action.payload.success;
            state.NoOfStyles=action.payload.NoOfStyles;
            state.styles=action.payload.styles;
            state.loading=false;
        }
    }
});


export const {getAllStyles} = styleReducer.actions;
export default styleReducer.reducer;
