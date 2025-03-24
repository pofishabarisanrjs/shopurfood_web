import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  TrendingUp,
  Store,
  People,
  ShoppingCart,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, orders: 2400 },
  { name: 'Feb', sales: 3000, orders: 1398 },
  { name: 'Mar', sales: 2000, orders: 9800 },
  { name: 'Apr', sales: 2780, orders: 3908 },
  { name: 'May', sales: 1890, orders: 4800 },
  { name: 'Jun', sales: 2390, orders: 3800 },
];

const stats = [
  {
    title: 'Total Sales',
    value: '$23,456',
    icon: <TrendingUp sx={{ fontSize: 40, color: '#2196f3' }} />,
  },
  {
    title: 'Total Vendors',
    value: '156',
    icon: <Store sx={{ fontSize: 40, color: '#4caf50' }} />,
  },
  {
    title: 'Active Users',
    value: '2,345',
    icon: <People sx={{ fontSize: 40, color: '#ff9800' }} />,
  },
  {
    title: 'Total Orders',
    value: '789',
    icon: <ShoppingCart sx={{ fontSize: 40, color: '#f44336' }} />,
  },
];

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sales & Orders Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#2196f3"
                    name="Sales"
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#4caf50"
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 