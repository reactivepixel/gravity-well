// Navigation data for CRM
import {
  LocationOn,
  People,
  Inventory,
  Business,
  Dashboard,
} from "@mui/icons-material";

export const navigation_data = {
  top_nav: [
    { label: "Locations", path: "/locations" },
    { label: "Users", path: "/users" },
    { label: "Products", path: "/products" },
    { label: "Clients", path: "/clients" },
  ],

  sidebar_sections: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Dashboard,
      path: "/",
    },
    {
      id: "locations",
      label: "Locations",
      icon: LocationOn,
      collapsible: true,
      sub_links: [
        { label: "Main Office", path: "/locations/main-office" },
        { label: "Main Storage", path: "/locations/main-storage" },
        { label: "Garage", path: "/locations/garage" },
      ],
    },
    {
      id: "users",
      label: "Users",
      icon: People,
      collapsible: true,
      sub_links: [
        { label: "John Smith", path: "/users/john-smith" },
        { label: "Sarah Johnson", path: "/users/sarah-johnson" },
        { label: "Mike Davis", path: "/users/mike-davis" },
      ],
    },
    {
      id: "products",
      label: "Products",
      icon: Inventory,
      path: "/products",
    },
    {
      id: "clients",
      label: "Clients",
      icon: Business,
      collapsible: true,
      sub_links: [
        { label: "The Grand Ballroom", path: "/clients/grand-ballroom" },
        {
          label: "Sunset Wedding Chapel",
          path: "/clients/sunset-wedding-chapel",
        },
        {
          label: "Metropolitan Convention Center",
          path: "/clients/metropolitan-convention-center",
        },
        {
          label: "Riverside Country Club",
          path: "/clients/riverside-country-club",
        },
        { label: "The Garden Pavilion", path: "/clients/garden-pavilion" },
        { label: "Oceana Event Hall", path: "/clients/oceana-event-hall" },
        {
          label: "Mountain View Resort",
          path: "/clients/mountain-view-resort",
        },
        { label: "The Crystal Palace", path: "/clients/crystal-palace" },
        { label: "Harbor View Marina", path: "/clients/harbor-view-marina" },
        {
          label: "The Estate at Willow Creek",
          path: "/clients/estate-willow-creek",
        },
        {
          label: "Downtown Conference Center",
          path: "/clients/downtown-conference-center",
        },
        { label: "The Lighthouse Venue", path: "/clients/lighthouse-venue" },
        {
          label: "Skyline Rooftop Terrace",
          path: "/clients/skyline-rooftop-terrace",
        },
        { label: "The Historic Manor", path: "/clients/historic-manor" },
        {
          label: "Lakeside Banquet Hall",
          path: "/clients/lakeside-banquet-hall",
        },
      ],
    },
  ],
};

export const user_data = {
  name: "Alex Rivera",
  email: "alex.rivera@company.com",
  avatar_url:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  role: "Manager",
};
