import {configureStore} from '@reduxjs/toolkit';
import rangeReducer from './rangeReducer';
import styleReducer from './styleReducer';
import materialReducer from './materialsReducer';
import bomReducer from './bomReducer';
import costingConsumption from './constingConsumptionReducer'
const store=configureStore({
    reducer:{
        range:rangeReducer,
        style:styleReducer,
        materials:materialReducer,
        boms:bomReducer,
        costingConsumption:costingConsumption
    }
})


export default store;