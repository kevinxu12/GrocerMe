/**
 * @file Component for Navbar shown for logged-in users
 * @author Kevin Xu
 */
import React, { ComponentType, memo } from 'react';
import * as AiIcons from 'react-icons/ai';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { logoutWithThunk } from 'store/auth/thunk';
import { GenericThunkDispatch } from 'types/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectRoles } from 'store/auth/selectors';
import { Role, RoleCode } from 'types/rest';
import { isRoleCodeIncluded } from 'utils/auth';
import { StyledConstants } from 'styles/StyleConstants';
import { Link } from 'react-router-dom';
import { Constants } from 'utils/constants';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface PrivateNavDispatchType {
  onLogout: () => void;
}
interface PrivateNavPropsType extends PrivateNavDispatchType {
  roles: Role[];
}

/**
 * @param {object} props props passed
 * @param {Function} props.onLogout logout function
 * @param {Role[]} props.roles the roles of the currently logged in user
 * @returns {React.ElementType} Private Navbar Component
 */
const PrivateNav = ({
  roles,
  onLogout,
}: PrivateNavPropsType): React.ReactElement => {
  const isAdmin = isRoleCodeIncluded(RoleCode.ADMIN, roles);
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      sx={{
        width: StyledConstants.SIDE_BAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: StyledConstants.SIDE_BAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      open={true}
    >
      <List sx={{ mt: 3, height: '100%' }}>
        <ListItem button component={Link} to={Constants.USER_HOME}>
          <ListItemIcon>
            <AiIcons.AiFillHome />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        {isAdmin ? (
          <ListItem button component={Link} to={Constants.ADMIN_HOME}>
            <ListItemIcon>
              <AiIcons.AiFillCrown />
            </ListItemIcon>
            <ListItemText primary={'Admin'} />
          </ListItem>
        ) : (
          <div />
        )}
        <ListItem button component={Link} to={Constants.SUPPLIER_HOME}>
          <ListItemIcon>
            <AiIcons.AiFillDashboard />
          </ListItemIcon>
          <ListItemText primary={'Supplier'} />
        </ListItem>
        <ListItem
          button
          onClick={async () => {
            await onLogout();
          }}
        >
          <ListItemIcon>
            <AiIcons.AiOutlineLogout />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </Drawer>
  );
};

const mapStateToProps = createStructuredSelector({
  roles: makeSelectRoles(),
});

/**
 * Maps dispatch functions to component props
 *
 * @param {GenericThunkDispatch} dispatch the dispatch object from redux
 * @returns {PrivateNavDispatchType} Object passed to props containing redux dispatch functions
 */
function mapDispatchToProps(
  dispatch: GenericThunkDispatch,
): PrivateNavDispatchType {
  return {
    /**
     * Dispatches a logout action
     */
    onLogout: () => {
      dispatch(logoutWithThunk());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose<ComponentType>(withConnect, memo)(PrivateNav);
