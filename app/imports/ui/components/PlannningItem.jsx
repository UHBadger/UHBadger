import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List planning card * */
const PlanningItem = ({ planning }) => (
  <Card color='teal'>
    <Card.Content>
      <Card.Header>{planning.title}</Card.Header>
      <Card.Meta>{planning.startTime} to {planning.endTime}</Card.Meta>
      <Card.Meta>Total Money Out: <strong>${planning.budget}</strong></Card.Meta>
      <Card.Description>
        {planning.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className='ui two buttons'>
        <Button basic color='green'>
          <Link to={`/planning-item/${planning._id}`}>Edit</Link>
        </Button>
        <Button basic color='red'>
        Delete
        </Button>
      </div>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
PlanningItem.propTypes = {
  planning: PropTypes.shape({
    title: PropTypes.string,
    budget: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PlanningItem);
