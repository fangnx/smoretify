import React from 'react';
import { connect } from 'react-redux';
import Spotify_Icon_White from '../../assets/Spotify_Icon_White.png';
import { Image, Placeholder } from 'semantic-ui-react';

class SpotifyWidget extends React.Component {
  onClickUrl(type) {
    if (type === 'spotify') {
      window.open(this.props.externalSpotifyUrl);
    }
  }

  render() {
    return (
      <div className="playerWidget">
        <Image
          src={this.props.songImg || Spotify_Icon_White}
          wrapped
          className="currentSong-img"
        />
        <div className="playerWidget-text">
          <div className="songName">
            {this.props.songName ? (
              this.props.songName
            ) : (
              <Placeholder fluid inverted>
                <Placeholder.Line></Placeholder.Line>
              </Placeholder>
            )}
          </div>
          <div className="artistNames">
            {this.props.artists ? (
              this.props.artists.join(', ')
            ) : (
              <Placeholder fluid inverted>
                <Placeholder.Line></Placeholder.Line>
              </Placeholder>
            )}
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
)(SpotifyWidget);
