import React from 'react';
import { Grid, Segment, Header, Container, Card, Icon } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Plannings } from '../../api/planning/PlanningCollection';

// Create a schema to specify the structure of the data to appear in the card.
const today = new Date().toLocaleDateString('en-US',
  { year: 'numeric', month: '2-digit', day: '2-digit' });
const formSchema = new SimpleSchema({
  title: String,
  budget: Number,
  startTime: {
    type: String,
    defaultValue: today,
  },
  endTime: String,
  description: {
    type: String,
    defaultValue: 'None' },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
const AddPlanning = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    const validDate = (date) => {
      if (pattern.test(date)) return true;
      return false;
    };
    if (validDate(data.startTime) && validDate(data.endTime)) {
      const { title, budget, startTime, endTime, description } = data;
      const owner = Meteor.user().username;
      const collectionName = Plannings.getCollectionName();
      const definitionData = { title, budget, startTime, endTime, description, owner };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        });
    } else {
      swal('Error', 'please enter a correct format for date such as 02/20/2022!', 'error');
    }
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ADD_PLANNING} >
      <Header as="h2" textAlign="center">Add Planning</Header>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment>
              <Card fluid color='yellow'>
                <Card.Content>
                  <Card.Header>
                    <Icon name='pencil alternate'/>
                  General
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <TextField id='planning-title' name='title' />
                  <NumField id='planning-budget' name='budget' />
                  <TextField id='planning-start' name='startTime'placeholder = 'mm/dd/yyyy'/>
                  <TextField id='planning-end' name='endTime' placeholder='mm/dd/yyyy'/>
                  <LongTextField id='planning-description' name= 'description'/>
                </Card.Content>
              </Card>
              <SubmitField id='planning-submit' value='Submit' />
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default AddPlanning;
