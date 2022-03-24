/**
 * @file Search bar for consumers
 * TO DO - in the future this should handle pagination state logic
 * @author Kevin Xu
 */

import React, { useRef } from 'react';
import { IconButton, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
/**
 * An Item Search Component.
 * TO DO - maybe this can be generalized
 *
 * @param {Object} root0 props for the function
 * @param {Function} root0.handleSearch function triggered when user hits "enter" in the search bar
 * @returns {React.ReactElement} Search Component
 */
export const Search = ({ handleSearch }): React.ReactElement => {
  const searchRef = useRef<String>('');
  return (
    <div>
      <Paper
        component="div"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          inputRef={input => {
            if (input) {
              searchRef.current = input.value;
            }
          }}
          placeholder="Search For Products"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(searchRef.current);
            }
          }}
          inputProps={{ 'aria-label': 'search products' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};
