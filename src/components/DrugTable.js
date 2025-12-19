import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const DrugTable = ({ data, onCompanyClick }) => {
  return (
    <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', width: '60px' }}>Id</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '150px' }}>Code</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Name (Generic + Brand)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '250px' }}>Company</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '150px' }}>Launch Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((drug) => (
            <TableRow key={drug.id} hover sx={{ height: '53px' }}>
              <TableCell>{drug.id}</TableCell>
              <TableCell>{drug.code}</TableCell>
              <TableCell>{`${drug.genericName} (${drug.brandName})`}</TableCell>
              <TableCell 
                sx={{ color: '#1976d2', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                onClick={() => onCompanyClick(drug.company)}
              >
                {drug.company}
              </TableCell>
              <TableCell>{drug.formattedDate}</TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow style={{ height: 200 }}>
              <TableCell colSpan={5} align="center">
                <Typography variant="body1" color="textSecondary">No results found matching your criteria</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DrugTable;