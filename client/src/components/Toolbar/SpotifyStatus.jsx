/**
 * SpotifyStatus.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 15:12:22
 * @last-modified 2019-08-30 16:02:25
 */

import React from 'react';
import { connect } from 'react-redux';
import { Flag, Icon, Image, Label } from 'semantic-ui-react';

class SpotifyStatus extends React.PureComponent {
  render() {
    return (
      <div className="spotifyStatus">
        {/* <Label image> */}
        {this.props.connected ? 'Connected' : 'Not Connected'}
        <Icon
          name={this.props.connected ? 'spotify' : 'close'}
          style={{
            marginLeft: '4px',
            color: this.props.connected ? 'var(--color-spotify-green)' : 'red'
          }}
        />
        {/* </Label> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { spotify } = state;
  return {
    connected: spotify.connected,
    displayName: spotify.displayName,
    country: spotify.country,
    profilePhotoUrl: spotify.profilePhotoUrl
  };
};

export default connect(
  mapStateToProps,
  null
)(SpotifyStatus);
