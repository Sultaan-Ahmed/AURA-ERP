import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Header from "../components/Header";
import { useEffect} from "react";
import axios from 'axios';
import { useDispatch,useSelector } from "react-redux";
import { getAllStyles } from "../store/styleReducer";
import { useNavigate } from "react-router-dom";




const Style = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
const dispatch=useDispatch();
const styleData= useSelector(state=>state.style);
const navigate=useNavigate();

const buttonCick=(id)=>{
  navigate(`/styles/${id}`)
}

const updateStyleData=(id)=>{
  navigate(`/styles/update/${id}`)
}

 function getRowId(row) {
  return row._id;
}
 useEffect(()=>{
if(!styleData.styles || styleData.styles.length===0){
  const  serverData= async()=>{
    const {data}= await axios.get('http://localhost:5000/api/v1/styles');
  //  let styles=data.styles;
  //  setStyleDat(styles);
  dispatch(getAllStyles(data))
   }
   serverData();
}
 
 },[dispatch,styleData.styles])


  const columns = [
    // { field: "_id", headerName: "ID", flex:1 },
    // {
    //   field: "StyleName",
    //   headerName: "Style Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
  
    { field: "RangeId", headerName: "Range Name", flex:1 },
    {
      field: "StyleName",
      headerName: "Style Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "TotalOrderQty",
      headerName: "Totat Order Qty",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "OrderLiveDate",
      headerName: "Order Live Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "ExFtyDate",
      headerName: "Ex FTY Date",
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
            
            <Button type="button" onClick={()=>updateStyleData(_id)}>
            <EditRoundedIcon sx={{color:'Green'}}/>
            </Button>
            
          </Box>
        );
      },
    },
  ];

  return (
    <>
    <Box m="20px">
      <Header title="Styles" subtitle="Welcome to all styels page." />
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
            color: colors.greenAccent[300],
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
        <DataGrid checkboxSelection getRowId={getRowId} rows={styleData.styles} columns={columns} />
      </Box>
    </Box>

    </>
  );
  
};

export default Style;
