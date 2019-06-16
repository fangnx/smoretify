import React from 'react';
import './CurrentSong.css';
import { Card, Label, Button, Image, Segment } from 'semantic-ui-react';
import SpotifyWebApi from 'spotify-web-api-js';
import spotifyIcon from '../../assets/icons/02_CMYK/02_PNG/Spotify_Icon_CMYK_Green.png';
const spotifyApi = new SpotifyWebApi();

class CurrentSong extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    console.log(params);
  }
  getHashParams() {
    const hashParams = {};
    let e = /([^&;=]+)=?([^&;]*)/g;
    const r = e;
    const q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <Card raised className="currentSong-card">
        <Image src={spotifyIcon} wrapped className="currentSong-logo" />
        <Card.Content>
          <Button primary>Log in to Spotify</Button>
        </Card.Content>
      </Card>
    );
  }
}

export default CurrentSong;
