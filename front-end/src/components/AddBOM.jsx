import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import { Formik, FieldArray, Form } from 'formik';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Close';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const types = ['Fabric', 'Trims', 'Packaging'];
const MAX_IMAGES = 5;
const TBC_OPTION = 'TBC';

const AddBOM = () => {
  const { styleId } = useParams();
  const styles = useSelector((state) => state.style);
  const StyleDetails = styles?.styles.find((item) => item._id === styleId);
  const items = useSelector((state) => state.materials.items);

  const initialValues = {
    BOMDetails: [],
    BOMImages: [],
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      // Prepare only image files for backend (remove preview URLs)
      const BOMImageFiles = values.BOMImages.map((img) => img.file);

      const formData = new FormData();
      formData.append('StyleId', styleId);
      formData.append('RangeId', StyleDetails.RangeId);

      formData.append('BOMDetails', JSON.stringify(values.BOMDetails));
      BOMImageFiles.forEach((file) => {
        formData.append('BOMImages', file);
      });
      console.log(formData)
      await axios.post(`http://localhost:5000/api/v1/style/${styleId}/bom`, formData,{
  headers: {
    'Content-Type': 'multipart/form-data',
  }},);
      
      toast.success('BOM created successfully!');
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create BOM');
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add BOM
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <Box mb={4}>
              <Typography variant="h6" gutterBottom>
                BOM Images
              </Typography>

              <Button
                variant="outlined"
                component="label"
                disabled={values.BOMImages.length >= MAX_IMAGES}
              >
                Upload Images (Max {MAX_IMAGES})
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={(event) => {
                    const selectedFiles = Array.from(event.currentTarget.files);
                    const remainingSlots = MAX_IMAGES - values.BOMImages.length;
                    const filesToAdd = selectedFiles.slice(0, remainingSlots);

                    const previews = filesToAdd.map((file) => ({
                      file,
                      preview: URL.createObjectURL(file),
                    }));

                    setFieldValue('BOMImages', [...values.BOMImages, ...previews]);
                  }}
                />
              </Button>

              <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                {values.BOMImages.map((img, idx) => (
                  <Box key={idx} sx={{ position: 'relative', width: 100, height: 100 }}>
                    <img
                      src={img.preview}
                      alt={`bom-${idx}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 4,
                        border: '1px solid #ccc',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => {
                        const newImages = values.BOMImages.filter((_, i) => i !== idx);
                        setFieldValue('BOMImages', newImages);
                      }}
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor: 'white',
                        boxShadow: 1,
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>

            <Typography>
              Style Name: <Link to={`/styles/${StyleDetails._id}`}>{StyleDetails.StyleName}</Link>
            </Typography>

            <FieldArray
              name="BOMDetails"
              render={(arrayHelpers) => (
                <div>
                  {types.map((type) => {
                    const filteredItems = items.filter((i) => i.Type === type);
                    const typeItems = values.BOMDetails.filter((b) => b.Type === type);

                    return (
                      <Paper key={type} sx={{ p: 2, mb: 4 }} elevation={3}>
                        <Typography variant="h6" mb={2}>
                          {type}
                        </Typography>

                        {typeItems.map((item, index) => {
                          const itemIndex = values.BOMDetails.findIndex((b) => b === item);
                          const suppliers = [...new Set(filteredItems.map((i) => i.SupplierName))];
                          const supplierItems = filteredItems.filter((i) => i.SupplierName === item.SupplierName);
                          const materialItems = supplierItems.filter((i) => i.MaterialInfo === item.MaterialInfo);
                          const articleItem = filteredItems.find((i) => i.Article === item.Article);

                          const uniqueColors = [...new Set(articleItem?.itemDetails?.map((d) => d.Color) || []), TBC_OPTION];
                          const uniqueWidths = [...new Set(articleItem?.itemDetails?.map((d) => d.Width) || []), TBC_OPTION];

                          return (
                            <Box key={itemIndex} mb={3}>
                              {index > 0 && <Divider sx={{ mb: 2 }} />}
                              <Box display="flex" gap={2} flexWrap="wrap">
                                <FormControl variant="standard" sx={{ minWidth: 160 }}>
                                  <InputLabel>Select Supplier</InputLabel>
                                  <Select
                                    name={`BOMDetails[${itemIndex}].SupplierName`}
                                    value={item.SupplierName}
                                    onChange={handleChange}
                                  >
                                    {suppliers.map((supplier, idx) => (
                                      <MenuItem key={idx} value={supplier}>
                                        {supplier}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ minWidth: 160 }}>
                                  <InputLabel>Select Material</InputLabel>
                                  <Select
                                    name={`BOMDetails[${itemIndex}].MaterialInfo`}
                                    value={item.MaterialInfo}
                                    onChange={handleChange}
                                  >
                                    {[...new Set(supplierItems.map((i) => i.MaterialInfo))].map((mat, idx) => (
                                      <MenuItem key={idx} value={mat}>
                                        {mat}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ minWidth: 160 }}>
                                  <InputLabel>Select Article</InputLabel>
                                  <Select
                                    name={`BOMDetails[${itemIndex}].Article`}
                                    value={item.Article}
                                    onChange={handleChange}
                                  >
                                    {materialItems.map((mat, idx) => (
                                      <MenuItem key={idx} value={mat.Article}>
                                        {mat.Article}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ minWidth: 160 }}>
                                  <InputLabel>Select Color</InputLabel>
                                  <Select
                                    multiple
                                    name={`BOMDetails[${itemIndex}].Color`}
                                    value={item.Color}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((val) => (
                                          <Chip key={val} label={val} />
                                        ))}
                                      </Box>
                                    )}
                                  >
                                    {uniqueColors.map((color, idx) => (
                                      <MenuItem key={idx} value={color}>
                                        {color}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ minWidth: 160 }}>
                                  <InputLabel>Select Width</InputLabel>
                                  <Select
                                    multiple
                                    name={`BOMDetails[${itemIndex}].Width`}
                                    value={item.Width}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((val) => (
                                          <Chip key={val} label={val} />
                                        ))}
                                      </Box>
                                    )}
                                  >
                                    {uniqueWidths.map((width, idx) => (
                                      <MenuItem key={idx} value={width}>
                                        {width}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                <TextField
                                  variant="standard"
                                  label="Placement"
                                  name={`BOMDetails[${itemIndex}].Placement`}
                                  value={item.Placement}
                                  onChange={handleChange}
                                  sx={{ minWidth: 160 }}
                                />

                                <Button
                                  variant="text"
                                  color="error"
                                  onClick={() => arrayHelpers.remove(itemIndex)}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </Box>
                          );
                        })}

                        <Button
                          variant="outlined"
                          onClick={() =>
                            arrayHelpers.push({
                              Type: type,
                              SupplierName: '',
                              MaterialInfo: '',
                              Article: '',
                              Color: [],
                              Width: [],
                              Placement: '',
                            })
                          }
                        >
                          Add {type} Item
                        </Button>
                      </Paper>
                    );
                  })}
                </div>
              )}
            />

            <Box display="flex" justifyContent="end" mt={4}>
              <Button type="submit" variant="contained" color="secondary">
                Create BOM
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddBOM;
