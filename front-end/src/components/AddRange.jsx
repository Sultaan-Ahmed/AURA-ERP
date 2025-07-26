import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRange = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    const payload = {
      ...values,
      TotalOrderQty: parseInt(values.TotalOrderQty, 10),
      VendorName: values.VendorName.filter((v) => v.trim() !== ""),
    };

    axios
      .post("http://localhost:5000/api/v1/range", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success("Range created successfully!");
        setTimeout(() => navigate("/range"), 1500);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toast.error("Failed to create range. Please try again.");
      });
  };

  return (
    <Box m="20px" sx={{ width: "100%" }}>
      <Header title="Add Range" subtitle="Create a New Range." />

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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="current-stage-label">Current Stage</InputLabel>
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
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.CurrentStage}
                  </div>
                )}
              </FormControl>

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
                sx={{ gridColumn: "span 4" }}
              />

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
                sx={{ gridColumn: "span 4" }}
              />

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
                sx={{ gridColumn: "span 4" }}
              />

              {/* Vendor Name FieldArray */}
              <Box sx={{ width: "100%" }}>
                <FieldArray
                  name="VendorName"
                  render={(arrayHelpers) => (
                    <div>
                      {values.VendorName && values.VendorName.length > 0 ? (
                        values.VendorName.map((item, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <Field
                              as={TextField}
                              variant="filled"
                              label="Vendor Name"
                              name={`VendorName[${index}]`}
                              placeholder="Vendor Name"
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
                              variant="contained"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remove
                            </Button>
                            <Button
                              color="success"
                              variant="contained"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add
                            </Button>
                          </div>
                        ))
                      ) : (
                        <Button
                          type="button"
                          variant="contained"
                          color="success"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add Vendor Name
                        </Button>
                      )}
                    </div>
                  )}
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Range
              </Button>
            </Box>
          </form>
        )}
      </Formik>

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

// Initial Values
const initialValues = {
  name: "",
  CurrentStage: "",
  TotalOrderQty: "",
  CustomerName: "",
  VendorName: [],
};

export default AddRange;
