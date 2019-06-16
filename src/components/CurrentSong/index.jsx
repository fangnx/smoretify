import React from 'react';
import './CurrentSong.css';
import { Card, Label, Button, Image, Header } from 'semantic-ui-react';
import SpotifyWebApi from 'spotify-web-api-js';
import spotifyIcon from '../../assets/icons/02_CMYK/02_PNG/Spotify_Icon_CMYK_Green.png';

const spotifyApi = new SpotifyWebApi();

class CurrentSong extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const accessToken = params.access_token;
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }

    this.state = {
      isLoggedIn: !!accessToken,
      currentSong: '',
      songImg: ''
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getCurrentSong() {
    spotifyApi.getMyCurrentPlaybackState((err, res) => {
      this.setState({
        currentSong: res.item.name,
        songImg: res.item.album.images[0].url
      });
    });
  }

  componentWillMount() {
    this.getCurrentSong();
  }

  render() {
    const { currentSong, songImg } = this.state;

    return (
      <React.Fragment>
        {currentSong && songImg && (
          <Card raised className="currentSong-card">
            <Image src={songImg} wrapped className="currentSong-img" />
            <Card.Content>
              <Button as="a" href="http://localhost:8888" primary>
                Log in to Spotify
              </Button>

              {this.state.isLoggedIn ? <Header>{currentSong}</Header> : ''}
            </Card.Content>
          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default CurrentSong;
