import React from 'react';
import './CurrentSong.css';
import { Card, Image, Header, Transition } from 'semantic-ui-react';
import SpotifyWebApi from 'spotify-web-api-js';
import spotifyIcon from '../../assets/Spotify_Icon_CMYK_Green.png';

const spotifyApi = new SpotifyWebApi();

class CurrentSong extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const accessToken = params.access_token;
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    } else {
      console.log('No Spotify access token present');
    }

    this.state = {
      isLoggedIn: !!accessToken,
      isReady: false,
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
    spotifyApi.getMyCurrentPlaybackState((_, res) => {
      if (res) {
        this.setState({
          isReady: true,
          currentSong: res.item.name,
          songImg: res.item.album.images[0].url
        });
      } else {
        this.setState({
          isReady: true,
          currentSong: 'No Song',
          songImg: spotifyIcon
        });
      }
    });
  }

  componentWillMount() {
    this.getCurrentSong();
  }

  render() {
    const { isReady, currentSong, songImg } = this.state;
    console.log(this.state);

    return (
      <React.Fragment>
        <Transition visible={isReady} animation="fade">
          {isReady ? (
            <Card className="currentSong-card">
              <Image src={songImg} wrapped className="currentSong-img" />
              <Card.Content>
                {/* <Button as="a" href="http://localhost:8888" primary>
                  Log in to Spotify
                </Button> */}

                <Header>{currentSong}</Header>
              </Card.Content>
            </Card>
          ) : (
            ''
          )}
        </Transition>
      </React.Fragment>
    );
  }
}

export default CurrentSong;
