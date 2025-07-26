import { Box, Button, FormControl, Grid, InputLabel, Select, TextField,  } from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';

function AddMaterials() {
      const isNonMobile = useMediaQuery("(min-width:600px)");
   
      const navigate=useNavigate();



  
    const handleFormSubmit = async (values) => {
            try {
               await axios.post(`http://localhost:5000/api/v1/item`,values, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
              )
              navigate('/materials')
            
            } catch (error) {
              console.log(
                error.response.data
              )
            }
        };

          //  materials type
    const materilasType=['Fabric','Trims','Packaging'];
  return (
    <Box m="20px">
    <Header title="Add Item" subtitle="Create a New Item." />


    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
          {/* Select materials type */}
<FormControl variant="standard" fullWidth >
  <InputLabel id="demo-simple-select-standard-label">Select Materials Type</InputLabel>
  <Select
    labelId="demo-simple-select-standard-label"
    id="demo-simple-select-standard-label"
    value={values.Type}
    name="Type"
    label="Type"
    onChange={handleChange}
  >
    {
        
        materilasType.map((item,index)=>(
            <MenuItem key={index} value={item}>{item}</MenuItem>
        ))
        // ranges.forEach((item,index)=>{
        //     <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
        // })
    }
    
    {/* <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>

  
</FormControl>
      {/* Select materials type */}
            <TextField
             
             variant="standard"
             type="text"
             label="Supplier Name"
             onBlur={handleBlur}
             onChange={handleChange}
             value={values.SupplierName}
             name="SupplierName"
             error={!!touched.SupplierName && !!errors.SupplierName}
             helperText={touched.SupplierName && errors.SupplierName}
             
           />
           <TextField
             
            variant="standard"
             type="text"
             label="Material Description"
             onBlur={handleBlur}
             onChange={handleChange}
             value={values.MaterialInfo}
             name="MaterialInfo"
             error={!!touched.MaterialInfo && !!errors.MaterialInfo}
             helperText={touched.MaterialInfo && errors.MaterialInfo}
          
           />
            <TextField
             
            variant="standard"
             type="text"
             label="Article"
             onBlur={handleBlur}
             onChange={handleChange}
             value={values.Article}
             name="Article"
             error={!!touched.Article && !!errors.Article}
             helperText={touched.Article && errors.Article}
            //  sx={{ gridColumn: "span 4" }}
           />
           
<FieldArray
           name="itemDetails"
           sx={{display:'grid   '}}
           render={arrayHelpers => (
             <div style={{maxWidth:'100vw'}}> 
               {values.itemDetails && values.itemDetails.length > 0 ? (
                 values.itemDetails.map((item,index) => (

                   <Grid container key={index} style={{flexWrap:'wrap',width:'80vw'}}>
 
                     <Field variant="standard" label='Color' as={TextField} name={`itemDetails.[${index}.Color]`} placeholder='Color' />
                     <Field variant="standard" label='Width (cm)' as={TextField} name={`itemDetails.[${index}.Width]`} placeholder='Materials width (cm)'/>
                     <Field   variant="standard" label='Price' as={TextField} name={`itemDetails.[${index}.Price]`} placeholder='Price)'/>
                     <Field   variant="standard" label='UOM' as={TextField} name={`itemDetails.[${index}.UOM]`} placeholder='UOM'/>
                     <Field   variant="standard" label='Price Unit' as={TextField} name={`itemDetails.[${index}.PriceUnit]`} placeholder='Price Unit'/>
                     <Field variant="standard" label='MOQ' as={TextField} name={`itemDetails.[${index}.MOQ]`} placeholder='MOQ'/>
                     <Field   variant="standard" label='MCQ' as={TextField} name={`itemDetails.[${index}.MCQ]`} placeholder='MCQ'/>
                     <Field   variant="standard" label='MOQ Surcharge' as={TextField} name={`itemDetails.[${index}.MOQSurcharge]`} placeholder='MOQ Surcharge'/>
                     <Field   variant="standard" label='MCQ Surcharge' as={TextField} name={`itemDetails.[${index}.MCQSurcharge]`} placeholder='MCQ Surcharge'/>
                    
                     
                     <Button
                     color="warning"
                     variant="text"
                       type="button" sx={{ gridColumn: "span 1" }}
                       onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                     >
                       Remove
                     </Button>
                     <Button sx={{ gridColumn: "span 1" }}
                       type="button"
                       variant="text"
                       color="success"
                       onClick={() => arrayHelpers.push( { Color: '', ColorOrderQty: '' })} // insert an empty string at a position
                     >
                       Add
                     </Button>
                   </Grid>
                 ))
                
               ) : (
                 <Button type="button"
                 variant="text"
                 color="success" onClick={() => arrayHelpers.push('')}>
                   {/* show this when user has removed all friends from the list */}
                   Add Details Info
                 </Button>
               )
               }
               {/* <div>
                 <button type="submit">Submit</button>
               </div> */}
              
             </div>
           )}
         />

<TextField
             variant="standard"
              type="text"
              label="MSQ"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.MSQ}
              placeholder={``}
              InputLabelProps={{ shrink: true }}
              name="MSQ"
              error={!!touched.MSQ && !!errors.MSQ}
              helperText={touched.MSQ && errors.MSQ}
              sx={{ gridColumn: "span 4" }}
            />
      <TextField
             variant="standard"
              type="text"
              label="MSQ Surcharge"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.MSQSurcharge}
              InputLabelProps={{ shrink: true }}
              placeholder={``}
              name="MSQSurcharge"
              error={!!touched.MSQSurcharge && !!errors.MSQSurcharge}
              helperText={touched.MSQSurcharge && errors.MSQSurcharge}
              sx={{ gridColumn: "span 4" }}
            />


            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contact}
              name="contact"
              error={!!touched.contact && !!errors.contact}
              helperText={touched.contact && errors.contact}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 1"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address1}
              name="address1"
              error={!!touched.address1 && !!errors.address1}
              helperText={touched.address1 && errors.address1}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 2"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address2}
              name="address2"
              error={!!touched.address2 && !!errors.address2}
              helperText={touched.address2 && errors.address2}
              sx={{ gridColumn: "span 4" }}
            /> */}
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Item
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>

 
  )
}

