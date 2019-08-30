/**
 * PlayerWidget.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-22 22:51:58
 * @last-modified 2019-08-28 14:28:31
 */

import React from 'react';
import { connect } from 'react-redux';
import { Image, Icon } from 'semantic-ui-react';

class SpotifySongWidget extends React.Component {
  onClickUrl(type) {
    if (type === 'spotify') {
      window.open(this.props.externalSpotifyUrl);
    }
  }

  render() {
    return (
      <div className="playerWidget">
        <Image src={this.props.songImg} wrapped className="currentSong-img" />
        <div className="playerWidget-text">
          <div className="songName">{this.props.songName}</div>
          <div className="artistNames">
            {this.props.artists ? this.props.artists.join(', ') : ''}
          </div>
          <div className="links">
            <Icon name="spotify" onClick={() => this.onClickUrl('spotify')} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { songInfo } = state;
  return {
    songName: songInfo.currentSongName,
    songImg: songInfo.currentSongImg,
    artists: songInfo.currentArtists,
    externalSpotifyUrl: songInfo.externalSpotifyUrl
  };
};

export default connect(
  mapStateToProps,
  null
)(SpotifySongWidget);
