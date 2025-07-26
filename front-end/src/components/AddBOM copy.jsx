import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Formik, Form } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../components/Header";
import { useSelector } from "react-redux";
import MaterialsDetails from "../Mateials/MaterialsDetails";

const AddBOM = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const items = useSelector((state) => state.materials.items);

  const handleFormSubmit = async (values) => {
    console.log(values);
    // await axios.put(`http://localhost:5000/api/v1/style/${styleId}/bom`, values, {
    //   headers: { "Content-Type": "application/json" },
    // });
    // navigate(`/bom/${bomId}`);
    // window.location.reload();
  };

  // const MaterialhandleChange= (e)=>{
  //   setItem(prevState=>({
  //     ...prevState,
  //     MaterialInfo:e.target.value
  //   }))
  // }
  // if (!fabricData) return <div>Loading BOM details...</div>;

  return (
    <Box m="20px">
      <Header title="Add BOM" subtitle="Add BOM Information." />
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
      ></Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={BOMSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {/* Select Supplier Name */}
                {/* <FormControl variant="standard" fullWidth >
  <InputLabel id="demo-simple-select-standard-label">Select Supplier Name</InputLabel>
  <Select
    labelId="demo-simple-select-standard-label"
    id="demo-simple-select-standard-label"
    value={values.SupplierName}
    label="SupplierName"
    name="SupplierName"
    onChange={handleChange}
    onBlur={handleBlur}
    error={!!touched.SupplierName && !!errors.SupplierName}
    
  >
    {
        
        items.map((item,index)=>(
            <MenuItem key={index} value={item.SupplierName}>{item.SupplierName}</MenuItem>
            
        ))
    }
    
   
  </Select>
 
  </FormControl> */}

                {/* Select type of Materials */}
                {/* <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Materials
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard-label"
                    value={values.MaterialInfo}
                    label="MaterialInfo"
                    name="MaterialInfo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.MaterialInfo && !!errors.MaterialInfo}
                  >
                    {materialsDetails.map((item, index) => (
                      <MenuItem key={index} value={item.MaterialInfo}>
                        {item.MaterialInfo}
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ paddingBottom: "40px" }}></div>
                </FormControl> */}

                {/* Select Article */}

                {/* <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Article
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard-label"
                    value={values.Article}
                    label="Article"
                    name="Article"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Article && !!errors.Article}
                  >
                    {materialArticle.map((item, index) => (
                      <MenuItem key={index} value={item.Article}>
                        {item.Article}
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ paddingBottom: "40px" }}></div>
                </FormControl> */}

                {/* Select Color */}

                {/* <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Color(S)
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard-label"
                    value={values.Color}
                    label="Color"
                    name="Color"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Color && !!errors.Color}
                  >
                    {itemDetail[0]?.itemDetails.map((item, index) => (
                      <MenuItem key={index} value={item.Color}>
                        {item.Color}
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ paddingBottom: "40px" }}></div>
                </FormControl> */}

                {/* Select Width */}
                {/* <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Width(s)
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard-label"
                    value={values.Width}
                    label="Width"
                    name="Width"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Width && !!errors.Width}
                  >
                    {itemDetail[0]?.itemDetails.map((item, index) => (
                      <MenuItem key={index} value={item.Width}>
                        {item.Width}
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ paddingBottom: "40px" }}></div>
                </FormControl> */}
                {/* <TextField
                  variant="standard"
                  fullWidth
                  label="Placement"
                  name="Placement"
                  value={values?.Placement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.Placement && !!errors.Placement}
                  helperText={touched.Placement && errors.Placement}
                /> */}
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  BOM Details
                </Typography>
                <FieldArray
                  name="itemDetails"
                  render={(arrayHelpers) => (
                    <div>
                      {values.BOMDetails && values.BOMDetails.length > 0 ? (
                        values.BOMDetails.map((item, index) => {
                          const materialsDetails = items.filter(
                            (i) =>
                              i.SupplierName == values.BOMDetails.SupplierName
                          );

                       
                         
                          return (
                            <Box key={index} display="flex" gap={2} mb={2}>
                              {/* Select Supplier Name */}
                              <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">
                                  Select Supplier Name
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard-label"
                                  value={values.SupplierName}
                                  label="SupplierName"
                                  name={`BOMDetails[${index}].SupplierName`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    !!touched.SupplierName &&
                                    !!errors.SupplierName
                                  }
                                >
                                  {items.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={item.SupplierName}
                                    >
                                      {item.SupplierName}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              {/* Select type of Materials */}
                              <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">
                                  Select Materials
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard-label"
                                  value={values.MaterialInfo}
                                  label="MaterialInfo"
                                  name={`BOMDetails[${index}].MaterialInfo`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    !!touched.MaterialInfo &&
                                    !!errors.MaterialInfo
                                  }
                                >
                                  {materialsDetails.map((item, index) => (
                                    <MenuItem
                                      key={index}
                                      value={item.MaterialInfo}
                                    >
                                      {item.MaterialInfo}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <div style={{ paddingBottom: "40px" }}></div>
                              </FormControl>
                              <TextField
                                label="Color"
                                name={`itemDetails[${index}].Color`}
                                variant="standard"
                                value={item.Color}
                                onChange={handleChange}
                              />
                              <Button
                                variant="text"
                                color="error"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>
                              <Button
                                variant="text"
                                color="success"
                                onClick={() =>
                                  arrayHelpers.push({
                                    SupplierName: "",
                                    MaterialInfo: "",
                                    Article: "",
                                    Color:
                                      "" /**TODO: In future we will add array of Color here. **/,
                                    Width:
                                      "" /**TODO: In future we will add array of width here. **/,
                                    Placement: "",
                                  })
                                }
                              >
                                Add
                              </Button>
                            </Box>
                          );
                        })
                      ) : (
                        <Button
                          variant="text"
                          onClick={() =>
                            arrayHelpers.push({
                              SupplierName: "",
                              MaterialInfo: "",
                              Article: "",
                              Color:
                                "" /**TODO: In future we will add array of Color here. **/,
                              Width:
                                "" /**TODO: In future we will add array of width here. **/,
                              Placement: "",
                            })
                          }
                        >
                          Add Item
                        </Button>
                      )}
                    </div>
                  )}
                />
              </Box>

              <Box display="flex" justifyContent="end" mt={4}>
                <Button type="submit" variant="contained" color="secondary">
                  Create BOM
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

const BOMSchema = yup.object().shape({
  SupplierName: yup.string().required("Supplier name is required"),
  Article: yup.string().required("Article is required"),
  MaterialInfo: yup.string().required("Material info is required"),
  Type: yup.string().required("Type is required"),
  MSQ: yup.number().required("MSQ is required"),
  MSQSurcharge: yup.number().required("MSQ Surcharge is required"),
  itemDetails: yup.array().of(
    yup.object().shape({
      Color: yup.string().required("Required"),
      Width: yup.string().required("Required"),
      Price: yup.number().required("Required"),
      UOM: yup.string().required("Required"),
      PriceUnit: yup.string().required("Required"),
      MOQ: yup.number().required("Required"),
      MCQ: yup.number().required("Required"),
      MOQSurcharge: yup.number().required("Required"),
      MCQSurcharge: yup.number().required("Required"),
    })
  ),
});

const initialValues = {
  RangeID: "",
  StyleID: "",
  BOMDetails: [
    {
      SupplierName: "",
      MaterialInfo: "",
      Article: "",
      Color: "" /**TODO: In future we will add array of Color here. **/,
      Width: "" /**TODO: In future we will add array of width here. **/,
      Placement: "",
    },
  ],
};

export default AddBOM;
