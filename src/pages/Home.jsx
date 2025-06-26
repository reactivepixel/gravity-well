import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

function Home() {
  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="h3" gutterBottom>Gravity Well</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, mx: 'auto' }}>
        <Button variant="contained" component={Link} to="/demo">
          Demo Page
        </Button>
        <Typography>Showcases a form with Jotai state management</Typography>
        <Button variant="contained" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Typography>View an admin layout with Material-UI</Typography>
      </Box>
    </Box>
  );
}

export default Home;