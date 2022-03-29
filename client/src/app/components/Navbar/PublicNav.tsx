/**
 * @file Component for Navbar shown for non-logged-in users
 * @author Kevin Xu
 */
import * as React from 'react';
// import styled from 'styled-components/macro';
import { StyledConstants } from 'styles/StyleConstants';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Link from '@mui/material/Link';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Constants } from 'utils/constants';

/**
 * @returns {React.ReactElement} Component for public navbar
 */
export function PublicNav(): React.ReactElement {
  const trigger = useScrollTrigger();
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          fontFamily: StyledConstants.INTER,
        }}
      >
        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar position="static" color="transparent">
            <Toolbar>
              <LocalGroceryStoreIcon sx={{ mr: 2 }} />
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Grocer Me
              </Typography>
              <Link
                underline="none"
                href={Constants.ABOUT}
                color="inherit"
                variant="subtitle1"
                sx={{ marginRight: '2%' }}
              >
                About Us
              </Link>
              <Link
                underline="none"
                href={Constants.CONTACT_US}
                color="inherit"
                variant="subtitle1"
              >
                Contact Us
              </Link>
            </Toolbar>
          </AppBar>
        </Slide>
      </Box>
    </div>
  );
}
