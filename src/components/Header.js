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
import banner from "../banner_small_on_blue.svg";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { subjectCode, courseNumber } = useParams();
  const [URL, setURL] = useState(window.location.href);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const [googleUser, setGoogleUser] = useState(null);

  const theme = themes[useTheme().theme];
  const setTheme = useTheme().toggleTheme;

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={
        () => {
          setGoogleUser(null);
          handleMenuClose();
          Cookie.remove("googleUser");
      }}>Log Out</MenuItem> 
    </Menu>
  );
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <a href="/">
              <img style= {{width: "auto", height: '30px', marginRight: "10px", display: isSearchBarOpen ? "none" : "flex"}}src={banner} className="App-logo" alt="logo"/>
            </a>
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
                        position: "absolute",
                        top: "6px",
                        left: "0px",
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
                separator={<ArrowRightIcon sx={{ color:"primary.contrastText" }} />}
                maxItems={3}
                aria-label="breadcrumb"
              >
                <Link
                  sx={{
                    gap: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "primary.contrastText"
                  }}
                  underline="hover"
                  color="inherit"
                  href="/"
                >
                  {!isMobile && (
                    <HomeIcon
                      color="background"
                      sx={{ marginRight: "5px", color: "primary.contrastText"}}
                      fontSize="small"
                    />
                  )}
                  <Typography color="primary.contrastText">Home</Typography>
                </Link>
                {subjectCode && (
                  <Link
                    sx={{
                      gap: "3px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "primary.contrastText"
                    }}
                    underline="hover"
                    color="primary.contrastText"
                    href={`/#/Course/${subjectCode}`}
                  >
                    {!isMobile && (
                      <ListIcon
                        color="primary.contrastText"
                        sx={{ marginRight: "5px" }}
                        fontSize="small"
                      />
                    )}
                    <Typography color="primary.contrastText">
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
                      color: "primary.contrastText"
                    }}
                    underline="hover"
                    color="inherit"
                    href={`/#/Course/${subjectCode}/${courseNumber}`}
                  >
                    {!isMobile && (
                      <RateReviewIcon
                        color="primary.contrastText"
                        sx={{ marginRight: "5px" }}
                        fontSize="small"
                      />
                    )}
                    <Typography color="primary.contrastText">
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
                      <Typography noWrap component="div">
                        Logged in as {googleUser.name}
                      </Typography>
                    )}
                    <IconButton
                      size="medium"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleMenuOpen}>
                    <Avatar sx={{ width: 30, height: 30 }} src={googleUser.picture} />
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    size="medium"
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
                {renderMenu}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
