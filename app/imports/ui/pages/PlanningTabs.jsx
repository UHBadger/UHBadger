import React from 'react';
import { Container, Loader,Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Plannings } from '../../api/planning/PlanningCollection';
import AddPlanning from './AddPlanning';
import ListPlannings from './ListPlannings';

const panes = [
  // eslint-disable-next-line react/display-name
  { menuItem: 'List Plannings', render: () => <Tab.Pane><ListPlannings/></Tab.Pane> },
  // eslint-disable-next-line react/display-name
  { menuItem: 'Add Planning', render: () => <Tab.Pane><AddPlanning/></Tab.Pane> },
];

const PlanningPage = ({ ready }) => ((ready) ? (
  <Container>
    <div>
      <h1 className="ui center aligned header">
       Planning Page
      </h1>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
    </div>
  </Container>
) : <Loader active>Getting data</Loader>);

PlanningPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Plannings documents.
  const subscription = Plannings.subscribePlanning();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Planning documents and sort them by name.
  return {
    ready,
  };
})(PlanningPage);
