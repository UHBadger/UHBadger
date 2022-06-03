import React from 'react';
import { Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Grid, Image, Container } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const Policy = () => (
  <Grid id={PAGE_IDS.POLICY} container centered>
    <Grid.Column width={14}>
      <h2 className="policy">About</h2>
      <p className="policy-text">There are still a lot of people who do not keep track of their spending. 
        They think keeping a financial ledger is complicated and troublesome.
        It is good to manage everything in the real world perfectly, but it is still difficult for the system to do so automatically.</p>
      <p>UHBadger has been created for these users.
        Do not worry about complicated features anymore.
        Fill out the household accounts step by step with UHBadger.
        We hope you have some change.</p>
      <h2>Key Features</h2>
      <p>* Super Easy Way to Use<br/>
        * View Monthly History<br/>
        * Analysis of various life patterns such as eating out, drinking, and cultural life<br/>
        * Budget management</p>
      <h2>Data Security</h2>
      <p>* UHBadger does not share personal information and provide it to third parties<br/>
        * UHBadger does not store personal information<br/>
        * Users can request data deletion</p>
      <Image size='massive' src='images/policy.png'/>
    </Grid.Column>

  </Grid>
);

export default Policy;
