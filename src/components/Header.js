import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";
import getGoogleOAuthURL from "../getGoogleURL";
import Cookie from "js-cookie";
import { Avatar, Grow } from "@mui/material";
import { Breadcrumbs, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { subjectCode, courseNumber } = useParams();
  const [URL, setURL] = useState(window.location.href);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [googleUser, setGoogleUser] = useState(null);

  const theme = themes[useTheme().theme];
  const setTheme = useTheme().toggleTheme;
  //console.log("The theme is: ", useTheme().theme);
  //console.log("Set Theme", setTheme);

  useEffect(() => {
    if (Cookie.get("googleUser"))
      setGoogleUser(JSON.parse(Cookie.get("googleUser").slice(2)));
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 700);
  };

  useEffect(() => {
    // Add a listener to the window resize event
    window.addEventListener("resize", handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

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
            {isMobile ? (
              <ClickAwayListener
                onClickAway={() => {
                  setSearchBarOpen(false);
                }}
              >
                {!isSearchBarOpen ? (
                  <IconButton onClick={() => setSearchBarOpen(true)}>
                    <SearchIcon />
                  </IconButton>
                ) : (
                  <Grow
                    in={isSearchBarOpen}
                    orientation="horizontal"
                    style={{ transitionDuration: "1500ms" }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <SearchBar
                        sx={{ MarginLeft: "auto", marginRight: "auto" }}
                        width={window.innerWidth - 35}
                        height={40}
                      />
                    </Box>
                  </Grow>
                )}
              </ClickAwayListener>
            ) : (
              <Box>
                <SearchBar width={350} height={35} />
              </Box>
            )}
            {!isSearchBarOpen && (
              <Breadcrumbs
                color="background.main"
                sx={{
                  marginLeft: isMobile ? "5px" : "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                separator={<ArrowRightIcon/>}
                maxItems={3}
                aria-label="breadcrumb"
              >
                <Link
                  sx={{
                    gap: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  underline="hover"
                  color="inherit"
                  href="/"
                >
                  {!isMobile && (
                    <HomeIcon
                      color="background"
                      sx={{ marginRight: "5px" }}
                      fontSize="small"
                    />
                  )}
                  <Typography color="background.main">Home</Typography>
                </Link>
                {subjectCode && (
                  <Link
                    sx={{
                      gap: "3px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    underline="hover"
                    color="inherit"
                    href={`/#/Course/${subjectCode}`}
                  >
                    {!isMobile && (
                      <ListIcon
                        color="background"
                        sx={{ marginRight: "5px" }}
                        fontSize="small"
                      />
                    )}
                    <Typography color="background.main">
                      {subjectCode}{" "}
                    </Typography>
                  </Link>
                )}
                {courseNumber && (
                  <Link
                    sx={{
                      gap: "3px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    underline="hover"
                    color="inherit"
                    href={`/#/Course/${subjectCode}/${courseNumber}`}
                  >
                    {!isMobile && (
                      <RateReviewIcon
                        color="background"
                        sx={{ marginRight: "5px" }}
                        fontSize="small"
                      />
                    )}
                    <Typography color="background.main">
                      {courseNumber}
                    </Typography>
                  </Link>
                )}
              </Breadcrumbs>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {!isSearchBarOpen && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  sx={{ color: "primary.contrastText" }}
                  onClick={() => {
                    setTheme(); // Call setTheme function
                  }}
                >
                  {theme.palette.name.main === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                {googleUser ? (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    {!isMobile && (
                      <Typography variant="h6" noWrap component="div">
                        Welcome, {googleUser.given_name}!
                      </Typography>
                    )}
                    <Avatar src={googleUser.picture} />
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
                    <AccountCircle />
                  </IconButton>
                )}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
