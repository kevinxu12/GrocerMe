/**
 * @file Frontend for Matches
 * @author Kevin Xu
 */

import {
  Card,
  CardActions,
  CardContent,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ItemMatchRequest, RequestStatus } from 'types/rest';
import Api from 'utils/api';
import { Constants } from 'utils/constants';
import { parseAxiosSuccessResponse } from 'utils/request';
/**
 *
 */
export const Home = (): React.ReactElement => {
  const [matches, setMatches] = useState<ItemMatchRequest[]>([]);
  useEffect(() => {
    /**
     *
     */
    const fetchMatchesAsSupplier = async () => {
      const response = await Api.get('/itemMatchRequestsForUser', {
        status: RequestStatus.ACCEPTED,
      });
      const itemMatchRequests =
        parseAxiosSuccessResponse<ItemMatchRequest[]>(response);
      if (itemMatchRequests) {
        setMatches(itemMatchRequests);
      }
    };
    fetchMatchesAsSupplier();
  }, []);
  if (matches.length === 0) {
    return <div>No Matches for Now: Stay put</div>;
  }
  return (
    <div>
      <Stack spacing={2}>
        <Typography> All Matches as a Supplier </Typography>
        {matches.map((match: ItemMatchRequest, index: number) => (
          <Card key={index} sx={{ display: 'flex', width: '50%' }}>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1.5 }} component="div">
                Match between {match.requesterEmail} and {match.supplierEmail}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={Constants.MATCH + '/' + match._id}>View Match</Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </div>
  );
};
