import React from 'react';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Spending } from '../../api/stuff/SpendingCollection';
import SpendingItem from '../components/SpendingItem';

/** Renders all of the plannings documents. Use <PlanningItem> to render each row. */
const ListSpending = ({ ready, spending }) => ((ready) ? (
  <Container id={PAGE_IDS.LIST_SPENDING}>
    <Header as="h2" textAlign="center">List Spending</Header>
    <Card.Group>
      {spending.map((spendings) => <SpendingItem key={spendings._id} spending={spendings} />)}
    </Card.Group>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of plannings documents in the props.
ListSpending.propTypes = {
  spending: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Plannings documents.
  const subscription = Spending.subscribeSpending();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Plannings documents and sort them by name.
  const spending = Spending.find({}, { sort: { title: 1 } }).fetch();
  return {
    spending,
    ready,
  };
})(ListSpending);
