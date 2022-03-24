/**
 * @file Display's a supplier's existing Item Requests
 * Maybe we want to memoize this?
 */

import { Typography, Stack, Card, Box, CardContent } from '@mui/material';
import React, { useState } from 'react';
import { ItemRequest } from 'types/rest';
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
      <Box sx={{ width: '70%' }}>
        <Stack spacing={2}>
          {itemRequests.map((data: ItemRequest) => {
            return (
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
                    {data.title}
                  </Typography>
                  <Typography variant="body2">{data.status}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </div>
  );
};
