import { createSlice } from "@reduxjs/toolkit";

const initialState={
    success:true,
    ConstingConsumption:[],
   
};
const ConstingConsumption=createSlice({
    name:'CostingConsumption',
    initialState,
    reducers:{
        getAllCostCons(state,action){
            state.success=action.payload.success;
           state.ConstingConsumption=action.payload.costingConsumptions;
        }
    }
})

export const {getAllCostCons}=ConstingConsumption.actions;
export default ConstingConsumption.reducer;