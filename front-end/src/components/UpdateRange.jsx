import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRange = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { rangeId} = useParams();

  const [initialValues, setInitialValues] = useState({
  name: "",
  CurrentStage: "",
  TotalOrderQty: "",
  CustomerName: "",
  VendorName: [],
});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/range/${rangeId}`).then((res) => {
      setInitialValues(res.data.range);
      console.log(initialValues)
    });
  }, [rangeId]);

  const handleFormSubmit = (values) => {
    const payload = {
      ...values,
      TotalOrderQty: parseInt(values.TotalOrderQty, 10),
      VendorName: values.VendorName.filter((v) => v.trim() !== ""),
    };

    axios
      .put(`http://localhost:5000/api/v1/range/${rangeId}`, payload)
      .then(() => {
        toast.success("Range updated successfully!");
        setTimeout(() => navigate("/range"), 1500);
      })
      .catch((error) => {
        console.error("Error updating range:", error);
        toast.error("Failed to update range. Please try again.");
      });
  };

  if (!initialValues) return <div>Loading...</div>;

  return (
    <Box m="20px" sx={{ width: "100%" }}>
      <Header title="Update Range" subtitle="Edit Existing Range." />

      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            enableReinitialize
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
                <Grid
                  container
                  spacing={3}
                  sx={{
                    "& .MuiFormControl-root": {
                      width: "100%",
                    },
                  }}
                >
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="filled">
                      <InputLabel id="current-stage-label">
                        Current Stage
                      </InputLabel>
                      <Select
                        labelId="current-stage-label"
                        id="CurrentStage"
                        name="CurrentStage"
                        value={values.CurrentStage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.CurrentStage && !!errors.CurrentStage}
                      >
                        <MenuItem value="Costing">Costing</MenuItem>
                        <MenuItem value="Cross-Costing">Cross-Costing</MenuItem>
                        <MenuItem value="Live">Live</MenuItem>
                      </Select>
                      {touched.CurrentStage && errors.CurrentStage && (
                        <Typography variant="caption" color="error">
                          {errors.CurrentStage}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Range Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Total Order Qty"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.TotalOrderQty}
                      name="TotalOrderQty"
                      error={!!touched.TotalOrderQty && !!errors.TotalOrderQty}
                      helperText={touched.TotalOrderQty && errors.TotalOrderQty}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Customer Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.CustomerName}
                      name="CustomerName"
                      error={!!touched.CustomerName && !!errors.CustomerName}
                      helperText={touched.CustomerName && errors.CustomerName}
                    />
                  </Grid>

                  {/* Vendor Name FieldArray */}
                  <Grid item xs={12}>
                    <Typography variant="h6" mb={1}>
                      Vendor Names
                    </Typography>
                    <FieldArray
                      name="VendorName"
                      render={(arrayHelpers) => (
                        <>
                          {values?.VendorName?.map((item, index) => (
                            <Box
                              key={index}
                              display="flex"
                              gap={2}
                              mb={2}
                              alignItems="center"
                            >
                              <Field
                                as={TextField}
                                variant="filled"
                                label={`Vendor ${index + 1}`}
                                name={`VendorName[${index}]`}
                                fullWidth
                                error={
                                  !!touched.VendorName?.[index] &&
                                  !!errors.VendorName?.[index]
                                }
                                helperText={
                                  touched.VendorName?.[index] &&
                                  errors.VendorName?.[index]
                                }
                              />
                              <Button
                                color="warning"
                                variant="outlined"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>
                              <Button
                                color="success"
                                variant="outlined"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Add
                              </Button>
                            </Box>
                          ))}
                          {values.VendorName?.length === 0 && (
                            <Button
                              color="success"
                              variant="contained"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add Vendor Name
                            </Button>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                </Grid>

                <Box display="flex" justifyContent="end" mt={4}>
                  <Button type="submit" color="secondary" variant="contained">
                    Update Range
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

// Validation Schema
const checkoutSchema = yup.object().shape({
  name: yup.string().required("Required"),
  CurrentStage: yup.string().required("Please select the current stage."),
  TotalOrderQty: yup.string().required("Please enter total order qty."),
  CustomerName: yup.string().required("Please enter the customer name."),
  VendorName: yup
    .array()
    .of(yup.string().required("Please enter vendor name(s).")),
});

export default UpdateRange;
