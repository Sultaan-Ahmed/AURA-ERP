import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider
  } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const MaterialsDetails = () => {
    const {items}=useSelector(state=>state.materials)
   
    const {materialId}=useParams();
    const data=items.find(item=>item?._id===materialId);
    console.log(data)
  return  (
    <Card sx={{ maxWidth: 1000, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Link to={'/materials'}>
          Material Details
        </Link>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Supplier:</strong> {data.SupplierName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Article:</strong> {data.Article}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Material:</strong> {data.MaterialInfo}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Type:</strong> {data.Type}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Link to={`/materials/update/${data._id}`} variant="subtitle1">
              <strong>Update:</strong> {data._id}
            </Link>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Item Details
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Color</strong></TableCell>
                  <TableCell><strong>Width</strong></TableCell>
                  <TableCell><strong>Price</strong></TableCell>
                  <TableCell><strong>Price Unit</strong></TableCell>
                  <TableCell><strong>UOM</strong></TableCell>
                  <TableCell><strong>MOQ</strong></TableCell>
                  <TableCell><strong>MCQ</strong></TableCell>
                  <TableCell><strong>MOQ Surcharge</strong></TableCell>
                  <TableCell><strong>MCQ Surcharge</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.itemDetails.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.Color}</TableCell>
                    <TableCell>{item.Width}</TableCell>
                    <TableCell>${item.Price}</TableCell>
                    <TableCell>{item.PriceUnit}</TableCell>
                    <TableCell>{item.UOM}</TableCell>
                    <TableCell>{item.MOQ}</TableCell>
                    <TableCell>{item.MCQ}</TableCell>
                    <TableCell>${item.MOQSurcharge}</TableCell>
                    <TableCell>${item.MCQSurcharge}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>MSQ:</strong> {data.MSQ}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>MSQ Surcharge:</strong> ${data.MSQSurcharge}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );;
};

export default MaterialsDetails;
