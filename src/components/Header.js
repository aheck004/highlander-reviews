import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";
import getGoogleOAuthURL from "../getGoogleURL";
import Cookie from "js-cookie";
import { Avatar, List } from "@mui/material";
import { Breadcrumbs, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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

export default function PrimarySearchAppBar({ title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { subjectCode, courseNumber } = useParams();
  const [URL, setURL] = React.useState(window.location.href);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [googleUser, setGoogleUser] = React.useState('');

  const theme = themes[useTheme().theme];

  React.useEffect(() => {
    if (Cookie.get("googleUser"))
      setGoogleUser(JSON.parse(Cookie.get("googleUser").slice(2)))
  }, []);

  const navigate = useNavigate();

  const isMobile = window.innerWidth < 700;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
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
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography>Login</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon color="background" />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" },
              marginRight: "5px"}}
            >
              {title}
            </Typography>
            <Box sx={{ marginLeft: "5px" }}>
              <SearchBar width={isMobile ? 200 : 300} height={35} />
            </Box>
            <Breadcrumbs color="background.main" sx={{marginLeft:"10px", display: "flex", justifyContent: "center", alignItems:"center"}} separator={<ArrowRightIcon/>} maxItems={3} aria-label="breadcrumb">
              <Link sx={{ gap:"3px", display:"flex", justifyContent:"center", alignItems:"center"}} underline="hover" color="inherit" href="/">
                <HomeIcon color="background" 
                sx={{ marginRight: "5px" }} fontSize="small" />
                <Typography color="background.main">Home</Typography>
              </Link>
              {subjectCode && (
              <Link sx={{ gap:"3px", display:"flex", justifyContent:"center", alignItems:"center"}} underline="hover" color="inherit" href={`/Course/${subjectCode}`}>
                <ListIcon color="background" sx={{ marginRight: "5px" }} fontSize="small" />
                <Typography color="background.main">{subjectCode} </Typography>
              </Link>
              )}
              {courseNumber && (
              <Link sx={{ gap: "3px", display:"flex", justifyContent:"center", alignItems:"center"}} underline="hover" color="inherit" href={`/Course/${subjectCode}/${courseNumber}`}>
                <RateReviewIcon color="background" sx={{ marginRight: "5px" }} fontSize="small" />
                <Typography color="background.main">{courseNumber}</Typography>
              </Link>
              )}
            </Breadcrumbs>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {googleUser ? (
                <Box sx={{ display: "flex", alignItems: "center", gap:"10px" }}>
                  <Typography variant="h6" noWrap component="div">
                    Welcome, {googleUser.given_name}!
                  </Typography>
                  <Avatar src={googleUser.picture}/>
                </Box>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  href={getGoogleOAuthURL(URL)}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
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
    </ThemeProvider>
  );
}
