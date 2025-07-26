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
} from '@mui/material';
import { Formik, FieldArray, Form } from 'formik';
import { useSelector } from 'react-redux';

const types = ['Fabric', 'Trims', 'Packaging'];

const AddBOM = () => {
  const items = useSelector((state) => state.materials.items);

  const initialValues = {
    BOMDetails: [],
  };

  const handleFormSubmit = async (values) => {
    console.log('Submitted BOM Data:', values);
    // await axios.put(`http://localhost:5000/api/v1/style/${styleId}/bom`, values);
    // navigate(`/bom/${bomId}`);
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Add BOM
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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

                          return (
                            <Box key={itemIndex} mb={3}>
                              {index > 0 && <Divider sx={{ mb: 2 }} />}
                              <Box display="flex" gap={2} flexWrap="wrap">
                                {/* Supplier */}
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

                                {/* Material Info */}
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

                                {/* Article */}
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

                                {/* Color (Multiple Select) */}
                                <FormControl variant="standard" sx={{ minWidth: 160 }}>
                                  <InputLabel>Select Color</InputLabel>
                                  <Select
                                    multiple
                                    name={`BOMDetails[${itemIndex}].Color`}
                                    value={item.Color}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                          <Chip key={value} label={value} />
                                        ))}
                                      </Box>
                                    )}
                                  >
                                    {articleItem?.itemDetails?.map((d, idx) => (
                                      <MenuItem key={idx} value={d.Color}>
                                        {d.Color}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                {/* Width (Multiple Select) */}
                                <FormControl variant="standard" sx={{ minWidth: 160 }}>
                                  <InputLabel>Select Width</InputLabel>
                                  <Select
                                    multiple
                                    name={`BOMDetails[${itemIndex}].Width`}
                                    value={item.Width}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                          <Chip key={value} label={value} />
                                        ))}
                                      </Box>
                                    )}
                                  >
                                    {articleItem?.itemDetails?.map((d, idx) => (
                                      <MenuItem key={idx} value={d.Width}>
                                        {d.Width}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                {/* Placement */}
                                <TextField
                                  variant="standard"
                                  label="Placement"
                                  name={`BOMDetails[${itemIndex}].Placement`}
                                  value={item.Placement}
                                  onChange={handleChange}
                                  sx={{ minWidth: 160 }}
                                />

                                {/* Remove Button */}
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

                        {/* Add Button */}
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
