/**
 * @file Form Component
 */
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GoogleMaps from 'app/components/AutoComplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const DEFAULT_ITEM_STATE = {
  title: '',
  amount: 0,
  description: '',
  location: '',
};
interface ItemState {
  title: string;
  amount: number;
  description: string;
  location: string;
}

/**
 *
 * @returns {React.ReactElement} Returns a component to make new item requests
 */
export default function ItemRequest(): React.ReactElement {
  const ref = useRef<ItemState>(DEFAULT_ITEM_STATE);
  const [location, setDescription] = useState<string>('');
  /**
   * @param {React.FormEvent<HTMLElement>} ev click event
   */
  const handleSubmit = (ev: React.FormEvent<HTMLElement>) => {
    ref.current.location = location; // assign the location
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div" sx={{ m: 1 }}>
        Input a new Product Request here
      </Typography>
      <form onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <TextField
              label="Title"
              inputRef={input => (ref.current.title = input)}
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              label="Amount"
              type="number"
              inputRef={input => (ref.current.amount = input)}
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              label="Description"
              inputRef={input => (ref.current.description = input)}
              fullWidth
              sx={{ m: 1 }}
            />
            <GoogleMaps setDescription={setDescription} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ m: 1 }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
}
