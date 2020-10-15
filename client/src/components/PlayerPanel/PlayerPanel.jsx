import React from 'react';
import SpotifyWidget from './SpotifyWidget';
import SongSummaryWidget from './SongSummaryWidget';
import { Container, Header } from 'semantic-ui-react';
import './PlayerPanel.css';

const PlayerPanel = () => (
  <div className="playerPanel">
    <SpotifyWidget />

    <div className="playerPanel-text">
      <Container className="playerPanel-container">
        <Header as="h3">About the Song</Header>
        <SongSummaryWidget />
      </Container>
    </div>
  </div>
);

export default PlayerPanel;
