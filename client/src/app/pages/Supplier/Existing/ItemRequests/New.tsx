/**
 * @file Form Component to Make New Item Request
 * TO DO - we should find a way to upload phone numbers
 * @author Kevin Xu
 */
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GoogleMaps from 'app/components/AutoComplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Api from 'utils/api';
import { setMessageSnackbarType } from 'types';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import ImageUploader from 'react-images-upload';

const DEFAULT_ITEM_STATE = {
  title: '',
  amount: 0,
  description: '',
  location: '',
  date: null,
  image: null,
  imageName: '',
};
interface ItemState {
  title: string;
  amount: number;
  description: string;
  location: string;
  date: Date | null;
  image: string | ArrayBuffer | null;
  imageName: string;
}
interface NewItemRequestPropTypes {
  setMessage: setMessageSnackbarType;
}

/**
 *
 * @param {Object} root0 props
 * @param { setMessageSnackbarType} root0.setMessage message for error popover
 * @returns {React.ReactElement} Returns a component to make new item requests
 */
export default function New({
  setMessage,
}: NewItemRequestPropTypes): React.ReactElement {
  const ref = useRef<ItemState>(DEFAULT_ITEM_STATE);
  // these two need to be coalesced with the ref
  const [date, setDate] = useState<Date | null>(null);
  const [pictures, setPictures] = useState<File[] | []>([]);
  /**
   * Handle submitting a new item request
   *
   * @param {React.FormEvent<HTMLElement>} ev click event
   */
  const handleSubmit = async (ev: React.FormEvent<HTMLElement>) => {
    ev.preventDefault();
    const file = pictures[0];
    ref.current.image = await convertToBase64(file);
    ref.current.imageName = file.name;
    Api.post(
      '/newItemRequest',
      ref.current as ItemState,
      setMessage,
      'Successfully submitted a request for this item to be sold',
    );
  };

  /**
   * This should be abstracted to a helper later, and shouldn't be in the New class
   *
   * @param {File} file image file
   * @returns {Promise} Base64 string of the image
   */
  const convertToBase64 = (
    file: File,
  ): Promise<string | ArrayBuffer | null> => {
    /** */
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      /**
       *
       */
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  /**
   * @param {File[]} picture pictures dropped in by the image component
   */
  const onDrop = (picture: File[]) => {
    setPictures(picture);
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
              required
              label="Title"
              inputRef={input => {
                if (input) {
                  ref.current.title = input.value;
                }
              }}
              id="outlined-start-adornment"
              sx={{ width: '25ch', mb: 1, mr: 1, backgroundColor: 'white' }}
            />
            <TextField
              required
              label="Amount"
              type="number"
              inputRef={input => {
                if (input) {
                  ref.current.amount = input.value;
                }
              }}
              id="outlined-start-adornment"
              sx={{ width: '25ch', mb: 1, backgroundColor: 'white' }}
            />
            <Stack spacing={1}>
              <TextField
                required
                label="Description"
                inputRef={input => {
                  if (input) {
                    ref.current.description = input.value;
                  }
                }}
                fullWidth
                sx={{ mb: 1, backgroundColor: 'white' }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Expiration Date"
                  inputFormat="MM/dd/yyyy"
                  onChange={setDate}
                  value={date}
                  renderInput={params => (
                    <TextField
                      sx={{ mb: 1, backgroundColor: 'white' }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>

              <GoogleMaps
                setDescription={data => {
                  if (data) {
                    ref.current.location = data.description;
                  }
                }}
              />
              <ImageUploader
                withIcon={false}
                labelStyles={{ fontFamily: 'Montserrat' }}
                label="Max File Size is 5MB, Upload Image of Product"
                buttonText="Choose Image"
                onChange={onDrop}
                imgExtension={['.png']}
                maxFileSize={5242880}
                singleImage={true}
              />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </div>
        </Box>
      </form>
    </div>
  );
}
