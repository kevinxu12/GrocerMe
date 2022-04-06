/**
 * @file Item Purchase Page
 * TO DO - maybe we can make a back button?
 * @author Kevin Xu
 */

import {
  Card,
  CardHeader,
  CardActions,
  Button,
  CardMedia,
  CardContent,
  TextField,
  Typography,
  Stack,
  Avatar,
  Box,
  Alert,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { ItemRequest, ItemRequestStatus } from 'types/rest';
import Api from 'utils/api';
import { parseAxiosSuccessResponse } from 'utils/request';
import SnackbarComponent from 'app/components/SnackbarComponent';
import { setMessageSnackbarType } from 'types';
import { calculateAmountRemaining } from 'utils/logic';

interface ItemPurchaseParams {
  id?: string;
}

/**
 *
 * @param {Object} root0 General Props
 * @param {setMessageSnackbarType} root0.setMessage set message for error popover
 * @returns {React.ReactElement} Item Purchase Page
 */
export const Purchase = ({ setMessage }): React.ReactElement => {
  const id = useParams<ItemPurchaseParams>();
  const [amountRequested, setAmountRequested] = useState<String>('0');
  const [itemRequest, setItemRequest] = useState<ItemRequest | null>(null);

  useEffect(() => {
    /**
     *
     * @param {ItemPurchaseParams} id the id object to fetch item request for
     */
    const fetchItemRequestById = async (
      id: ItemPurchaseParams,
    ): Promise<void> => {
      if (Object.keys(id).length === 0) {
        console.log(`No Params found for Item Request ${id}`);
        return;
      }
      const response = await Api.get('/itemRequest', id);
      const itemRequest = parseAxiosSuccessResponse<ItemRequest>(response);
      if (itemRequest) {
        if (itemRequest.status !== ItemRequestStatus.ACCEPTED) {
          setItemRequest(null);
          return;
        }
        setItemRequest(itemRequest);
        return;
      }
    };
    fetchItemRequestById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Object.keys(id).length === 0) {
    return (
      <div>
        This component is only meant to be rendered with a specific product id
      </div>
    );
  }

  if (itemRequest && itemRequest.amount === itemRequest.amountSold) {
    return <Alert severity="error">The item is actually sold out!</Alert>;
  }

  /**
   *
   * @param {React.MouseEvent} e mouse event
   */
  const requestMatch = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!itemRequest) {
      console.log('No item request found');
      return;
    }
    Api.post(
      '/newItemMatchRequest',
      { itemRequestId: itemRequest._id, amount: amountRequested },
      setMessage,
      'Successfully made request',
    );
  };

  return (
    <div>
      {itemRequest ? (
        <div>
          <Stack spacing={2}>
            <Card sx={{ width: '90%', height: 'auto' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                title={itemRequest.title}
                subheader={itemRequest.createdAt}
              />
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        Posted by: {itemRequest.requester.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {itemRequest.description}
                      </Typography>
                      <TextField
                        required
                        label="Amount"
                        type="number"
                        onChange={e => setAmountRequested(e.target.value)}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            max: calculateAmountRemaining(itemRequest),
                          },
                        }}
                        value={amountRequested}
                        id="outlined-start-adornment"
                        sx={{ width: '25ch', mb: 1, backgroundColor: 'white' }}
                      />
                    </Stack>
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  loading="lazy"
                  sx={{ width: '20%', mr: 2 }}
                  image={itemRequest.imageUrl}
                  alt={itemRequest.title} // change this to an alternate description
                />
              </Box>
              <CardActions>
                <Button size="small" color="primary" onClick={requestMatch}>
                  Match
                </Button>
              </CardActions>
            </Card>
          </Stack>
        </div>
      ) : (
        <div>
          {' '}
          For some reason the product id correspondin to this URL no longer
          exists{' '}
        </div>
      )}
    </div>
  );
};

/**
 *
 * @returns {React.ReactElement} Item Purchase with Snackbar
 */
export const ItemPurchase = (): React.ReactElement => {
  return <SnackbarComponent component={Purchase} />;
};
