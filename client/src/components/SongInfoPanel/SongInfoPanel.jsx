/**
 * SongInfoPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-08-29 20:25:57
 */

import React from 'react';
import { connect } from 'react-redux';
import WithScrollbar from '../Scrollbar';
import SongLyricsWidget from './SongLyricsWidget';
import MiniYoutubeWidget from './MiniYoutubeWidget';
import { Container } from 'semantic-ui-react';
import './SongInfoPanel.css';

class SongInfoPanel extends React.Component {
  render() {
    return (
      <div className="songInfoPanel">
        {this.props.showYoutube ? (
          <div className="miniYoutube-wrapper">
            <MiniYoutubeWidget url={this.props.youtubeUrl} />
          </div>
        ) : (
          <></>
        )}

        <Container className="songInfo-container lyrics">
          {/* <Header as="h3" className="songInfo-title">
            Lyrics
          </Header> */}
          {/* <div className="lyrics-search-result">
            {`(${this.props.searchedSongName} - ${
              this.props.searchedArtistName
            })`}
          </div> */}

          <SongLyricsWidget />
        </Container>

        <Container className="songInfo-container annotations" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { layout } = state;
  return {
    showYoutube: layout.showYoutube
  };
};

SongInfoPanel = WithScrollbar(SongInfoPanel);

export default connect(
  mapStateToProps,
  null
)(SongInfoPanel);