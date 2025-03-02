import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Header: React.FC = () => {
  return (
    <header>
      <Box 
        sx={{
          backgroundColor: '#1976d2', 
          color: 'white', 
          padding: '40px 0', 
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h3" component="h1" gutterBottom>
              Banner Generator 
          </Typography>
          <Typography variant="h6" component="p">
            Create your custom banner using AI 
          </Typography>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
