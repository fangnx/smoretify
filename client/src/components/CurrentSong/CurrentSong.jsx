import React from 'react';
import './CurrentSong.css';
import { Card, Image, Header, Transition } from 'semantic-ui-react';
import spotifyIcon from '../../assets/Spotify_Icon_CMYK_Green.png';
import { initSpotifyApi } from '../../App';

class CurrentSong extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      currentSong: '',
      songImg: ''
    };
  }

  /**
   * @deprecated
   */
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

  async getCurrentSong() {
    const spotifyApi = await initSpotifyApi();

    spotifyApi
      .getMyCurrentPlaybackState()
      .then(res => {
        if (res) {
          console.log(res);
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
      })
      .catch(err => console.log(err));
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
