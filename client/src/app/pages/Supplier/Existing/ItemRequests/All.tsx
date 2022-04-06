/**
 * @file Display's a supplier's existing Item Requests
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
} from '@mui/material';
import React, { useState } from 'react';
import { ItemRequest, ItemRequestStatus } from 'types/rest';
import Api from 'utils/api';
import { parseAxiosSuccessResponse } from 'utils/request';

/**
 *
 * @returns {React.ReactElement} All Item Requests Ever, including those that are awaiting, rejected, and in the market
 */
export const All = (): React.ReactElement => {
  const [itemRequests, setItemRequests] = useState<ItemRequest[]>([]);
  React.useEffect(() => {
    /**
     *
     */
    const fetchItemRequests = async () => {
      const response = await Api.get('/itemRequestsForUser');
      const itemRequests = parseAxiosSuccessResponse<ItemRequest[]>(response);
      if (itemRequests) {
        setItemRequests(itemRequests);
      }
    };
    fetchItemRequests();
  }, []);
  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        See the status of all product requests here
      </Typography>
      <Box sx={{ width: '80%' }}>
        <Stack spacing={2}>
          {itemRequests.map((data: ItemRequest) => {
            return (
              <Card key={data._id} sx={{ display: 'flex' }}>
                {data.imageUrl && (
                  <CardMedia
                    component="img"
                    loading="lazy"
                    sx={{
                      resizeMode: 'contain',
                      height: '80%',
                      maxHeight: '100px',
                      width: '100px',
                      m: 2,
                    }}
                    image={data.imageUrl}
                    alt={data.title}
                  />
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
                      {data.title}
                    </Typography>
                    <Typography variant="body2">
                      {data.status}
                      {data.status === ItemRequestStatus.ACCEPTED &&
                        '- The product is now available for sale to all customers'}
                      {data.status === ItemRequestStatus.REJECTED &&
                        '- The product will not be available for sale to all customers'}
                      {data.status === ItemRequestStatus.AWAITING &&
                        '- The product is awaiting approval from an admin.'}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </div>
  );
};
