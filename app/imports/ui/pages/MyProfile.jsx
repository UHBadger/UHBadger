import React from 'react';
import { Container, Card, Header, Loader, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';

/** Renders all of the plannings documents. Use <PlanningItem> to render each row. */
const MyProfile = ({ ready, userProfile }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_PLANNINGS}>
    <Header as="h2" textAlign="center">Manage My Account</Header>
    <Card>
      <Card.Content>
        <Card.Header>
          {userProfile.firstName} {userProfile.lastName}
        </Card.Header>
        <Card.Meta>{userProfile.email}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            <Link to = "/Edit-My-Profile">Edit</Link>
          </Button>
          <Button basic color= 'red'>
             Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of plannings documents in the props.
MyProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to document.
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  const subscription = UserProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Plannings documents and sort them by name.
  const userProfile = ready ? UserProfiles.findDoc({ email: currentUser }) : undefined;
  return {
    userProfile,
    ready,
  };
})(MyProfile);
