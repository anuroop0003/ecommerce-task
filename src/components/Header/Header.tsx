import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Avatar,
  Badge,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userName = localStorage.getItem("user_name") || "Guest User";
  const profileImage = localStorage.getItem("profile_img") || "";
  const roleType = localStorage.getItem("role_type") || "";

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}
          >
            InstaCart
          </Typography>

          {(roleType === "user" || roleType === "moderator") && (
            <Tooltip title="Go to Cart">
              <IconButton
                sx={{ marginX: 2.5 }}
                onClick={handleCartClick}
                color="inherit"
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Profile Options">
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <Avatar alt={userName} src={profileImage} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem disabled sx={{ fontWeight: "bold" }}>
          {userName}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleLogout();
          }}
          sx={{ fontWeight: "bold", color: "#C12831" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
