import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Header from "../components/Header";
import { useEffect } from "react";
import axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import { getAllRanges } from "../store/rangeReducer";
import { useNavigate } from "react-router-dom";



const Range = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch=useDispatch();
  const range=useSelector(state=>state.range);
  const navigate=useNavigate();

 function getRowId(row) {
  return row._id;
}

const buttonCick=(id)=>{
  navigate(`/range/${id}`)
}

const updateRangeData=(id)=>{
  navigate(`/range/update/${id}`)
}

 useEffect(()=>{
  if(!range.ranges || range.ranges.length === 0){
    const  serverData= async()=>{
      const {data}= await axios.get('http://localhost:5000/api/v1/range');
    //  let ranges=data.ranges;
    //  setRangeData(ranges);
   
      dispatch(getAllRanges(data));
     
  }
  serverData();
 
 }

 },[dispatch,range.ranges])


  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Range Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
      {
      field: "CustomerName",
      headerName: "Customer Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "CurrentStage",
      headerName: "Current Stage",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "TotalOrderQty",
      headerName: "Total Order Qty",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "VendorName",
      headerName: "Vendor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "accessLevel",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
    
        return (
          <Box
            width="100%"
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
            <Button type="button" style={{minWidth:'10px'}} onClick={()=>buttonCick(_id)}>
            <VisibilityOutlinedIcon sx={{color:'Green'}}/>
            </Button>
            
            <Button type="button" style={{minWidth:'10px'}} onClick={()=>updateRangeData(_id)}>
            <EditRoundedIcon sx={{color:'Green'}}/>
            </Button>

            <Button type="button" style={{minWidth:'10px'}} onClick={()=>updateRangeData(_id)}>
            <GridDeleteIcon sx={{color:'Green'}}/>
            </Button>
            
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Ranges" subtitle="Welcome to all range page." />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.primary[100],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection getRowId={getRowId} rows={range.ranges} columns={columns} />
      </Box>
    </Box>
  );
};

export default Range;
