import React, { useState } from 'react';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Card, Container, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, NumField, RadioField, SubmitField, TextField } from 'uniforms-semantic';
import { Spending } from '../../api/stuff/SpendingCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(Spending._schema);

const EditSpending = ({ doc, ready, location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  const submit = (data) => {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    const validDate = (date) => pattern.test(date);
    if (validDate(data.date)) {
      const { title, description, amount, category, date, _id } = data;
      const collectionName = Spending.getCollectionName();
      const updateData = { id: _id, title, description, amount, category, date };
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => swal('Success', 'Spending updated successfully', 'success'));
      setRedirectToReferer(true);
    } else {
      swal('Error', 'please enter a correct format for date such as 02/20/2022!', 'error');
    }
  };

  const { from } = location.state || { from: { pathname: '/spending' } };

  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  return (ready) ? (
    <Container id={PAGE_IDS.EDIT_SPENDING}>
      <br/>
      <div>
        <Header as="h2" textAlign="center">
          Edit My Spending
        </Header>
      </div>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
              <Segment stacked basic>
                <Card fluid>
                  <Card.Content>
                    <TextField label='Title' name='title' id='edit-spending-title' />
                  </Card.Content>
                  <Card.Content>
                    <LongTextField label='Description' name='description' id='edit-spending-description' />
                  </Card.Content>
                  <Card.Content>
                    <NumField label='Amount' name='amount' id='edit-spending-amount' />
                  </Card.Content>
                  <Card.Content>
                    <TextField label='Date' name='date' placeholder='mm/dd/yyyy' id='edit-spending-date' />
                  </Card.Content>
                  <Card.Content>
                    <RadioField label='Category' name='category' id='edit-spending-category' />
                  </Card.Content>
                </Card>
                <SubmitField value='Submit' id='edit-spending-submit' />
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

EditSpending.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

export default withTracker(({ match }) => {
  const docId = match.params._id;
  const subscription = Spending.subscribeSpending();
  const ready = subscription.ready();
  const doc = Spending.findDoc(docId);
  return {
    doc,
    ready,
  };
})(EditSpending);
