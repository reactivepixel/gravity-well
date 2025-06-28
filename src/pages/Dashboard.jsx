import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  People,
  Inventory,
  Business,
  TrendingUp,
  Schedule,
} from "@mui/icons-material";

function Dashboard() {
  const stats_cards = [
    {
      title: "Total Locations",
      value: "3",
      icon: LocationOn,
      color: "#1976d2",
    },
    { title: "Active Users", value: "3", icon: People, color: "#388e3c" },
    { title: "Products", value: "125", icon: Inventory, color: "#f57c00" },
    { title: "Clients", value: "15", icon: Business, color: "#7b1fa2" },
  ];

  const recent_activities = [
    {
      action: "New client added",
      item: "The Grand Ballroom",
      time: "2 hours ago",
    },
    { action: "User logged in", item: "Sarah Johnson", time: "4 hours ago" },
    {
      action: "Product updated",
      item: "Event Package #127",
      time: "6 hours ago",
    },
    { action: "Location visit", item: "Main Office", time: "1 day ago" },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        CRM Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back! Here's what's happening with your business today.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats_cards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Icon sx={{ color: stat.color, mr: 1 }} />
                    <Typography variant="h6" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Schedule sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">Recent Activity</Typography>
            </Box>
            <Box>
              {recent_activities.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                    borderBottom:
                      index < recent_activities.length - 1
                        ? "1px solid #e0e0e0"
                        : "none",
                  }}
                >
                  <Box>
                    <Typography variant="body2">
                      <strong>{activity.action}:</strong> {activity.item}
                    </Typography>
                  </Box>
                  <Chip label={activity.time} size="small" variant="outlined" />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TrendingUp sx={{ mr: 1, color: "success.main" }} />
              <Typography variant="h6">Quick Overview</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Most Popular Client
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  The Grand Ballroom
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Active Location
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  Main Office
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  System Status
                </Typography>
                <Chip
                  label="All Systems Operational"
                  color="success"
                  size="small"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
