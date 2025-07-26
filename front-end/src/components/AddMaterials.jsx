import {
  Box, Button, FormControl, Grid, InputLabel, Select,
  TextField, MenuItem, Card
} from "@mui/material";
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddMaterials() {
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      await axios.post(`http://localhost:5000/api/v1/item`, values, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate('/materials');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const materilasType = ['Fabric', 'Trims', 'Packaging'];

  return (
    <Box m="20px">
      <Header title="Add Item" subtitle="Create a New Item." />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl style={{minWidth:'200px'}} variant="standard">
                  <InputLabel>Select Materials Type</InputLabel>
                  <Select
                    name="Type"
                    value={values.Type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Type && !!errors.Type}
                  >
                    {materilasType.map((item, i) => (
                      <MenuItem key={i} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {["SupplierName", "MaterialInfo", "Article"].map((name) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    fullWidth
                    variant="standard"
                    name={name}
                    label={name.replace(/([A-Z])/g, ' $1').trim()}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[name] && !!errors[name]}
                    helperText={touched[name] && errors[name]}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <FieldArray name="itemDetails">
                  {({ push, remove }) => (
                    <Box>
                      {values.itemDetails.length === 0 && (
                        <Button
                          type="button"
                          variant="text"
                          color="success"
                          onClick={() =>
                            push({
                              Color: '', Width: '', Price: '',
                              UOM: '', PriceUnit: '', MOQ: '', MCQ: '',
                              MOQSurcharge: '', MCQSurcharge: ''
                            })
                          }
                        >
                          Add Details Info
                        </Button>
                      )}
                      {values.itemDetails.map((_, index) => (
                        <Card key={index} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 2 }}>
                          <Grid container spacing={2}>
                            {["Color", "Width", "Price", "UOM", "PriceUnit", "MOQ", "MCQ", "MOQSurcharge", "MCQSurcharge"].map((field) => (
                              <Grid item xs={12} sm={6} md={4} key={field}>
                                <Field
                                  as={TextField}
                                  name={`itemDetails[${index}].${field}`}
                                  label={field.replace(/([A-Z])/g, ' $1').trim()}
                                  fullWidth
                                  variant="standard"
                                  onChange={handleChange}
                                  error={!!getIn(touched, `itemDetails[${index}].${field}`) && !!getIn(errors, `itemDetails[${index}].${field}`)}
                                  helperText={getIn(touched, `itemDetails[${index}].${field}`) && getIn(errors, `itemDetails[${index}].${field}`)}
                                />
                              </Grid>
                            ))}
                            <Grid item xs={12}>
                              <Box display="flex" justifyContent="space-between">
                                <Button
                                  type="button"
                                  color="error"
                                  variant="text"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </Button>
                                <Button
                                  type="button"
                                  color="primary"
                                  variant="text"
                                  onClick={() =>
                                    push({
                                      Color: '', Width: '', Price: '',
                                      UOM: '', PriceUnit: '', MOQ: '', MCQ: '',
                                      MOQSurcharge: '', MCQSurcharge: ''
                                    })
                                  }
                                >
                                  Add Details Info
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      ))}
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {["MSQ", "MSQSurcharge"].map((name) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    fullWidth
                    variant="standard"
                    name={name}
                    label={name.replace(/([A-Z])/g, ' $1').trim()}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[name] && !!errors[name]}
                    helperText={touched[name] && errors[name]}
                  />
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button type="submit" color="secondary" variant="contained">
                Create New Item
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

const checkoutSchema = yup.object().shape({
  Type: yup.string().required("Please insert materials type."),
  SupplierName: yup.string().required("Please insert supplier name."),
  MaterialInfo: yup.string().required("Please insert material description."),
  Article: yup.string().required("Please insert article number."),
  itemDetails: yup.array().of(
    yup.object().shape({
      Color: yup.string().required("Please insert color."),
      Width: yup.string().required("Please insert width."),
      Price: yup.string().required("Please insert price."),
      UOM: yup.string().required("Please insert UOM."),
      PriceUnit: yup.string().required("Please insert price unit."),
      MOQ: yup.string().required("Please insert MOQ."),
      MCQ: yup.string().required("Please insert MCQ."),
      MOQSurcharge: yup.string().required("Please insert MOQ Surcharge."),
      MCQSurcharge: yup.string().required("Please insert MCQ Surcharge.")
    })
  ),
  MSQ: yup.string().required("Please insert MSQ."),
  MSQSurcharge: yup.string().required("Please insert MSQ surcharge.")
});

const initialValues = {
  Type: "",
  SupplierName: "",
  MaterialInfo: "",
  Article: "",
  itemDetails: [
    {
      Color: "",
      Width: "",
      Price: "",
      UOM: "",
      PriceUnit: "",
      MOQ: "",
      MCQ: "",
      MOQSurcharge: "",
      MCQSurcharge: ""
    }
  ],
  MSQ: "",
  MSQSurcharge: ""
};

export default AddMaterials;