import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** A simple static component to render some text for the landing page. */
const Landing = () => {
  const landingStyle = { paddingTop: '50px', paddingBottom: '30px', };
  return (
  <Grid style={landingStyle} id={PAGE_IDS.LANDING} container centered >

      <Grid.Column width={14} >
      <Image  size='massive' src='/images/budget.png'/>
        <h2 className="landing">Meet the World's Easiest Financial Ledger!<br/>
        Here is a personal budget tracker, UHBadger!!</h2>
      </Grid.Column>

  </Grid>
  );
}

export default Landing;
