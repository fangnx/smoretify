/**
 * MainBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-31 15:59:17
 * @last-modified 2019-09-08 15:09:36
 */

import React from 'react';
import PlayerPanel from '../PlayerPanel';
import SongInfoPanel from '../SongInfoPanel';
import ArtistInfoPanel from '../ArtistInfoPanel';
import { Grid } from 'semantic-ui-react';
import './MainBoard.css';

const MainBoard = props => (
  <div
    className="mainBoard"
    style={{ filter: `brightness(${props.brightness})` }}
  >
    <div className="mainBoard-scrollable">
      <Grid columns={3} className="mainBoard-grid">
        <Grid.Column width={4} className="panel mainBoard-left">
          <PlayerPanel />
        </Grid.Column>
        <Grid.Column width={8} className="panel mainBoard-mid">
          <SongInfoPanel />
        </Grid.Column>
        <Grid.Column width={4} className="panel mainBoard-right">
          <ArtistInfoPanel />
        </Grid.Column>
      </Grid>
    </div>
  </div>
);

export default MainBoard;
