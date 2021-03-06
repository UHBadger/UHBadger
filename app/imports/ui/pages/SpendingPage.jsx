import React from 'react';
import { Container, Loader, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Spending } from '../../api/stuff/SpendingCollection';
import AddSpending from './AddSpending';
import ListSpending from './ListSpending';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const panes = [
  // eslint-disable-next-line react/display-name
  { menuItem: 'List Spending', render: () => <Tab.Pane id={COMPONENT_IDS.SPENDING_LIST}><ListSpending /></Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Add Spending', render: () => <Tab.Pane id={COMPONENT_IDS.SPENDING_ADD}><AddSpending /></Tab.Pane> },
];

const SpendingPage = ({ ready }) => ((ready) ? (
  <Container id={PAGE_IDS.SPENDING} className="spending">
    <div>
      <h1 className="ui center aligned header">
          Spending Page
      </h1>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
    </div>
  </Container>
) : <Loader active>Getting data</Loader>);

SpendingPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Plannings documents.
  const subscription = Spending.subscribeSpending();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Planning documents and sort them by name.
  return {
    ready,
  };
})(SpendingPage);
