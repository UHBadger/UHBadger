import React from 'react';
import { Card, Container, Header, Loader, Message, Segment, Statistic } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Spending } from '../../api/stuff/SpendingCollection';
import SpendingItem from './SpendingItem';

/** Renders all plannings documents. Use <PlanningItem> to render each row. */
const ActivityItem = ({ ready, planning, spending }) => {

  const activities = spending.filter(spending_Item => (new Date(spending_Item.date) >= new Date(planning.startTime))
    && (new Date(spending_Item.date) <= new Date(planning.endTime)
    ));
  const length = activities.length;
  const totalSpending = activities.map((activity) => {
    if (activity.category !== 'income') {
      return activity.amount;
    }
    return 0;
  });

  const total = totalSpending.reduce((previousVal, currentVal) => previousVal + currentVal, 0);

  const income = activities.map((activity) => {
    if (activity.category === 'income') {
      return activity.amount;
    }
    return 0;
  });

  const totalIncome = income.reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0,
  );
  const home = activities.map((activity) => {
    if (activity.category === 'home') {
      return activity.amount;
    }
    return 0;
  });
  const totalHome = home.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const food = activities.map((activity) => {
    if (activity.category === 'food') {
      return activity.amount;
    }
    return 0;
  });
  const totalFood = food.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const transportation = activities.map((activity) => {
    if (activity.category === 'transportation') {
      return activity.amount;
    }
    return 0;
  });
  const totalTrans = transportation.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const entertainment = activities.map((activity) => {
    if (activity.category === 'entertainment') {
      return activity.amount;
    }
    return 0;
  });

  const totalEnter = entertainment.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const miscellaneous = activities.map((activity) => {
    if (activity.category === 'miscellaneous') {
      return activity.amount;
    }
    return 0;
  });

  const totalMisc = miscellaneous.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const data = {
    labels: ['Home', 'Food', 'Transportation', 'Entertainment', 'Miscellaneous'],
    datasets: [
      {
        label: 'Money',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        data: [
          // eslint-disable-next-line no-mixed-operators
          (totalHome / total * 100).toFixed(2),
          // eslint-disable-next-line no-mixed-operators
          (totalFood / total * 100).toFixed(2),
          // eslint-disable-next-line no-mixed-operators
          (totalTrans / total * 100).toFixed(2),
          // eslint-disable-next-line no-mixed-operators
          (totalEnter / total * 100).toFixed(2),
          // eslint-disable-next-line no-mixed-operators
          (totalMisc / total * 100).toFixed(2),
        ],
      },
    ],
  };
  const relation = () => {
    if (planning.budget > total) {
      return '>';
    }
    if (planning.budget === total) {
      return '=';
    }
    return '<';

  };
  return ((ready) ? (
    <Container>
      <Header as="h1" textAlign="center" style={ { paddingTop: '20px', paddingBottom: '30px' }}> Activities </Header>
      { length !== 0 ?
        <Segment>
          <Statistic.Group size='tiny'>
            <Statistic color='red'>
              <Statistic.Value>${planning.budget}</Statistic.Value>
              <Statistic.Label>Planning Budget</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{relation()}</Statistic.Value>
              <Statistic.Label>Relation</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>${total}</Statistic.Value>
              <Statistic.Label>TOTAL EXPENDITURES</Statistic.Label>
            </Statistic>
            <Statistic color='orange'>
              <Statistic.Value>${totalIncome}</Statistic.Value>
              <Statistic.Label>Total Income</Statistic.Label>
            </Statistic>
            <Statistic color='yellow'>
              <Statistic.Value>${totalHome}</Statistic.Value>
              <Statistic.Label>Home Expenditures</Statistic.Label>
            </Statistic>
            <Statistic color='purple'>
              <Statistic.Value>${totalFood}</Statistic.Value>
              <Statistic.Label>Food Expenditures</Statistic.Label>
            </Statistic>
            <Statistic color='olive'>
              <Statistic.Value>${totalTrans}</Statistic.Value>
              <Statistic.Label>TRANSPORTATION EXPENDITURES</Statistic.Label>
            </Statistic>
            <Statistic color='green'>
              <Statistic.Value>${totalEnter}</Statistic.Value>
              <Statistic.Label>Entertainment Expenditures</Statistic.Label>
            </Statistic>
            <Statistic color='teal'>
              <Statistic.Value>${totalMisc}</Statistic.Value>
              <Statistic.Label>Miscellaneous Expenditures</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <br/>
          <Pie data={data}/>
          <br/>
          <Header as="h1" textAlign="center" color = 'yellow' style={ { paddingTop: '20px', paddingBottom: '30px' }}> Activities Detail</Header>
          <Card.Group>
            {activities.map((activity) => <SpendingItem key={activity._id} spending={activity} />)}
          </Card.Group>
        </Segment> :
        <Message positive>
          <Message.Header>You do not  have any activity for now </Message.Header>
          <p>Good job!!!</p>
        </Message>
      }
    </Container>
  ) : <Loader active>Getting data</Loader>);
};

// Require an array of plannings documents in the props.
ActivityItem.propTypes = {
  planning: PropTypes.shape({
    title: PropTypes.string,
    budget: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  spending: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker((planning) => {
  // Get access to spending documents.
  const subscription = Spending.subscribeSpending();
  console.log(planning.planning.startTime);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const spending = Spending.find({}, { sort: { title: 1 } }).fetch();
  return {
    spending,
    ready,
  };
})(ActivityItem);
