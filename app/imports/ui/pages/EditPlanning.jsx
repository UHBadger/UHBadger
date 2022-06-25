import React, { useState } from 'react';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Card, Container, Grid, Header, Loader, Icon, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Plannings } from '../../api/planning/PlanningCollection';

const bridge = new SimpleSchema2Bridge(Plannings._schema);

const EditPlanning = ({ doc, ready, location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  const submit = (data) => {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    const validDate = (date) => pattern.test(date);
    if (validDate(data.startTime) && validDate(data.startTime)) {
      const { title, budget, startTime, endTime, description, _id } = data;
      const collectionName = Plannings.getCollectionName();
      const updateData = { id: _id, title, budget, startTime, endTime, description };
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => swal('Success', 'Planning updated successfully', 'success'));
      setRedirectToReferer(true);
    } else {
      swal('Error', 'please enter a correct format for date such as 02/20/2022!', 'error');
    }
  };

  const { from } = location.state || { from: { pathname: '/planning-tabs' } };

  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  return (ready) ? (
    <Container id={PAGE_IDS.EDIT_PLANNING}>
      <br/>
      <div>
        <Header as="h2" textAlign="center">
          Edit Planning
        </Header>
      </div>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
              <Segment stacked basic>
                <Card fluid color='yellow'>
                  <Card.Content>
                    <Card.Header>
                      <Icon name='pencil alternate'/>
                      General
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <TextField id='edit-planning-title' name='title' />
                    <NumField id='edit-planning-budget' name='budget' />
                    <TextField id='edit-planning-start' name='startTime' placeholder = 'mm/dd/yyyy'/>
                    <TextField id='edit-planning-end' name='endTime' placeholder='mm/dd/yyyy'/>
                    <LongTextField id='edit-planning-description' name= 'description'/>
                  </Card.Content>
                </Card>
                <SubmitField id='edit-planning-submit' value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

EditPlanning.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

export default withTracker(({ match }) => {
  const docId = match.params._id;
  const subscription = Plannings.subscribePlanning();
  const ready = subscription.ready();
  const doc = Plannings.findDoc(docId);
  return {
    doc,
    ready,
  };
})(EditPlanning);
