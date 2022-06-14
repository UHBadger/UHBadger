import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

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
      <div className='ui two buttons'>
        <Link to={`/spending-item/${spending._id}`}>
          <Button basic color='green'>
            Edit
          </Button>
        </Link>
        <Button basic color='red'>
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
