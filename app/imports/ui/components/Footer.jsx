import React from 'react';
import { Grid, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer>
      <div style={divStyle} className="ui container">
        <Grid columns={2}>
          <Grid.Column className="inverted" textAlign="center">
            <hr />
            <h3>ICS 427 Projcet: Budget Tracker</h3>
              Designed by UHBadger<br />
            <a href="https://github.com/UHBadger/UHBadger">UHBadger Project Page</a>
          </Grid.Column>
          <Grid.Column className="inverted" textAlign="center">
            <hr />
            <h3> About us</h3>
            <List inverted>
              <a href="https://feimeichen.github.io/">Feimei Chen</a><br/>
              <a href="https://hanseca.github.io/">Hansen Cabanero</a><br/>
              <a href="https://cheolhoon.github.io/">Cheolhoon Choi</a>
            </List>
          </Grid.Column>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
