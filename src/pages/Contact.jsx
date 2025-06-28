import { Typography, Paper, Box, Grid, Chip } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";

const Contact = () => {
  const contact_info = [
    { icon: Email, label: "Email", value: "support@crm-company.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    {
      icon: LocationOn,
      label: "Address",
      value: "123 Business St, Suite 100, City, State 12345",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Information
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {contact_info.map((info, index) => {
          const Icon = info.icon;
          return (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
                <Icon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {info.label}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {info.value}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Support Hours
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          <Chip label="Monday - Friday: 9:00 AM - 6:00 PM" variant="outlined" />
          <Chip label="Saturday: 10:00 AM - 4:00 PM" variant="outlined" />
          <Chip label="Sunday: Closed" variant="outlined" />
        </Box>
      </Paper>
    </Box>
  );
};

export default Contact;
