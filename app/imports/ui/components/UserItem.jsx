import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { removeItMethod } from '../../api/base/BaseCollection.methods';

/** Renders a single row  for each user */
const UserItem = ({ user }) => {
  const deleteUser = () => {
    swal({
      title: 'Delete',
      text: 'The user wants to delete the account, please approve the user\'s deletion request as soon as possible!!!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const collectionName = UserProfiles.getCollectionName();
          const instance = user._id;
          removeItMethod.callPromise({ collectionName, instance }).catch(error => swal('Error', error.message, 'error'))
            .then(() => {
              swal('Success', 'The account has been deleted', 'success');
            });
        }
      });

  };
  return (
    <Table.Row>
      <Table.Cell>{user.firstName}</Table.Cell>
      <Table.Cell>{user.lastName}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>
        <Button color="blue" onClick={() => deleteUser(user)}>
        Approved
        </Button>
      </Table.Cell>
    </Table.Row>);

};
// Require a document to be passed to this component.
UserItem.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    verification: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserItem);
