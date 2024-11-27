import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export default function StickyFooter() {
  return (
    <Box
      component="footer"
      sx={{
        borderRadius: '40px',
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#fff',
        shadow: '1px 1px 1px #03a9f4',
        border: '1px solid #ddd',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2">My sticky footer can be found here.</Typography>
        <Link />
      </Container>
    </Box>
  );
}
