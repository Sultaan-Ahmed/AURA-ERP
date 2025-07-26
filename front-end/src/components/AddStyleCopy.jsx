import { Box, Button, FormControl, InputLabel, Select, TextField,  } from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";

// const AddStyle = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const [ranges,setRanges]=useState([]);
//   const [rangeId,setRangeId]=useState('');
//   const navigate=useNavigate();
 

//   const handleFormSubmit = (values) => {
//     axios.post(`http://localhost:5000/api/v1/range/style/${rangeId}`,values, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     )
//     navigate('/styles')
//     window.location.reload();
//    console.log(values)
//   };
// //   selected range handling
// const handleChange= (e)=>{
//     setRangeId(e.target.value)
 
// }

// const rangeInfo= async ()=>{
//     const {data}=  await axios.get('http://localhost:5000/api/v1/range');
//     setRanges(data.ranges)
   
   
// }
//   useEffect(()=>{
//    rangeInfo();
    
//   },[]);


//   return (
//     <>

//     <Box m="20px">
//       <Header title="Add Style" subtitle="Create a New Style." />

//         {/* Select range  */}
//     <Box width={'250px'}>
//     <FormControl variant="standard" fullWidth >
//   <InputLabel id="demo-simple-select-standard-label">Select Range</InputLabel>
//   <Select
//     labelId="demo-simple-select-standard-label"
//     id="demo-simple-select-standard-label"
//     value={rangeId}
//     label="Range"
//     onChange={handleChange}
//   >
   
//     {
        
//         ranges.map((item,index)=>(
//             <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
//         ))
//         // ranges.forEach((item,index)=>{
//         //     <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
//         // })
//     }
    
//     {/* <MenuItem value={20}>Twenty</MenuItem>
//     <MenuItem value={30}>Thirty</MenuItem> */}
//   </Select>
//   <div style={{paddingBottom:"40px"}}></div>
  
// </FormControl>
// </Box>

//         {/* Select range */}
//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={checkoutSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
//                 <TextField
//                 fullWidth
//                 variant="standard"
//                 type="text"
//                 label="Style Name"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.StyleName}
//                 name="StyleName"
//                 error={!!touched.StyleName && !!errors.StyleName}
//                 helperText={touched.StyleName && errors.StyleName}
//                 // sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                variant="standard"
//                 type="text"
//                 label="Total Order Qty"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.TotalOrderQty}
//                 name="TotalOrderQty"
//                 error={!!touched.TotalOrderQty && !!errors.TotalOrderQty}
//                 helperText={touched.TotalOrderQty && errors.TotalOrderQty}
//                 // sx={{ gridColumn: "span 4" }}
//               />
              
// <TextField
//                variant="standard"
//                 type="date"
//                 label="Order Live Date"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.OrderLiveDate}
//                 placeholder={``}
//                 InputLabelProps={{ shrink: true }}
//                 name="OrderLiveDate"
//                 error={!!touched.OrderLiveDate && !!errors.OrderLiveDate}
//                 helperText={touched.OrderLiveDate && errors.OrderLiveDate}
               
//               />
//         <TextField
//                variant="standard"
//                 type="date"
//                 label="Ex Fty Date"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.ExFtyDate}
//                 InputLabelProps={{ shrink: true }}
//                 placeholder={``}
//                 name="ExFtyDate"
//                 error={!!touched.ExFtyDate && !!errors.ExFtyDate}
//                 helperText={touched.ExFtyDate && errors.ExFtyDate}
              
//               />
// <FieldArray
//              name="ColorWiseQty"
//              sx={{gridColumn:'span 4'}}
//              render={arrayHelpers => (
//                <div>
//                  {values.ColorWiseQty && values.ColorWiseQty.length > 0 ? (
//                    values.ColorWiseQty.map((item,index) => (

//                      <div key={index} style={{color:"green", width:'100vw', display:'flex'}}>
   
//                        <Field variant="standard" label='Color Name' as={TextField} name={`ColorWiseQty.[${index}.Color]`} placeholder='Color' />
//                        <Field variant="standard" label='Color wise order qty' as={TextField} name={`ColorWiseQty.[${index}.ColorOrderQty]`} placeholder='Color Order Qty'/>
//                        <Button
//                        color="warning"
//                        variant="text"
//                          type="button" sx={{ gridColumn: "span 1" }}
//                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
//                        >
//                          Remove
//                        </Button>
//                        <Button sx={{ gridColumn: "span 1" }}
//                          type="button"
//                          variant="text"
//                          color="success"
//                          onClick={() => arrayHelpers.push( { Color: '', ColorOrderQty: '' })} // insert an empty string at a position
//                        >
//                          Add
//                        </Button>
//                      </div>
//                    ))
                  
