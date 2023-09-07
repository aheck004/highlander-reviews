/*import * as React from "react";*/
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useParams } from "react-router-dom";
import date from "date-and-time";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";
import Cookie from "js-cookie";
import { Snackbar, Alert } from "@mui/material";

export default function CreateReviewModal({ avg_diff }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const CHARACTER_LIMIT = 1500;
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const timer = React.useRef();
  const { subjectCode } = useParams();
  const { courseNumber } = useParams();
  const course = subjectCode + courseNumber; //gets the field :course from /course/:course
  const [rating, setRating] = React.useState(2.5);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarType, setSnackbarType] = React.useState("success");

  const [comment, setComment] = React.useState({
    user_review: "",
  });

  const [googleUser, setGoogleUser] = React.useState("");

  const theme = themes[useTheme().theme];

  React.useEffect(() => {
    if (Cookie.get("googleUser"))
      setGoogleUser(JSON.parse(Cookie.get("googleUser").slice(2)))
    else
      window.location.reload()
  }, []);

  React.useEffect(() => {
    if (status === "error")
      setSnackbarType (
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong. Please try again.
        </Alert>
      );
    else if (status === "success")
      setSnackbarType (
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Thank you for your review!
        </Alert>
      );
    else if (status === "warning")
      setSnackbarType(
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          You already reviewed this course!
        </Alert>
      );
  }, [status]);

  const handleChange = (user_review) => (event) => {
    setComment({ ...comment, [user_review]: event.target.value });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const buttonSx = {
    ...(status==="success" && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);

      const currentDate = new Date();

      const newReview = {
        user_email: googleUser.email,
        class_name: course,
        additional_comments: comment.user_review,
        difficulty: rating * 2, //Align with database
        date: date.format(currentDate, "YYYY/MM/DD"),
        like: 0,
        dislike: 0,
      };

      async function submitReview(newReview) {
        //Request node server for classes named inputValye
        await axios
          .create({ withCredentials: true })
          .post(process.env.REACT_APP_NODE_SERVER + '/submit-review', newReview)
          .then((response) => {
            if (response.data === `You already reviewed ${course}`) {
              setStatus("warning");
            } 
            else if (response.data === 'Something went wrong') {
              //TODO Render a snakcbar for this error 
            } 
            else 
            {
              setStatus("success");
            }

            setLoading(false);
            setOpen(false);
            setOpenSnackbar(true);
          })
          .catch((error) => {
            console.error(error);
            setStatus("error");
            setOpenSnackbar(true);
          });
      }
      submitReview(newReview);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={handleOpen} variant="contained" color="primary">
          Write a review for this course
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              style: { backgroundColor: "text" }, //Changes color when a color is specified but is too solid.
            },
          }}
        >
          <Fade in={open}>
            <Box sx={
              {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 400,
              bgcolor: "background.main",
              border: `2px solid ${theme.palette.text.main}`,
              boxShadow: 24,
              p: 4,
            }
            }>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="background.contrastText"
              >
                Write a Review
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                color="background.contrastText"
              >
                How difficult was this course?
              </Typography>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography color="background.contrastText">Easy</Typography>
                <Rating
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  value={rating}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "accent.main",
                    },
                    "& .MuiRating-iconHover": {
                      color: "accent.main",
                    },
                  }}
                  onChange={(event, newRating) => {
                    setRating(newRating);
                  }}
                />
                <Typography color="background.contrastText">Hard</Typography>
              </Stack>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                color="background.contrastText"
              >
                What are your thoughts on this course?
              </Typography>
              <FormControl sx={{ width: "100%" }}>
                <OutlinedInput
                  inputProps={{
                    maxLength: CHARACTER_LIMIT,
                    sx: {
                      color: "background.contrastText",
                    },
                  }}
                  value={comment.user_review}
                  onChange={handleChange("user_review")}
                  multiline
                  rows={5}
                  placeholder="Review"
                />
                <Typography
                  sx={{ alignSelf: "flex-end" }}
                  color="background.contrastText"
                >{`${comment.user_review.length}/${CHARACTER_LIMIT}`}</Typography>
              </FormControl>
              <Box sx={{ m: 0, position: "relative", width: "fit-content" }}>
                <Button
                  variant="contained"
                  sx={buttonSx}
                  disabled={loading}
                  onClick={handleButtonClick}
                  color="primary"
                >
                  Submit Review
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        {typeof snackbarType === 'string' ? null : snackbarType}      
      </Snackbar>
    </ThemeProvider>
  );
}
