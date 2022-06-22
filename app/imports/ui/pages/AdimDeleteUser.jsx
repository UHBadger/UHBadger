import React from 'react';
import { Container, Header, Loader, Message, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import UserItem from '../components/UserItem';

/** Renders user documents */
const AdminDeleteUser = ({ ready, users, Number }) => ((ready) ? (
  <Container id={PAGE_IDS.DELETE_USER}>
    <Header as="h2" textAlign="center" color="red" style={{ paddingTop: '20px', paddingBottom: '10px' }} >Delete Users</Header>
    { Number !== 0 ?
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>FirstName</Table.HeaderCell>
            <Table.HeaderCell>LastName</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Deletion Request</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => <UserItem key={user._id} user={user}/>)}
        </Table.Body>
      </Table> :
      <Message positive>
        <Message.Header>No user want to delete account</Message.Header>
        <p>Good job!!!</p>
      </Message>
    }
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of plannings documents in the props.
AdminDeleteUser.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  Number: PropTypes.number.isRequired,
};
// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = UserProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Plannings documents and sort them by name.
  const users = UserProfiles.find({ verification: true }, { sort: { firstName: 1 } }).fetch();
  const Number = users.length;
  return {
    users,
    ready,
    Number,
  };
})(AdminDeleteUser);