//                  ) : (
//                    <Button type="button"
//                    variant="text"
//                    color="success" onClick={() => arrayHelpers.push('')}>
//                      {/* show this when user has removed all friends from the list */}
//                      Add a Color wise order qty
//                    </Button>
//                  )
//                  }
//                  {/* <div>
//                    <button type="submit">Submit</button>
//                  </div> */}
                
//                </div>
//              )}
//            />

//               {/* <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Last Name"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.lastName}
//                 name="lastName"
//                 error={!!touched.lastName && !!errors.lastName}
//                 helperText={touched.lastName && errors.lastName}
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Email"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.email}
//                 name="email"
//                 error={!!touched.email && !!errors.email}
//                 helperText={touched.email && errors.email}
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Contact Number"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.contact}
//                 name="contact"
//                 error={!!touched.contact && !!errors.contact}
//                 helperText={touched.contact && errors.contact}
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Address 1"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.address1}
//                 name="address1"
//                 error={!!touched.address1 && !!errors.address1}
//                 helperText={touched.address1 && errors.address1}
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Address 2"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.address2}
//                 name="address2"
//                 error={!!touched.address2 && !!errors.address2}
//                 helperText={touched.address2 && errors.address2}
//                 sx={{ gridColumn: "span 4" }}
//               /> */}
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Create New Style
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
       
    
//     </>
//   );
// };

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const AddStyleCopy = ({ onClose, initialData = null }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [ranges, setRanges] = useState([]);
  const [rangeId, setRangeId] = useState(initialData?.rangeId || '');
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      const method = initialData ? 'put' : 'post';
      const url = initialData
        ? `http://localhost:5000/api/v1/range/style/${initialData._id}`
        : `http://localhost:5000/api/v1/range/style/${rangeId}`;

      await axios[method](url, values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      navigate('/styles');
      window.location.reload();
      if (onClose) onClose(); // Close modal after success
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    setRangeId(e.target.value);
  };

  const rangeInfo = async () => {
    const { data } = await axios.get('http://localhost:5000/api/v1/range');
    setRanges(data.ranges);
  };

  useEffect(() => {
    rangeInfo();
  }, []);

  return (
    <Box m="20px">
      <Header title={initialData ? "Update Style" : "Add Style"} subtitle={initialData ? "Update an existing style" : "Create a new style"} />
      {/* Select Range Dropdown */}
      <Box width={'250px'}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="select-range-label">Select Range</InputLabel>
          <Select
            labelId="select-range-label"
            value={rangeId}
            onChange={handleChange}
            label="Range"
          >
            {ranges.map((item, index) => (
              <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
            ))}
          </Select>
          <div style={{ paddingBottom: "40px" }}></div>
        </FormControl>
      </Box>

      {/* Formik Form */}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialData || initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >
              {/* StyleName, TotalOrderQty, Dates, ColorWiseQty — same as before */}
              {/* ... Keep the rest of your form fields here */}
            </Box>

            <Box display="flex" justifyContent="end" mt="20px" gap={2}>
              <Button onClick={onClose} color="error" variant="outlined">Cancel</Button>
              <Button type="submit" color="secondary" variant="contained">
                {initialData ? "Update Style" : "Create New Style"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  StyleName: yup.string().required("Please insert style name."),
  TotalOrderQty: yup.number().required("required"),
  Colors: yup.array().required("required"),
  ColorWiseQty: yup.array().of(
    yup.object().shape({
      color:yup.string(),
      ColorOrderQty:yup.string()
    }),
   
  ),
  OrderLiveDate:yup.date(),
  ExFtyDate:yup.date()
  // OrderLiveDate:yup.date(),
  // ExFtyDate:yup.date()
  // email: yup.string().email("invalid email").required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // address1: yup.string().required("required"),
  // address2: yup.string().required("required"),
});
const initialValues = {
  StyleName: "",
  TotalOrderQty:'' ,
  Colors: [
    
  ],
  ColorWiseQty: [
    {
      Color:'',
      ColorOrderQty:''
    }
  ],
  OrderLiveDate: "",
  ExFtyDate: "",
};

export default AddStyleCopy;
