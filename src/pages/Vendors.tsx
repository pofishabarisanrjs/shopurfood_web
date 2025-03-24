import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Mock data for vendors
const vendors = [
  {
    id: 1,
    name: 'Tech Store',
    email: 'tech@store.com',
    status: 'Active',
    products: 45,
    totalSales: '$12,345',
  },
  {
    id: 2,
    name: 'Fashion Boutique',
    email: 'fashion@boutique.com',
    status: 'Active',
    products: 32,
    totalSales: '$8,765',
  },
  {
    id: 3,
    name: 'Home Goods',
    email: 'home@goods.com',
    status: 'Inactive',
    products: 28,
    totalSales: '$5,432',
  },
  {
    id: 4,
    name: 'Sports Shop',
    email: 'sports@shop.com',
    status: 'Active',
    products: 56,
    totalSales: '$15,678',
  },
];

const Vendors: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Vendors</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => console.log('Add new vendor')}
        >
          Add Vendor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Sales</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>
                  <Chip
                    label={vendor.status}
                    color={vendor.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{vendor.products}</TableCell>
                <TableCell>{vendor.totalSales}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => console.log('Edit vendor', vendor.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Vendors; 