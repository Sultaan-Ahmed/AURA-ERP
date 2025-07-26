import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStyle = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [ranges, setRanges] = useState([]);
  const [rangeId, setRangeId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ranges from API
    const fetchRanges = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/range");
        setRanges(data.ranges || []);
      } catch (error) {
        toast.error(`${error.response.data.message}`);
      }
    };
    fetchRanges();
  }, []);

  const validationSchema = yup.object().shape({
    StyleName: yup.string().required("Please insert style name."),
    TotalOrderQty: yup
      .number()
      .typeError("Total Order Qty must be a number")
      .required("Total Order Qty is required"),
    OrderLiveDate: yup.date().required("Order Live Date is required"),
    ExFtyDate: yup.date().required("Ex Fty Date is required"),
    ColorWiseQty: yup.array().of(
      yup.object().shape({
        Color: yup.string().required("Color is required"),
        ColorOrderQty: yup
          .number()
          .typeError("Color Order Qty must be a number")
          .required("Order Qty is required"),
      })
    ),
  });

  const initialValues = {
    StyleName: "",
    TotalOrderQty: "",
    OrderLiveDate: "",
    ExFtyDate: "",
    ColorWiseQty: [{ Color: "", ColorOrderQty: "" }],
  };

  const handleFormSubmit = (values, { setSubmitting }) => {
    if (!rangeId) {
      toast.error("Please select a range before submitting.");
      setSubmitting(false);
      return;
    }

    axios
      .post(`http://localhost:5000/api/v1/range/style/${rangeId}`, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        toast.success("Style created successfully!");
        setTimeout(() => {
          navigate("/styles");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error creating style:", error);
        const msg =
          error?.response?.data?.message ||
          "Failed to create style. Please try again.";
        toast.error(msg);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Box m="20px">
        <Header title="Add Style" subtitle="Create a New Style." />

        {/* Select Range */}
        <Box mb={4} maxWidth={400}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="range-select-label">Select Range</InputLabel>
            <Select
              labelId="range-select-label"
              value={rangeId}
              onChange={(e) => setRangeId(e.target.value)}
              label="Select Range"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ranges.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
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
                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Style Name"
                  name="StyleName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.StyleName}
                  error={touched.StyleName && Boolean(errors.StyleName)}
                  helperText={touched.StyleName && errors.StyleName}
                />

                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Total Order Qty"
                  name="TotalOrderQty"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.TotalOrderQty}
                  error={touched.TotalOrderQty && Boolean(errors.TotalOrderQty)}
                  helperText={touched.TotalOrderQty && errors.TotalOrderQty}
                />

                <TextField
                  fullWidth
                  variant="standard"
                  type="date"
                  label="Order Live Date"
                  name="OrderLiveDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.OrderLiveDate}
                  InputLabelProps={{ shrink: true }}
                  error={touched.OrderLiveDate && Boolean(errors.OrderLiveDate)}
                  helperText={touched.OrderLiveDate && errors.OrderLiveDate}
                />

                <TextField
                  fullWidth
                  variant="standard"
                  type="date"
                  label="Ex Fty Date"
                  name="ExFtyDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ExFtyDate}
                  InputLabelProps={{ shrink: true }}
                  error={touched.ExFtyDate && Boolean(errors.ExFtyDate)}
                  helperText={touched.ExFtyDate && errors.ExFtyDate}
                />

                {/* ColorWiseQty FieldArray */}
                <FieldArray name="ColorWiseQty">
                  {(arrayHelpers) => (
                    <Box sx={{ gridColumn: "span 4" }}>
                      {values.ColorWiseQty.length > 0 ? (
                        values.ColorWiseQty.map((item, index) => (
                          <Box
                            key={index}
                            display="flex"
                            gap="10px"
                            mb={2}
                            alignItems="center"
                          >
                            <Field
                              as={TextField}
                              label="Color"
                              name={`ColorWiseQty[${index}].Color`}
                              variant="standard"
                              error={
                                touched.ColorWiseQty &&
                                touched.ColorWiseQty[index] &&
                                touched.ColorWiseQty[index].Color &&
                                Boolean(
                                  errors.ColorWiseQty &&
                                    errors.ColorWiseQty[index] &&
                                    errors.ColorWiseQty[index].Color
                                )
                              }
                              helperText={
                                touched.ColorWiseQty &&
                                touched.ColorWiseQty[index] &&
                                touched.ColorWiseQty[index].Color &&
                                errors.ColorWiseQty &&
                                errors.ColorWiseQty[index] &&
                                errors.ColorWiseQty[index].Color
                              }
                            />
                            <Field
                              as={TextField}
                              label="Order Qty"
                              name={`ColorWiseQty[${index}].ColorOrderQty`}
                              variant="standard"
                              error={
                                touched.ColorWiseQty &&
                                touched.ColorWiseQty[index] &&
                                touched.ColorWiseQty[index].ColorOrderQty &&
                                Boolean(
                                  errors.ColorWiseQty &&
                                    errors.ColorWiseQty[index] &&
                                    errors.ColorWiseQty[index].ColorOrderQty
                                )
                              }
                              helperText={
                                touched.ColorWiseQty &&
                                touched.ColorWiseQty[index] &&
                                touched.ColorWiseQty[index].ColorOrderQty &&
                                errors.ColorWiseQty &&
                                errors.ColorWiseQty[index] &&
                                errors.ColorWiseQty[index].ColorOrderQty
                              }
                            />
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remove
                            </Button>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                arrayHelpers.insert(index + 1, {
                                  Color: "",
                                  ColorOrderQty: "",
                                })
                              }
                            >
                              Add
                            </Button>
                          </Box>
                        ))
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() =>
                            arrayHelpers.push({ Color: "", ColorOrderQty: "" })
                          }
                        >
                          Add Color-wise Qty
                        </Button>
                      )}
                    </Box>
                  )}
                </FieldArray>
              </Box>

              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create New Style"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddStyle;
