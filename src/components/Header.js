import React from 'react';
import { Typography } from '@mui/material';

const Header = ({ onReset }) => {
  return (
    <Typography 
      variant="h4" 
      onClick={onReset}
      sx={{ 
        mb: 3, 
        fontWeight: 'bold', 
        color: '#1976d2', 
        cursor: 'pointer',
        display: 'inline-block',
        '&:hover': { opacity: 0.8 } 
      }}
    >
      Drug Information System
    </Typography>
  );
};

export default Header;