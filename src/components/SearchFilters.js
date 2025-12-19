import React from 'react';
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SearchFilters = ({ searchQuery, onSearchChange, selectedCompany, onCompanyChange, companies }) => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
      <TextField
        label="Search by Code or Name"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)} 
        placeholder="e.g. 48951 or Bryonia"
        sx={{ backgroundColor: '#fff' }}
      />

      <FormControl sx={{ minWidth: { sm: 250 }, backgroundColor: '#fff' }}>
        <InputLabel id="company-select-label">Filter by Company</InputLabel>
        <Select
          labelId="company-select-label"
          value={selectedCompany}
          label="Filter by Company"
          onChange={(e) => onCompanyChange(e)} 
        >
          <MenuItem value=""><em>All Companies</em></MenuItem>
          {companies.map((company) => (
            <MenuItem key={company} value={company}>{company}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SearchFilters;