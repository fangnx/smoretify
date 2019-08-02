/**
 * CurrentSong.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-16 01:45:13
 * @last-modified 2019-08-02 01:47:48
 */

import React from 'react';
import './CurrentSong.css';
import { Card, Image, Header } from 'semantic-ui-react';
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
      <div className="currentSong-panel">
        <React.Fragment>
          {isReady ? (
            <div className="currentSong-widget">
              <Image src={songImg} wrapped className="currentSong-img" />
              <div className="currentSong-text">
                <Header>{currentSong}</Header>
              </div>
            </div>
          ) : (
            ''
            // <Card className="currentSong-card" />
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default CurrentSong;
