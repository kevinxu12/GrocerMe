/**
 * @file A component to display all itemrequests from suppliers
 * @author Kevin Xu
 * Component with a lot of duplciated code. If more time, we can consolidate with AllRequests
 * Maybe we want to memoize this?
 */

import {
  Stack,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ItemRequest, ItemRequestStatus } from 'types/rest';
import Api from 'utils/api';
import { parseAxiosSuccessResponse } from 'utils/request';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

/**
 *
 * @param {Function} setMessage sets a snackbar handler
 * @returns {React.ReactElement} Dashboard Component for Item Requests
 */
export const ItemRequestDashboard = ({ setMessage }): React.ReactElement => {
  const [itemRequests, setItemRequests] = useState<ItemRequest[]>([]);
  React.useEffect(() => {
    /**
     * Fetches all the item requests
     */
    const fetchItemRequests = async () => {
      const response = await Api.get('/allItemRequests', {
        status: ItemRequestStatus.AWAITING,
      });
      const itemRequests = parseAxiosSuccessResponse<ItemRequest[]>(response);
      if (itemRequests) {
        setItemRequests(itemRequests);
      }
    };
    fetchItemRequests();
  }, []);
  /**
   * @param {ItemRequest} request the item request object
   */
  const onAcceptItemRequest = async (request: ItemRequest) => {
    await Api.post(
      '/acceptItemRequest',
      { ...request },
      setMessage,
      'Successfully accepted item request',
    );
    setItemRequests(
      itemRequests.filter((a: ItemRequest) => a._id !== request._id),
    );
  };
  /**
   * @param {ItemRequest} request the item request object
   */
  const onRejectItemRequest = async (request: ItemRequest) => {
    await Api.post(
      '/rejectItemRequest',
      { ...request },
      setMessage,
      'Successfully rejected item request',
    );
    setItemRequests(
      itemRequests.filter((a: ItemRequest) => a._id !== request._id),
    );
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        See the status of all product requests here
      </Typography>
      <Stack spacing={1}>
        {itemRequests.map((data: ItemRequest, index: number) => {
          return (
            <Card key={index} sx={{ width: '50%' }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2">{data.status}</Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="check-circle"
                  color="success"
                  onClick={() => {
                    onAcceptItemRequest(data);
                  }}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  aria-label="check-circle"
                  color="error"
                  onClick={() => {
                    onRejectItemRequest(data);
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    </div>
  );
};
