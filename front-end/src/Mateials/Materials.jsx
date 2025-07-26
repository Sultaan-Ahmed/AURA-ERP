import { Box, Button, Typography, } from '@mui/material';
import axios from 'axios';
import React, { useEffect} from 'react'
import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMaterials } from '../store/materialsReducer';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useNavigate } from 'react-router-dom';


function Materials() {
      // const theme = useTheme();
      // const colors = tokens(theme.palette.mode);
      const navigate=useNavigate();

      const dispatch=useDispatch();
      const itemsData= useSelector(state=>state.materials);

      const buttonCick=(id)=>{
        navigate(`/materials/${id}`)
      }
      
      const updateMaterialData=(id)=>{
        navigate(`/materials/update/${id}`)
      }
      
       function getRowId(row) {
        return row._id;
      }

const columns=[
        // { field: "_id", headerName: "Item ID", flex:1 },
        {
            field: "Type",
            headerName: "Type",
            flex: 1,
            cellClassName: "name-column--cell",
          },
          {
            field: "SupplierName",
            headerName: "Supplier Name",
            flex: 1,
            cellClassName: "name-column--cell",
          },
          {
            field: "MaterialInfo",
            headerName: "Material Description",
            flex: 1,
            cellClassName: "name-column--cell",
          },
          {
            field: "Article",
            headerName: "Article",
            flex: 1,
            cellClassName: "name-column--cell",
          },

        //   accessibility

        {
          field: "accessLevel",
          headerName: "Actions",
          flex: 1,
          renderCell: ({ row: { _id } }) => {
        
            return (
              <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                // backgroundColor={
                //   access === "admin"
                //     ? colors.greenAccent[600]
                //     : access === "manager"
                //     ? colors.greenAccent[700]
                //     : colors.greenAccent[700]
                // }
                borderRadius="4px"
              >
                {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {access === "manager" && <SecurityOutlinedIcon />}
                {access === "user" && <LockOpenOutlinedIcon />} */}
                {/* <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {access}
                </Typography> */}
                <Button type="button" onClick={()=>buttonCick(_id)}>
                <VisibilityOutlinedIcon sx={{color:'Green'}}/>
                </Button>
                
                <Button type="button" onClick={()=>updateMaterialData(_id)}>
                <EditRoundedIcon sx={{color:'Green'}}/>
                </Button>
                
              </Box>
            );
          },
        },
   
]

useEffect(()=>{
    if(!itemsData.items || itemsData.items.length===0){
        const itemData= async ()=>{
            const {data}= await axios.get(`http://localhost:5000/api/v1/item`
              )
              dispatch(getAllMaterials(data));
            };
            itemData();
    }
    
},[dispatch,itemsData]);


  return (
    <>
        <Box>
        <DataGrid checkboxSelection rows={itemsData.items} getRowId={getRowId} columns={columns}/>
        </Box>
    </>
  )
}

export default Materials