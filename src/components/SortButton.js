import SortIcon from "@mui/icons-material/Sort";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import TodayIcon from "@mui/icons-material/Today";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, Button, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";

function SortButton({ setSort }) {
  const theme = themes[useTheme().theme];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortReviews = (sortType) => {
    if (sortType === "leastrecent") {
      setSort({ date: 1 })
    } else if (sortType === "mostrecent") {
      setSort({ date: -1 }); 
    } else if (sortType === "highestdifficulty") {
      setSort({ difficulty: -1 }); 
    } else if (sortType === "lowestdifficulty") {
      setSort({ difficulty: 1 }); 
    } else if (sortType === "mosthelpful") {
      setSort({ like: -1 });
    } else if (sortType === "leasthelpful") {
      setSort({ dislike: -1 });
    }
    console.log(sortType);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          sx={{
            width: "170px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: `${theme.palette.accent.contrastText}` //Text elements within the button
          }}
          variant="contained"
          startIcon={<SortIcon />}
          endIcon={<ArrowDropDownIcon />}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="accent"
        >
          Sort By...
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{ //Deprecated
            style: {
              backgroundColor: `${theme.palette.secondary.main}`, // Color of the dropdown containing MenuItems
            },
          }}
        >
          <MenuItem
            onClick={() => {
              sortReviews("mostrecent");
            }}
          >
            <TodayIcon color="text"/>
            <Typography color="secondary.contrastText">
              Newest
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortReviews("leastrecent")
            }}
          >
            <TodayIcon color="text"/>
            <Typography color="secondary.contrastText">
              Oldest
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortReviews("highestdifficulty");
            }}
          >
            <StarIcon color="text"/>
            <Typography color="secondary.contrastText">
              Highest Difficulty
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortReviews("lowestdifficulty");
            }}
          >
            <StarHalfIcon color="text"/>
            <Typography color="secondary.contrastText">
              Lowest Difficulty
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortReviews("mosthelpful");
            }}
          >
            <ThumbUpOffAltIcon color="text"/>
            <Typography color="secondary.contrastText">
              Most Helpful
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortReviews("leasthelpful");
            }}
          >
            <ThumbDownOffAltIcon color="text"/>
            <Typography color="secondary.contrastText">
              Least Helpful
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </ThemeProvider>
  );
}

export default SortButton;
