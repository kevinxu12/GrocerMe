/**
 * @file A Home page for logged-in users, both consumers and suppliers
 * Dashboard is not a private route, because dashboard will refresh periodically to check if the user is still logged in or not.
 * @author Kevin Xu
 */
import { Stack } from '@mui/material';
import SnackbarComponent from 'app/components/SnackbarComponent';
import React, { useState } from 'react';
import { setMessageSnackbarType } from 'types';
import { ItemRequest } from 'types/rest';
import Api from 'utils/api';
import { parseAxiosSuccessResponse } from 'utils/request';
import { MemoizedProductCard as ProductCard } from './ProductCard';
import { Search } from './search';

interface ConsumerPropTypes {
  setMessage: setMessageSnackbarType;
}
/**
 *
 * @param {Object} root0 props
 * @param {setMessageSnackbarType} root0.setMessage set the message to be displayed in the snackbar
 * @returns {React.ReactElement} a Consumer landing page wrapper
 */
const Consumer = ({ setMessage }: ConsumerPropTypes): React.ReactElement => {
  const [searchResults, setSearchResults] = useState<ItemRequest[]>([]);
  /**
   * Handling when a user "searches"
   * TO DO - in the future, we won't just pipe the query in but pagination
   *
   * @param {string} query the search query sent by the user
   */
  const handleSearch = async (query: string) => {
    // right now no page number implementation
    console.log(query);
    const response = await Api.get('/search', { query });
    const data = await parseAxiosSuccessResponse<ItemRequest[]>(response);
    console.log(data);
    if (data) {
      setSearchResults(data);
      if (data.length === 0) {
        setMessage('No data unfortunately');
      }
    }
  };
  // const searchResults = [
  //   {
  //     active: true,
  //     amount: 5,
  //     createdAt: new Date('2022-03-21T18:25:36.572Z'),
  //     description: 'Test description',
  //     email: 'xukevinwork@gmail.com',
  //     imageUrl: 'https://grocermeimages.s3.amazonaws.com/banana.png',
  //     location: '3400 Spruce Street, Philadelphia, PA, USA',
  //     requester: {
  //       _id: '620462ed85b432d10895b728',
  //       firstTime: true,
  //       roles: Array(3),
  //       createdAt: '2022-02-10T00:57:17.523Z',
  //       updatedAt: '2022-02-10T00:57:17.523Z',
  //       name: 'Kevin Xu',
  //       email: 'xukevinwork@gmail.com',
  //     },
  //     status: ItemRequestStatus.ACCEPTED,
  //     title: 'Test Product 1',
  //     updatedAt: new Date('2022-03-21T18:25:36.572Z'),
  //     __v: 0,
  //     _id: '6238c359139f656f862b8372',
  //   },
  // ];
  /**
   * Abstract out search to a separate searchbar in the future
   */
  return (
    <div>
      <Stack spacing={2}>
        <Search handleSearch={handleSearch} />
        <Stack spacing={2} sx={{ mt: 5 }}>
          {searchResults &&
            searchResults.map((data: ItemRequest) => {
              return <ProductCard data={data} key={data._id} />;
            })}
        </Stack>
      </Stack>
    </div>
  );
};

/**
 *
 * @returns {React.ReactElement} a Consumer landing page wrapper with Snackbar Component
 */
const home = (): React.ReactElement => {
  return <SnackbarComponent component={Consumer} />;
};

export default home;
