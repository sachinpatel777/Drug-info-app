import React from 'react';
import { Box, Pagination } from '@mui/material';

const PaginationView = ({ count, page, onPageChange }) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Pagination 
        count={count} 
        page={page} 
        onChange={onPageChange} 
        color="primary" 
        showFirstButton 
        showLastButton 
        variant="outlined" 
        shape="rounded"
      />
    </Box>
  );
};

export default PaginationView;