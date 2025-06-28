import { Typography, Paper, Box } from "@mui/material";

const About = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        About Our CRM
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" paragraph>
          Welcome to our Customer Relationship Management system. This platform
          helps you manage your locations, users, products, and clients
          efficiently.
        </Typography>
        <Typography variant="body1" paragraph>
          Our CRM provides comprehensive tools for managing venue relationships,
          tracking interactions, and maintaining detailed records of all your
          business connections.
        </Typography>
        <Typography variant="body1">
          Use the sidebar navigation to explore different sections of the
          system, including location management, user administration, product
          catalogs, and client databases.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;
