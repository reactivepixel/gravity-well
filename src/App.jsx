import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CRM_Layout from "./components/CRM_Layout";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Users from "./pages/Users";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <CRM_Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/users" element={<Users />} />
            {/* Placeholder routes for navigation items */}
            <Route
              path="/locations/*"
              element={<div>Locations Section - Coming Soon</div>}
            />
            <Route
              path="/products"
              element={<div>Products Section - Coming Soon</div>}
            />
            <Route
              path="/clients/*"
              element={<div>Clients Section - Coming Soon</div>}
            />
          </Routes>
        </CRM_Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
