/**
 * @file Shared UI for a match between supplier and buyer
 * @author Kevin Xu
 */
import { Alert, Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState, ComponentType, memo } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { maps_api_key } from 'utils/config';
import { ItemMatchRequest, RequestStatus } from 'types/rest';
import { fetchLocationDescription } from 'utils/logic';
import Api from 'utils/api';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { parseAxiosSuccessResponse } from 'utils/request';
import { useParams } from 'react-router';
import { makeSelectUsername } from 'store/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { Constants } from 'utils/constants';
import PropTypes from 'prop-types';

// TO DO - dynamic layout
const containerStyle = {
  width: '400px',
  height: '400px',
};

// TO DO - change this to whatever is in the profile
const center = {
  lat: Number.parseFloat(Constants.DEFAULT_LAT),
  lng: Number.parseFloat(Constants.DEFAULT_LONG),
};

interface MatchParams {
  id?: string;
}

/**
 * @param {Object} root0 general props
 * @param {string} root0.username the username of session user
 * @returns {React.ReactElement} the match page
 */
const Match = ({ username }): React.ReactElement => {
  const id = useParams<MatchParams>();
  const [match, setMatch] = useState<ItemMatchRequest | null>(null);
  useEffect(() => {
    /**
     *
     * @param {MatchParams} id the id object to fetch item request for
     */
    const fetchMatchById = async (id: MatchParams): Promise<void> => {
      console.log(id);
      if (Object.keys(id).length === 0) {
        console.log(`No Params found for Item Request ${id}`);
        return;
      }
      const response = await Api.get('/match', id);
      const match = parseAxiosSuccessResponse<ItemMatchRequest>(response);
      if (match) {
        // we should check if the match is actually valid
        if (match.status !== RequestStatus.ACCEPTED) {
          setMatch(null);
          return;
        }
        setMatch(match);
      }
    };
    fetchMatchById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!match) {
    return <div> No Match is associated with this _id </div>;
  }
  // check permissions. Only a supplier and requester can see a match
  if (![match.requesterEmail, match.supplierEmail].includes(username)) {
    return <div> You aren't allowed access to this page</div>;
  }
  return (
    <div>
      <Box sx={{ width: '80%' }}>
        <Stack spacing={2}>
          <Typography> Match </Typography>
          <Typography variant="body2">
            Meet at {fetchLocationDescription(match.item)}
          </Typography>
          <Box sx={{ width: '50%' }}>
            <Alert>
              {' '}
              For now, this is just a placeholder. We're working on updating the
              map to reflect the place{' '}
            </Alert>
            {/* Get rid of the alert later */}
            <LoadScript googleMapsApiKey={maps_api_key}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            </LoadScript>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

/**
 * TO DO - migrate all this stuff to an auth context..
 */
const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
});

const withConnect = connect(mapStateToProps, null);

export default compose<ComponentType>(withConnect, memo)(Match);

Match.propTypes = {
  username: PropTypes.string,
};
