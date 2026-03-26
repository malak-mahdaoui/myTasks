import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  Divider,
  Tooltip
} from "@mui/material";
import {
  Assignment,
  Favorite,
  TaskAlt,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.tasks.filter);

  const filterdTasks = (favFilter) =>
    tasks && tasks.length
      ? favFilter
        ? tasks.filter((task) => task.favorite)
        : tasks.filter((task) => task.taskCompleted)
      : [];

  const handleSignout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/signin");
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backdropFilter: "blur(10px)",
        background: "rgba(52, 4, 39, 0.5)",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <TaskAlt fontSize="large" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, display: { xs: "none", sm: "block" } }}
          >
            My Tasks
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <>
            {/* Desktop badges */}
            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 4,
              }}
            >
              <Tooltip title="Total Tasks">
                <Badge badgeContent={tasks.length} color="secondary">
                  <Assignment sx={{ fontSize: 28 }} />
                </Badge>
              </Tooltip>

              <Tooltip title="Completed">
                <Badge badgeContent={filterdTasks(false).length} color="success">
                  <TaskAlt sx={{ fontSize: 28 }} />
                </Badge>
              </Tooltip>

              <Tooltip title="Favorite">
                <Badge badgeContent={filterdTasks(true).length} color="error">
                  <Favorite sx={{ fontSize: 28 }} />
                </Badge>
              </Tooltip>
            </Stack>

            {/* Desktop links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button component={Link} to="/" color="inherit">
                Tasks
              </Button>
              <Button component={Link} to="/liked" color="inherit">
                Favorite
              </Button>
              <Button onClick={handleSignout} color="inherit">
                Logout
              </Button>

              <Avatar
                component={Link}
                to="/profile"
                sx={{ cursor: "pointer", boxShadow: 2 }}
                src="/broken-image.jpg"
              />
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
              onClick={handleAvatarClick}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/signin" color="inherit">
              Signin
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Signup
            </Button>
          </Stack>
        )}
      </Toolbar>

      {/* Mobile menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem component={Link} to="/" onClick={handleMenuClose}>
          Tasks
        </MenuItem>
        <MenuItem component={Link} to="/liked" onClick={handleMenuClose}>
          Favorite
        </MenuItem>
        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
