import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateReviewModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const CHARACTER_LIMIT = 1500;
  const [values, setValues] = React.useState({
    user_review: ""
  });

  const handleChange = (user_review) => (event) => {
    setValues({ ...values, [user_review]: event.target.value });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='outlined'>Write a review for this course</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Write a Review
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                How difficult was this course?
            </Typography>
                <Stack sx={{display: 'flex', flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Typography>Easy</Typography> 
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> 
                <Typography>Hard</Typography>
                </Stack>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                What are your thoughts on this course?
            </Typography>
            <FormControl sx={{ width: '100%'}}>
                <OutlinedInput
                    inputProps={{
                        maxlength: CHARACTER_LIMIT
                    }}
                    value={values.name}
                    onChange={handleChange("user_review")}
                    multiline
                    rows={5}
                    placeholder="Review"
                />
                <Typography sx={{alignSelf: 'flex-end'}}>{`${values.user_review.length}/${CHARACTER_LIMIT}`}</Typography>
            </FormControl>
            <Button onClick={handleOpen} variant='contained'>Submit Review</Button>
        </Box>
      </Modal>
    </div>
  );
}