import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
const Signout = () => {
  Meteor.logout();
  return (
    <Header id={PAGE_IDS.SIGN_OUT} as="h2" textAlign="center">
      <br />
      <p className="signout-page">You are signed out.</p>
      <div>
        <Image className="signout-image" centered src="images/signout.jpeg"/></div>
      <br/>
      <Link to="/">
        <Button size="big" color='teal' to="/">Return to Home</Button>
      </Link>
    </Header>
  );
};

export default Signout;
