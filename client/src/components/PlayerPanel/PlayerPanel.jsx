/**
 * PlayerPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-31 17:13:05
 * @last-modified 2019-08-31 17:26:52
 */

import React from 'react';
import TrackPerformers from './TrackPerformers';
import SpotifyWidget from './SpotifyWidget';
import SongSummaryWidget from './SongSummaryWidget';
import { Container, Header } from 'semantic-ui-react';
import './PlayerPanel.css';

const PlayerPanel = () => (
  <div className="playerPanel">
    <SpotifyWidget />

    <div className="playerPanel-text">
      <Container className="playerPanel-container">
        <Header as="h3">About</Header>
        <SongSummaryWidget />
      </Container>

      {/* <Container className="playerPanel-container">
			<Header as="h3">Track Info</Header>
			<TrackInfoWidget />
		</Container> */}
    </div>
  </div>
);

export default PlayerPanel;
