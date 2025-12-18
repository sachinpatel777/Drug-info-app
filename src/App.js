import React, { useState, useMemo } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Select, MenuItem, FormControl, InputLabel, Box, Typography 
} from '@mui/material';
import drugData from './drugs.json';

const App = () => {
  const [selectedCompany, setSelectedCompany] = useState('');

  const processedData = useMemo(() => {
    return [...drugData]
      .sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate))
      .map((item, index) => ({ ...item, id: index + 1 }));
  }, []);

  const companies = useMemo(() => {
    return [...new Set(processedData.map((d) => d.company))].sort();
  }, [processedData]);

  const filteredDrugs = selectedCompany
    ? processedData.filter((d) => d.company === selectedCompany)
    : processedData;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        Drug Information System
      </Typography>

      <FormControl sx={{ mb: 4, minWidth: 300 }}>
        <InputLabel id="company-select-label">Filter by Company</InputLabel>
        <Select
          labelId="company-select-label"
          value={selectedCompany}
          label="Filter by Company"
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <MenuItem value=""><em>All Companies</em></MenuItem>
          {companies.map((company) => (
            <MenuItem key={company} value={company}>{company}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#eeeeee' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name (Generic + Brand)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Launch Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDrugs.map((drug) => (
              <TableRow key={drug.id} hover>
                <TableCell>{drug.id}</TableCell>
                <TableCell>{drug.code}</TableCell>
                <TableCell>{`${drug.genericName} (${drug.brandName})`}</TableCell>
                <TableCell 
                  sx={{ color: '#1976d2', cursor: 'pointer', fontWeight: 500 }}
                  onClick={() => setSelectedCompany(drug.company)}
                >
                  {drug.company}
                </TableCell>
                <TableCell>{formatDate(drug.launchDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;