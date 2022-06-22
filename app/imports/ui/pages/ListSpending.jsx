import React from 'react';
import { Container, Card, Header, Loader, Statistic } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Spending } from '../../api/stuff/SpendingCollection';
import SpendingItem from '../components/SpendingItem';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

/** Renders all of the Spending documents. Use <SpendingItem> to render each row. */
const ListSpending = ({ ready, spending }) => {

  const total = spending.map((spendings) => {
    if (spendings.category !== 'income') {
      return spendings.amount;
    }
    return 0;
  });

  const totalRed = total.reduce((previousVal, currentVal) => previousVal + currentVal, 0);

  const totalIncome = spending.map((spendings) => {
    if (spendings.category === 'income') {
      return spendings.amount;
    }
    return 0;
  });

  const totalIncomeRed = totalIncome.reduce((previousVal, currentVal) => previousVal + currentVal, 0);

  const totalHome = spending.map((spendings) => {
    if (spendings.category === 'home') {
      return spendings.amount;
    }
    return 0;
  });

  const totalHomeRed = totalHome.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const totalFood = spending.map((spendings) => {
    if (spendings.category === 'food') {
      return spendings.amount;
    }
    return 0;
  });

  const totalFoodRed = totalFood.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const totalTransportation = spending.map((spendings) => {
    if (spendings.category === 'transportation') {
      return spendings.amount;
    }
    return 0;
  });

  const totalTransRed = totalTransportation.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const totalEntertainment = spending.map((spendings) => {
    if (spendings.category === 'entertainment') {
      return spendings.amount;
    }
    return 0;
  });

  const totalEnterRed = totalEntertainment.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const totalMiscellaneous = spending.map((spendings) => {
    if (spendings.category === 'miscellaneous') {
      return spendings.amount;
    }
    return 0;
  });

  const totalMiscRed = totalMiscellaneous.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const data = {
    labels: ['Income', 'Home', 'Food', 'Transportation', 'Entertainment', 'Miscellaneous'],
    datasets: [
      {
        label: 'Money',
        backgroundColor: [
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4',
          '#f5b942',
          '#B21F00',
        ],
        hoverBackgroundColor: [
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
          '#966606',
          '#501800',
        ],
        data: [
          totalIncomeRed,
          totalHomeRed,
          totalFoodRed,
          totalTransRed,
          totalEnterRed,
          totalMiscRed,
        ],
      },
    ],
  };

  let delayed;

  return (ready) ? (
    <Container id={PAGE_IDS.LIST_SPENDING}>
      <Header as="h2" textAlign="center">List Spending</Header>
      <Card.Group>
        {spending.map((spendings) => <SpendingItem key={spendings._id} spending={spendings} />)}
      </Card.Group>
      <Statistic.Group size='tiny'>
        <Statistic>
          <Statistic.Value>${totalRed}</Statistic.Value>
          <Statistic.Label>Total Expenditures</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${totalIncomeRed}</Statistic.Value>
          <Statistic.Label>Total Income</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${totalHomeRed}</Statistic.Value>
          <Statistic.Label>Home Expenditures</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${totalFoodRed}</Statistic.Value>
          <Statistic.Label>Food Expenditures</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${totalTransRed}</Statistic.Value>
          <Statistic.Label>Transportation Expenditures</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${totalEnterRed}</Statistic.Value>
          <Statistic.Label>Entertainment Expenditures</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${totalMiscRed}</Statistic.Value>
          <Statistic.Label>Miscellaneous Expenditures</Statistic.Label>
        </Statistic>
        <Doughnut
          data={data}
          type='doughnut'
          plugins={[ChartDataLabels]}
          options={{
            plugins: {
              datalabels: {
                labels: {
                  name: {
                    formatter: function (value, context) {
                      return context.chart.data.labels[context.dataIndex];
                    },
                    align: 'top',
                    font: {
                      weight: 'bolder',
                      size: '16',
                    },
                    color: 'black',
                  },
                  value: {
                    formatter: function (value, context) {
                      return '$' + context.dataset.data[context.dataIndex] + '\n' + ((context.dataset.data[context.dataIndex] / totalRed) * 100).toFixed(2) + '%';
                    },
                    align: 'bottom',
                    color: 'black',
                    font: {
                      weight: 'bolder',
                      size: '14',
                    },
                  },
                },
                display: function (context) {
                  const index = context.dataIndex;
                  const value = context.dataset.data[index];
                  return value > 0 && ((context.dataset.data[context.dataIndex] / totalRed) * 100).toFixed(2) > 3;
                },
              },
            },
            animation: {
              onComplete: () => {
                delayed = true;
              },
              delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                  delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
              },
            },
          }}
        />
      </Statistic.Group>

    </Container>
  ) : <Loader active>Getting data</Loader>;
};

// Require an array of Spending documents in the props.
ListSpending.propTypes = {
  spending: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Spending documents.
  const subscription = Spending.subscribeSpending();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Spending documents and sort them by name.
  const spending = Spending.find({}, { sort: { title: 1 } }).fetch();
  return {
    spending,
    ready,
  };
})(ListSpending);
