import React from 'react';
import { Grid, Image, Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';

/** A simple static component to render some text for the landing page. */
const Landing = () => {
  const landingStyle = { paddingTop: '50px', paddingBottom: '30px' };
  return (
    <Grid className="landing-page" style={landingStyle} id={PAGE_IDS.LANDING} centered >
      <Grid.Column width={14} >
        <Image className="landing-image" centered src='/images/signout.jpeg'/>
        <Header style={{ color: 'rgb(44, 62, 80)' }} as ="h2" className="landing">Meet the World&apos;s Easiest Financial Ledger!<br/>
      Here is a personal budget tracker, UHBadger!!</Header>
      </Grid.Column>
      <div>
        {Meteor.userId() === null && <Grid.Column>
          <Button content='Login' color='blue' as={NavLink} exact to="/signin"/>
          <Button content='Register' color='blue' as={NavLink} exact to="/signup"/>
        </Grid.Column>}
      </div>
    </Grid>
  );
};

export default Landing;
