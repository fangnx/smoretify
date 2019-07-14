/**
 * Login.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 11:17:55
 * @last-modified 2019-07-14 15:34:18
 */

import React from 'react';
import './Login.css';
import { Card, Label, Button, Image } from 'semantic-ui-react';
import spotifyIcon from '../../assets/icons/02_CMYK/02_PNG/Spotify_Icon_CMYK_Green.png';

class CurrentSong extends React.Component {
  render() {
    return (
      <Card className="login-card">
        <Image src={spotifyIcon} wrapped className="login-logo" />
        <Card.Content>
          <Button as="a" href="http://localhost:8888" primary>
            Log in to Spotify
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default CurrentSong;
