import React from 'react';
import { Grid, Segment, Header, Container, Card, Icon } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, RadioField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Spending } from '../../api/stuff/SpendingCollection';

export const spendingCategories = ['home', 'food', 'transportation', 'entertainment', 'miscellaneous', 'income'];
const today = new Date().toLocaleDateString('en-US',
  { year: 'numeric', month: '2-digit', day: '2-digit' });
// Create a schema to specify the structure of the data to appear in the card.
const formSchema = new SimpleSchema({
  title: String,
  description: String,
  amount: Number,
  category: {
    type: String,
    allowedValues: spendingCategories,
  },
  date: {
    type: Date,
    defaultValue: today,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
const AddSpending = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
    const validDate = (date) => pattern.test(date);
    if (validDate(data.date)) {
      const { title, description, amount, category, date } = data;
      const owner = Meteor.user().username;
      const collectionName = Spending.getCollectionName();
      const definitionData = { title, description, amount, category, date, owner };
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
    <Container id={PAGE_IDS.ADD_SPENDING} >
      <Header as="h2" textAlign="center">Add Spending</Header>
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
                  <TextField name='title' id='spending-title' />
                  <NumField name='amount' id='spending-amount' />
                  <TextField name='date' placeholder = 'mm/dd/yyyy' id='spending-date' />
                  <RadioField name='category' id='spending-category' />
                  <LongTextField name= 'description' id='spending-description' />
                </Card.Content>
              </Card>
              <SubmitField value='Submit' id='spending-submit' />
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default AddSpending;
