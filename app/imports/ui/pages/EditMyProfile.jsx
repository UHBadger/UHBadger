import React, { useState } from 'react';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Card, Container, Grid, Header, Loader, Icon, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const bridge = new SimpleSchema2Bridge(UserProfiles._schema);

const EditMyProfile = ({ myProfile, ready, location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  const submit = (data) => {

    const { firstName, lastName, verification, _id } = data;
    const collectionName = UserProfiles.getCollectionName();
    const updateData = { id: _id, firstName, lastName, verification };
    updateMethod.callPromise({ collectionName, updateData, verification })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'information updated successfully', 'success'));
    setRedirectToReferer(true);
  };

  const { from } = location.state || { from: { pathname: '/My-Profile' } };

  if (redirectToReferer) {
    return <Redirect to={from}/>;
  }
  return (ready) ? (
    <Container id={PAGE_IDS.EDIT_PLANNING}>
      <br/>
      <div>
        <Header as="h2" textAlign="center">
          Edit My Profile
        </Header>
      </div>
      <br/>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <div>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={myProfile}>
              <Segment>
                <Card centered>
                  <Card.Content fluid color='yellow' basic>
                    <Card.Content>
                      <Card.Header>
                        <Icon name='pencil alternate'/>
                      General
                      </Card.Header>
                    </Card.Content>
                    <TextField label='First Name' name='firstName'/>
                    <TextField label='Last Name' name='lastName'/>
                  </Card.Content>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Card>
              </Segment>
            </AutoForm>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

EditMyProfile.propTypes = {
  myProfile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

export default withTracker(() => {
  // Get access to document.
  const currentUser = Meteor.user() ? Meteor.user().username : ' ';
  const subscription = UserProfiles.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Plannings documents and sort them by name.
  const myProfile = ready ? UserProfiles.findDoc({ email: currentUser }) : undefined;
  return {
    myProfile,
    ready,
  };
})(EditMyProfile);
