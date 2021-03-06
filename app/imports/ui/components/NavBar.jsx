import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = ({ currentUser }) => {
  const menuStyle = { marginBottom: '10px', backgroundColor: '#6088A9' };
  return (
    <Menu style={menuStyle} attached="top" borderless inverted>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <Header inverted as='h1'>UHBadger</Header>
      </Menu.Item>
      {Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ? (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_SPENDING_PAGE} as={NavLink} activeClassName="active" exact to="/spending" key='spending'>Spending</Menu.Item>,
          <Menu.Item id={COMPONENT_IDS.NAVBAR_PLANNING_PAGE} as={NavLink} activeClassName="active" exact to="/planning-tabs" key='planning'>Planning</Menu.Item>,
          <Menu.Item id={COMPONENT_IDS.NAVBAR_POLICY} as={NavLink} activeClassName="active" exact to="/policy" key='policy '>Policy</Menu.Item>]
      // <Menu.Item id={COMPONENT_IDS.NAVBAR_MANAGE_MY_ACCOUNT} as={NavLink} activeClassName="active" exact to="/My-Profile" key='account'>Manage My Account</Menu.Item>]
      ) : ''}
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_DELETE_USER} as={NavLink} activeClassName="active" exact to="/admin-delete-user" key='delete'>Delete User</Menu.Item>,
          <Menu.Item id={COMPONENT_IDS.NAVBAR_POLICY} as={NavLink} activeClassName="active" exact to="/policy" key='policy '>Policy</Menu.Item>]
      // <Menu.Item id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>]
      ) : ''}
      <Menu.Item position="right">
        {currentUser === '' ? (
          <Dropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} text="Login" pointing="top right" icon={'user'}>
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} icon="user" text="Sign In" as={NavLink} exact to="/signin" />
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} icon="add user" text="Sign Up" as={NavLink} exact to="/signup" />
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right" icon={'user'}>
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Sign Out" as={NavLink} exact to="/signout" />
              <div className="divider"></div>
              {Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ?
                <Dropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_MY_ACCOUNT} icon="edit" text="Manage My Account" as={NavLink} activeClassName="active" exact to="/My-Profile" key='account' /> : ''}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Item>
    </Menu>
  );
};

// Declare the types of all properties.
NavBar.propTypes =
{
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    currentUser,
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
