import { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useProfile } from "../context/ProfileContext";

import {
  Menu as MenuIcon,
  Dashboard,
  MenuBook,
  Favorite,
  History,
  Notifications,
  Analytics,
  Person,
  Settings,
  Logout,
  Search,
} from "@mui/icons-material";

import { Link, Outlet } from "react-router-dom";

const drawerWidth = 250;

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    text: "Books",
    icon: <MenuBook />,
    path: "/books",
  },
  {
    text: "Favorites",
    icon: <Favorite />,
    path: "/favorites",
  },
  {
    text: "Search History",
    icon: <History />,
    path: "/search-history",
  },
  {
    text: "Notifications",
    icon: <Notifications />,
    path: "/notifications",
  },
  {
    text: "Analytics",
    icon: <Analytics />,
    path: "/analytics",
  },
  {
    text: "Profile",
    icon: <Person />,
    path: "/profile",
  },
  {
    text: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
  {
    text: "Logout",
    icon: <Logout />,
    path: "/",
  },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
const { profile } = useProfile();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          📚 Book Platform
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Book Discovery Platform
          </Typography>

          <TextField
            size="small"
            placeholder="Search books..."
            sx={{ width: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <IconButton sx={{ ml: 2 }}>
            <Badge badgeContent={5} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Avatar
  src={profile.profilePicture}
  sx={{
    ml: 2,
    width: 40,
    height: 40,
  }}
>
  {!profile.profilePicture &&
    `${profile.firstName[0]}${profile.lastName[0]}`}
</Avatar>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}