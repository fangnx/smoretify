/**
 * SongInfoPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-31 17:32:41
 * @last-modified 2019-08-31 17:38:27
 */

import React from 'react';
import MiniYoutubeWidget from './MiniYoutubeWidget';
import SongLyricsWidget from './SongLyricsWidget';
import { Container } from 'semantic-ui-react';
import './SongInfoPanel.css';

const ArtistInfoPanel = props => (
  <div className="songInfoPanel">
    {props.showYoutube ? (
      <div className="miniYoutube-wrapper">
        <MiniYoutubeWidget url={props.youtubeUrl} />
      </div>
    ) : (
      <></>
    )}

    <Container className="songInfo-container lyrics">
      <SongLyricsWidget />
    </Container>

    <Container className="songInfo-container annotations" />
  </div>
);

export default ArtistInfoPanel;
