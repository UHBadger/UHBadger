import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { Spending } from '../../api/stuff/SpendingCollection';

/** Renders a single row in the List planning card * */
const SpendingItem = ({ spending }) => (
  <Card color='teal'>
    <Card.Content>
      <Card.Header>{spending.title}</Card.Header>
      <Card.Meta>{spending.date.toLocaleDateString('en-US')}</Card.Meta>
      <Card.Meta>Category: {spending.category}</Card.Meta>
      <Card.Meta>Money Spent: <strong>${spending.amount}</strong></Card.Meta>
      <Card.Description>
        {spending.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div>
        <Link to={`/spending-item/${spending._id}`}>
          <Button basic color='green'>
            Edit
          </Button>
        </Link>
        <Button basic color='red' onClick={() => {
          swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this Spending',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                const collectionName = Spending.getCollectionName();
                const instance = spending._id;
                removeItMethod.callPromise({ collectionName, instance })
                  .catch(error => swal('Error', error.message, 'error'))
                  .then(() => {
                    swal('Success', 'Spending has been deleted!', 'success');
                  });
              } else {
                swal("Don't Worry", 'Your spending data is safe!', 'info');
              }
            });
        }}>
          Delete
        </Button>
      </div>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
SpendingItem.propTypes = {
  spending: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.number,
    category: PropTypes.string,
    date: PropTypes.shape({
      Number: PropTypes.number,
      toLocaleDateString: PropTypes.func,
    }),
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SpendingItem);
