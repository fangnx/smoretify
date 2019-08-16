/**
 * SongInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-08-16 01:33:58
 */

import React from 'react';
import './SongInfo.css';
import { Container, Header } from 'semantic-ui-react';
import WithScrollbar from '../Scrollbar/Scrollbar';
import SongLyrics from './SongLyrics/SongLyrics';
import MiniYoutube from './MiniYoutube/MiniYoutube';

class SongInfo extends React.Component {
  render() {
    return (
      <div className="songInfo-panel">
        {/* <MiniYoutube /> */}

        <Container className="songInfo-container lyrics">
          <Header as="h2" className="songInfo-title">
            Lyrics
          </Header>
          <div className="lyrics-search-result">
            {`(${this.props.searchedSongName} - ${
              this.props.searchedArtistName
            })`}
          </div>

          <SongLyrics url={this.props.url} />
        </Container>

        <Container className="songInfo-container annotations" />
      </div>
    );
  }
}

SongInfo = WithScrollbar(SongInfo);

export default SongInfo;
