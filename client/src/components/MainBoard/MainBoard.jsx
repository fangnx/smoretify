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
);

export default MainBoard;
