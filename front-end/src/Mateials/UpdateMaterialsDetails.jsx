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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMaterialDetails = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { materialId } = useParams();
  const navigate = useNavigate();

  const [fabricData, setFabricData] = useState(null);

  const getFabricDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/item/${materialId}`
      );
      setFabricData(data.item);
    } catch (error) {
      toast.error("Failed to fetch material details");
    }
  };

  useEffect(() => {
    getFabricDetails();
  }, []);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/item/${materialId}`, values, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Material updated successfully!");
      setTimeout(() => {
        navigate(`/materials`);
      }, 1500);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update material"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!fabricData) return <div>Loading fabric details...</div>;

  return (
    <>
      <Box m="20px">
        <Header title="Update Materials" subtitle="Update Material Information." />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={fabricData}
          validationSchema={fabricSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
              >
                <TextField
                  variant="standard"
                  fullWidth
                  label="Supplier Name"
                  name="SupplierName"
                  value={values.SupplierName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.SupplierName && !!errors.SupplierName}
                  helperText={touched.SupplierName && errors.SupplierName}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  label="Article"
                  name="Article"
                  value={values.Article}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.Article && !!errors.Article}
                  helperText={touched.Article && errors.Article}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  label="Material Info"
                  name="MaterialInfo"
                  value={values.MaterialInfo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.MaterialInfo && !!errors.MaterialInfo}
                  helperText={touched.MaterialInfo && errors.MaterialInfo}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  label="Type"
                  name="Type"
                  value={values.Type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.Type && !!errors.Type}
                  helperText={touched.Type && errors.Type}
                />

                <TextField
                  variant="standard"
                  fullWidth
                  label="MSQ"
                  name="MSQ"
                  value={values.MSQ}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.MSQ && !!errors.MSQ}
                  helperText={touched.MSQ && errors.MSQ}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  label="MSQ Surcharge"
                  name="MSQSurcharge"
                  value={values.MSQSurcharge}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.MSQSurcharge && !!errors.MSQSurcharge}
                  helperText={touched.MSQSurcharge && errors.MSQSurcharge}
                />
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Item Details
                </Typography>
                <FieldArray
                  name="itemDetails"
                  render={(arrayHelpers) => (
                    <div>
                      {values.itemDetails && values.itemDetails.length > 0 ? (
                        values.itemDetails.map((item, index) => (
                          <Box key={index} display="flex" gap={2} mb={2}>
                            <TextField
                              label="Color"
                              name={`itemDetails[${index}].Color`}
                              variant="standard"
                              value={item.Color}
                              onChange={handleChange}
                            />
                            <TextField
                              label="Width"
                              name={`itemDetails[${index}].Width`}
                              variant="standard"
                              value={item.Width}
                              onChange={handleChange}
                            />
                            <TextField
                              label="Price"
                              name={`itemDetails[${index}].Price`}
                              variant="standard"
                              value={item.Price}
                              onChange={handleChange}
                            />
                            <TextField
                              label="UOM"
                              name={`itemDetails[${index}].UOM`}
                              variant="standard"
                              value={item.UOM}
                              onChange={handleChange}
                            />
                            <TextField
                              label="Price Unit"
                              name={`itemDetails[${index}].PriceUnit`}
                              variant="standard"
                              value={item.PriceUnit}
                              onChange={handleChange}
                            />
                            <TextField
                              label="MOQ"
                              name={`itemDetails[${index}].MOQ`}
                              variant="standard"
                              value={item.MOQ}
                              onChange={handleChange}
                            />
                            <TextField
                              label="MCQ"
                              name={`itemDetails[${index}].MCQ`}
                              variant="standard"
                              value={item.MCQ}
                              onChange={handleChange}
                            />
                            <TextField
                              label="MOQ Surcharge"
                              name={`itemDetails[${index}].MOQSurcharge`}
                              variant="standard"
                              value={item.MOQSurcharge}
                              onChange={handleChange}
                            />
                            <TextField
                              label="MCQ Surcharge"
                              name={`itemDetails[${index}].MCQSurcharge`}
                              variant="standard"
                              value={item.MCQSurcharge}
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
                                  Color: "",
                                  Width: "",
                                  Price: "",
                                  UOM: "",
                                  PriceUnit: "",
                                  MOQ: "",
                                  MCQ: "",
                                  MOQSurcharge: "",
                                  MCQSurcharge: "",
                                })
                              }
                            >
                              Add
                            </Button>
                          </Box>
                        ))
                      ) : (
                        <Button
                          variant="text"
                          onClick={() =>
                            arrayHelpers.push({
                              Color: "",
                              Width: "",
                              Price: "",
                              UOM: "",
                              PriceUnit: "",
                              MOQ: "",
                              MCQ: "",
                              MOQSurcharge: "",
                              MCQSurcharge: "",
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
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Materials"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

const fabricSchema = yup.object().shape({
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

export default UpdateMaterialDetails;
