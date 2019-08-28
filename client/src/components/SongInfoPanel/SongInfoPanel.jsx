/**
 * SongInfoPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-08-24 02:22:30
 */

import React from 'react';
import './SongInfoPanel.css';
import { Button, Container, Header, Icon, Menu } from 'semantic-ui-react';
import WithScrollbar from '../Scrollbar/Scrollbar';
import SongLyricsWidget from './SongLyricsWidget/SongLyricsWidget';
import MiniYoutube from './MiniYoutube/MiniYoutube';

class SongInfoPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      showYoutube: false
    };
  }

  onClickToggleYoutube = () => {
    this.setState(prevState => ({
      showYoutube: !prevState.showYoutube
    }));
  };

  render() {
    return (
      <div className="songInfoPanel">
        {/* <Icon name="youtube" /> */}
        {/* <Menu inverted className="songInfo-topMenu">
          <Menu.Item
            name="Toggle Youtube"
            onClick={this.onClickToggleYoutube}
          />
        </Menu> */}
        {this.state.showYoutube ? (
          <div className="miniYoutube-wrapper">
            <MiniYoutube url={this.props.youtubeUrl} />
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

SongInfoPanel = WithScrollbar(SongInfoPanel);

export default SongInfoPanel;
