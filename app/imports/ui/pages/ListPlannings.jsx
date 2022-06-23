import React from 'react';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Plannings } from '../../api/planning/PlanningCollection';
import PlanningItem from '../components/PlannningItem';

/** Renders all plannings documents. Use <PlanningItem> to render each row. */
const ListPlannings = ({ ready, plannings }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_PLANNINGS}>
    <Header as="h2" textAlign="center">List Plannings</Header>
    <Card.Group>
      {plannings.map((planning) => <PlanningItem key={planning._id} planning={planning} />)}
    </Card.Group>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of plannings documents in the props.
ListPlannings.propTypes = {
  plannings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Plannings documents.
  const subscription = Plannings.subscribePlanning();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Plannings documents and sort them by name.
  const plannings = Plannings.find({}, { sort: { title: 1 } }).fetch();
  return {
    plannings,
    ready,
  };
})(ListPlannings);
