/**
 * @file Display's a supplier's existing match Requests
 * @author Kevin Xu
 *
 * Maybe we want to memoize this?
 */

import {
  Typography,
  Stack,
  Card,
  Box,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { ItemMatchRequest, RequestStatus } from 'types/rest';
import Api from 'utils/api';
import { parseAxiosSuccessResponse } from 'utils/request';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { setMessageSnackbarType } from 'types';

interface AllMatchPropTypes {
  setMessage: setMessageSnackbarType;
}

/**
 *
 * @param {Object} root0 General Props
 * @param {setMessageSnackbarType} root0.setMessage message for error popover
 * @returns {React.ReactElement} All Item Requests Ever, including those that are awaiting, rejected, and in the market
 */
export const All = ({ setMessage }: AllMatchPropTypes): React.ReactElement => {
  const [itemMatchRequests, setItemMatchRequests] = useState<
    ItemMatchRequest[]
  >([]);
  React.useEffect(() => {
    /**
     *
     */
    const fetchItemMatchRequests = async () => {
      const response = await Api.get('/itemMatchRequestsForRole', {
        status: RequestStatus.AWAITING,
      });
      const itemMatchRequests =
        parseAxiosSuccessResponse<ItemMatchRequest[]>(response);
      if (itemMatchRequests) {
        setItemMatchRequests(itemMatchRequests);
      }
    };
    fetchItemMatchRequests();
  }, []);

  /**
   *
   * @param {ItemMatchRequest} match match request to be accepted
   */
  const onAcceptItemMatchRequest = async (match: ItemMatchRequest) => {
    await Api.post(
      '/acceptItemMatchRequest',
      { ...match },
      setMessage,
      'Successfully accepted item match request',
    );
    setItemMatchRequests(
      itemMatchRequests.filter((a: ItemMatchRequest) => a._id !== match._id),
    );
  };

  /**
   *
   * @param {ItemMatchRequest} match Item match request to be rejected
   */
  const onRejectItemMatchRequest = async (match: ItemMatchRequest) => {
    await Api.post(
      '/rejecttItemMatchRequest',
      { ...match },
      setMessage,
      'Successfully rejected item match request',
    );
    setItemMatchRequests(
      itemMatchRequests.filter((a: ItemMatchRequest) => a._id !== match._id),
    );
  };
  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        See the status of all match requests here
      </Typography>
      <Box sx={{ width: '80%' }}>
        <Stack spacing={2}>
          {itemMatchRequests.map((data: ItemMatchRequest) => {
            return (
              <Card key={data._id} sx={{ display: 'flex' }}>
                {data.item.imageUrl && (
                  <CardMedia
                    component="img"
                    loading="lazy"
                    sx={{
                      resizeMode: 'contain',
                      height: '80%',
                      width: '100px',
                    }}
                    image={data.item.imageUrl}
                    alt={data.item.title}
                  />
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
                      {data.item.title}
                    </Typography>
                    <Typography variant="body2">
                      Request from {data.requester.email}
                    </Typography>
                    <Typography variant="body2">
                      Requested to buy {data.amount} units
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="check-circle"
                      color="success"
                      onClick={() => {
                        onAcceptItemMatchRequest(data);
                      }}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      aria-label="check-circle"
                      color="error"
                      onClick={() => {
                        onRejectItemMatchRequest(data);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </CardActions>
                </Box>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </div>
  );
};
