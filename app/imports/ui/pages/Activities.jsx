import React from 'react';
import { Container, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Plannings } from '../../api/planning/PlanningCollection';
import ActivityItem from '../components/ActivityItem';

const Activities = ({ ready, Planning }) => ((ready) ? (
  <Container fluid>
    <Grid columns='equal'>
      <Grid.Column>
        <ActivityItem planning={Planning}/>
      </Grid.Column>
    </Grid>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Organization documents in the props.
Activities.propTypes = {
  ready: PropTypes.bool.isRequired,
  Planning: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const planningId = _id;
  // Get access to plannings.
  const subscription = Plannings.subscribePlanning();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const plannings = Plannings.find({}, { sort: { title: 1 } }).fetch();
  console.log(plannings);
  // Get the document
  const Planning = plannings.find((planning) => planning._id === planningId);
  return {
    ready,
    Planning,
  };
})(Activities);
