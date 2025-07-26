
import './App.css'
import {Route, Routes, useLocation} from 'react-router-dom';
import {CssBaseline,ThemeProvider} from '@mui/material';
import {ColorModeContext,useMode} from './theme'
import { useState } from 'react';
import Topbar from './global/Topbar';
import Sidebars from './global/Sidebar';
import Range from './Range/Range';
import Style from './style/Style';
import AddRange from './components/AddRange';
import AddStyle from './components/AddStyle';
import AddMaterials from './components/AddMaterials';
import Materials from './Mateials/Materials';
import MaterialsDetails from './Mateials/MaterialsDetails.jsx';
import AddBOM from './components/AddBOM';
import ExcelExport from './components/Excel.jsx';
import StyleDetails from './style/StyleDetails';
import axios from 'axios';
import { getAllStyles } from './store/styleReducer';
import { getAllCostCons } from './store/constingConsumptionReducer.js';



function App() {
    const [theme,colorMode]=useMode();
    const [isSidebar,setSidebar]=useState(true);
    const dispatch=useDispatch();
    const location=useLocation();
 
    

    // TODO: Global call which need to be align more in future.

    const  StyleData= async()=>{
      const {data}= await axios.get('http://localhost:5000/api/v1/styles');
    //  let styles=data.styles;
    //  setStyleDat(styles);
    dispatch(getAllStyles(data))
     }

     const  RangeData= async()=>{
      const {data}= await axios.get('http://localhost:5000/api/v1/range');
    //  let ranges=data.ranges;
    //  setRangeData(ranges);
   
      dispatch(getAllRanges(data));
     
  }

  const MaterialsData= async ()=>{
    const {data}= await axios.get(`http://localhost:5000/api/v1/item`
      )
      dispatch(getAllMaterials(data));
    };

      const BOMSdata= async ()=>{
    const {data}= await axios.get(`http://localhost:5000/api/v1/bom`
      )
      dispatch(getAllBoms(data));
    };

    const CostingConsumptions=async ()=>{
      const {data} = await axios.get(`http://localhost:5000/api/v1/costcons`);
      dispatch(getAllCostCons(data))
    }
    StyleData();
    MaterialsData();
    RangeData();
    BOMSdata();
    CostingConsumptions();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <div className="app">
         { location.pathname==='/login' || location.pathname==='/' ? '' :(<Sidebars isSidebar={isSidebar}/>)}
              <main className="content">
                <Topbar setIsSidebar={setSidebar}/>
                <Routes>
                  <Route path='/' element={<HomePage/>}/>;
                  <Route path="/login" element={<Login />} />
                  <Route path='/range' element={<Range/>}/>
                  <Route path='/range/:rangeId' element={<RangeDetails/>}/>
                  <Route  path='/range/new' element={<AddRange/>}/>
                  <Route  path='/range/update/:rangeId' element={<UpdateRange/>}/>

                  <Route path='/styles' element={<Style/>}/>
                 
                  <Route path='/styles/new' element={<AddStyle/>}/>
                  <Route path='/styles/:styleId' element={<StyleDetails/>}/>
                  <Route path='/styles/update/:styleId' element={<UpdateStyle/>}/>
                  <Route path='/materials/new' element={<AddMaterials/>}/>
                  <Route path='/materials' element={<Materials
                  />}/>
                   <Route path='/materials/:materialId' element={<MaterialsDetails
                  />}/>
                    <Route path='/materials/update/:materialId' element={<UpdateMaterialDetails
                  />}/>
                  <Route path='/bom/:styleId/add' element={<AddBOM
                  />}/>
                    <Route path='/bom/:styleId' element={<BOMDetails
                  />}/>

                   <Route path='/costings/:styleId' element={<CostingsConsumption
                  />}/>
                  <Route path='/dashboard' element={<Dashboard/>}/>
                  <Route path='/costcons' element={<BOMDetailsView/>}/>

                  <Route path='/excel' element={<ExcelExport/>}/>
                </Routes>

              </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
import { useDispatch } from 'react-redux';
import { getAllRanges } from './store/rangeReducer';
import { getAllMaterials } from './store/materialsReducer';
import UpdateStyle from './components/UpdateStyle';
import RangeDetails from './Range/RangeDetails';
import UpdateMaterialDetails from './Mateials/UpdateMaterialsDetails.jsx';
import BOMDetails from './bom/BomdDetails.jsx';
import CostingsConsumption from './costings/CostingConsumptions.jsx';
import UpdateRange from './components/UpdateRange.jsx';
import Login from './user/Login.jsx';
import HomePage from './Home/Home.jsx';
import { getAllBoms } from './store/bomReducer.js';
import Dashboard from './dashboard/dashboard.jsx';
import BOMDetailsView from './costings/ViewCostingCons.jsx';


export default App
