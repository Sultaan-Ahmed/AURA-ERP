import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStyle = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { styleId } = useParams();
  const [ranges, setRanges] = useState([]);
  const [rangeId, setRangeId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const StylesInfo = useSelector((state) => state.style);
  const StyleDetails = StylesInfo.styles.find((item) => item._id === styleId);

  useEffect(() => {
    if (StyleDetails) {
      setRangeId(StyleDetails.RangeId);
      setLoading(false);
    }
  }, [StyleDetails]);

  useEffect(() => {
    const fetchRanges = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/range");
        setRanges(data.ranges);
      } catch (error) {
        toast.error("Failed to fetch ranges.");
      }
    };
    fetchRanges();
  }, []);

  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    try {
      const updated = { ...values, RangeId: rangeId };
      await axios.put(`http://localhost:5000/api/v1/style/${styleId}`, updated, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Style updated successfully!");
      setTimeout(() => navigate("/styles"), 1500);
    } catch (err) {
      toast.error("Failed to update style.");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object().shape({
    StyleName: yup.string().required("Please insert style name."),
    TotalOrderQty: yup
      .number()
      .typeError("Must be a number")
      .required("Required"),
    OrderLiveDate: yup.date().required("Required"),
    ExFtyDate: yup.date().required("Required"),
    ColorWiseQty: yup.array().of(
      yup.object().shape({
        Color: yup.string().required("Required"),
        ColorOrderQty: yup
          .string()
          .required("Required")
          .matches(/^\d+$/, "Must be a number"),
      })
    ),
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <ToastContainer />
      <Header title="Update Style" subtitle="Update Style Information." />

      <Box mb={3} maxWidth={400}>
        <FormControl fullWidth variant="standard">
          <InputLabel>Select Range</InputLabel>
          <Select value={rangeId} onChange={(e) => setRangeId(e.target.value)}>
            {ranges.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Formik
        initialValues={StyleDetails}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Style Name"
                  name="StyleName"
                  value={values.StyleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.StyleName && !!errors.StyleName}
                  helperText={touched.StyleName && errors.StyleName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Total Order Qty"
                  name="TotalOrderQty"
                  value={values.TotalOrderQty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.TotalOrderQty && !!errors.TotalOrderQty}
                  helperText={touched.TotalOrderQty && errors.TotalOrderQty}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Order Live Date"
                  name="OrderLiveDate"
                  type="date"
                  value={values.OrderLiveDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{ shrink: true }}
                  error={!!touched.OrderLiveDate && !!errors.OrderLiveDate}
                  helperText={touched.OrderLiveDate && errors.OrderLiveDate}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Ex Fty Date"
                  name="ExFtyDate"
                  type="date"
                  value={values.ExFtyDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{ shrink: true }}
                  error={!!touched.ExFtyDate && !!errors.ExFtyDate}
                  helperText={touched.ExFtyDate && errors.ExFtyDate}
                />
              </Grid>

              <Grid item xs={12}>
                <FieldArray name="ColorWiseQty">
                  {(arrayHelpers) => (
                    <Box>
                      {values.ColorWiseQty && values.ColorWiseQty.length > 0 ? (
                        values.ColorWiseQty.map((_, index) => (
                          <Grid
                            container
                            spacing={2}
                            key={index}
                            p={2}
                            border="1px solid #ccc"
                            borderRadius={2}
                            mb={2}
                          >
                            <Grid item xs={12} sm={6}>
                              <Field
                                as={TextField}
                                fullWidth
                                variant="standard"
                                label="Color"
                                name={`ColorWiseQty[${index}].Color`}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                as={TextField}
                                fullWidth
                                variant="standard"
                                label="Color Order Qty"
                                name={`ColorWiseQty[${index}].ColorOrderQty`}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Box display="flex" justifyContent="flex-end" gap={2}>
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
                            </Grid>
                          </Grid>
                        ))
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            arrayHelpers.push({ Color: "", ColorOrderQty: "" })
                          }
                        >
                          Add a Color-wise Order Qty
                        </Button>
                      )}
                    </Box>
                  )}
                </FieldArray>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={submitting}
              >
                {submitting ? "Updating..." : "Update Style"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateStyle;
