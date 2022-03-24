/**
 * @file A Home page for logged-in users, both consumers and suppliers
 * Dashboard is not a private route, because dashboard will refresh periodically to check if the user is still logged in or not.
 * @author Kevin Xu
 */
import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { ItemRequest } from 'types/rest';
import Api from 'utils/api';
import { parseAxiosSuccessResponse } from 'utils/request';
import { MemoizedProductCard as ProductCard } from './ProductCard';
import { Search } from './search';

/**
 *
 * @returns {React.ReactElement} a Consumer landing page wrapper
 */
const Consumer = (): React.ReactElement => {
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
    if (data) {
      setSearchResults(data);
    }
  };
  console.log(searchResults);
  /**
   * Abstract out search to a separate searchbar in the future
   */
  return (
    <div>
      <Search handleSearch={handleSearch} />
      <Stack spacing={2} sx={{ mt: 5 }}>
        {searchResults.map((data: ItemRequest) => {
          return <ProductCard data={data} key={data._id} />;
        })}
      </Stack>
    </div>
  );
};

export default Consumer;
