"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import LPLogo from "../../../images/lp-logo.png";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/lib/Redux/Store";
import { clearUserToken } from "@/lib/Redux/tokenSlice/TokenSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const { userToken } = useSelector(
    (reduxStore: ReturnType<typeof store.getState>) =>
      reduxStore.userTokenReducer
  );
  const dispatch = useDispatch();
  const navigate = useRouter();
  const handleLogOut = () => {
    dispatch(clearUserToken());
    navigate.push("/login");
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {!userToken && (
          <Button
            href="/register"
            variant="text"
            sx={{ color: "black", fontWeight: "600" }}
          >
            Register
          </Button>
        )}
      </MenuItem>
      <MenuItem>
        {userToken ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              href="/"
              variant="text"
              sx={{ color: "black", fontWeight: "600" }}
            >
              Home
            </Button>
            <Button
              href="/profile"
              variant="text"
              sx={{ color: "black", fontWeight: "600" }}
            >
              Profile
            </Button>
            <Button
              onClick={handleLogOut}
              variant="text"
              sx={{ color: "black", fontWeight: "600" }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            href="/login"
            variant="text"
            sx={{ color: "black", fontWeight: "600" }}
          >
            Login
          </Button>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1,zIndex:'10' }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#252728",px:4 }}>
        <Toolbar>
          <Link href="/">
            <Typography
              noWrap
              component="div"
              sx={{ display: { borderRadius: "50%", overflow: "hidden" } }}
            >
              <Image src={LPLogo} alt="LPLogo" width={40} height={40} />
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
           

            {!userToken && (
              <Button href="/register" variant="text" sx={{ color: "white" }}>
                Register
              </Button>
            )}
            {userToken ? (
              <Box>
 <Button href="/" variant="text" sx={{ color: "white" }}>
              Home
            </Button>
            <Button href="/profile" variant="text" sx={{ color: "white" }}>
              Profile
            </Button>
              <Button
                onClick={handleLogOut}
                variant="text"
                sx={{ color: "white" }}
              >
                Logout
              </Button>
              </Box>
            ) : (
              <Button href="/login" variant="text" sx={{ color: "white" }}>
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
