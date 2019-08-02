/**
 * MainBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 20:36:15
 * @last-modified 2019-08-02 01:25:16
 */

import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import './MainBoard.css';
import CurrentSong from '../CurrentSong/CurrentSong';
import SongInfo from '../SongInfo/SongInfo';
import ArtistInfo from '../ArtistInfo/ArtistInfo';

class MainBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      fullTitles: []
    };
  }

  render() {
    return (
      <div className="mainBoard">
        <Grid columns={3} className="mainBoard-grid">
          <Grid.Column width={4} className="panel mainBoard-left">
            <CurrentSong />
          </Grid.Column>
          <Grid.Column width={7} className="panel mainBoard-mid">
            <SongInfo />
          </Grid.Column>
          <Grid.Column width={5} className="panel mainBoard-right">
            <ArtistInfo />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default MainBoard;
