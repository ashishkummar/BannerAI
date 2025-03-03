import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 2,
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="body1">© 2025 VDX.TV</Typography>
      </Container>
    </Box>
  );
};

export default Footer;


{/*
    
    
const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.900", color: "white", py: 3, mt: 4 }}>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              We provide high-quality services and innovative solutions.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Link href="#" color="inherit" display="block">Home</Link>
            <Link href="#" color="inherit" display="block">Services</Link>
            <Link href="#" color="inherit" display="block">Contact</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Follow Us</Typography>
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

    */}