const checkoutSchema = yup.object().shape({
    Type: yup.string().required("Please insert materilas type."),
    SupplierName: yup.string().required("Please insert supplier name."),
    MaterialInfo: yup.string().required("Please insert material description."),
    Article:yup.string().required('Please inssert material article number.'),
    itemDetails: yup.array().of(
      yup.object().shape({
        Color:yup.string().required('Please insert materials color.'),
        Width:yup.string().required('Please insert materials width.'),
        Price:yup.string().required('Please insert materials price.'),
        UOM:yup.string().required('Please insert materials price UOM.'),
        PriceUnit:yup.string().required('Please insert price unit.'),
        MOQ:yup.string().required('Please insert MOQ.'),
        MCQ:yup.string().required('Please insert MCQ.'),
        MOQSurcharge:yup.string().required('Please insert MOQ Surcharge.'),
        MCQSurcharge:yup.string().required('Please insert MCQ Surcharge.'),
        
      }),
     
    ),
    MSQ:yup.string().required('Please insert MSQ.'),
    MSQSurcharge:yup.string().required('Please insert MSQ surcharge.')
 
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
    Type: "",
    SupplierName:'' ,
    MaterialInfo:'',
    Article: '',
    itemDetails:[
        {
            Color:'',
            Width:'',
            Price:'',
            UOM:'',
            PriceUnit:'',
            MOQ:'',
            MCQ:'',
            MOQSurcharge:'',
            MCQSurcharge:''
        }
    ],
    MSQ:'',
    MSQSurcharge:''
  };

export default AddMaterials