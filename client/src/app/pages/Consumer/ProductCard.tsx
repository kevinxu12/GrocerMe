/**
 * @file A Product Card for Search results
 * This will probably be individualized, but should eventually be abstracted to a general component
 * @author Kevin Xu
 */

import React from 'react';
import {
  Typography,
  Card,
  Box,
  CardContent,
  CardMedia,
  Chip,
  CardActions,
  Link,
} from '@mui/material';
import { ItemRequest, ItemRequestStatus } from 'types/rest';
import { Constants } from 'utils/constants';
import { calculateAmountRemaining } from 'utils/logic';
export interface ProductCardPropTypes {
  data: ItemRequest;
}
/**
 * The product card for search results
 *
 * @param {Object} root0 Props
 * @param {ItemRequest} root0.data the data for the product card
 * @returns {React.ReactElement} the component
 */
export const ProductCard = ({
  data,
}: ProductCardPropTypes): React.ReactElement => {
  const customMatchLink: string = Constants.ITEM_PURCHASE + '/' + data._id;
  const amountLeft = calculateAmountRemaining(data);
  return (
    <Card sx={{ display: 'flex', width: '50%' }}>
      {data.imageUrl && (
        <CardMedia
          component="img"
          sx={{
            resizeMode: 'contain',
            height: '80%',
            width: '100px',
            m: 2,
          }}
          image={data.imageUrl}
          alt={data.title}
          loading="lazy"
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
            {data.title}
          </Typography>
          <Typography variant="body2">Sold by {data.requester.name}</Typography>
          <Typography variant="body2">Buy up to {amountLeft} units</Typography>
          {data.status === ItemRequestStatus.SOLD && (
            <Chip label="Sold Out" variant="outlined" />
          )}
        </CardContent>
        <CardActions>
          <Link href={customMatchLink}>Match</Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export const MemoizedProductCard = React.memo(ProductCard);
