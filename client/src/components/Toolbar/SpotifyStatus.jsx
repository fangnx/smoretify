/**
 * SpotifyStatus.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-30 15:12:22
 * @last-modified 2019-09-02 12:53:04
 */

import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

class SpotifyStatus extends React.PureComponent {
  render() {
    // TODO: remove opening window.
    return (
      <div
        className="spotifyStatus"
        onClick={() =>
          (window.location.href = 'http://localhost:8888/auth/spotify')
        }
      >
        {this.props.connected ? 'Connected' : 'Not Connected'}
        <Icon
          name={this.props.connected ? 'spotify' : 'close'}
          style={{
            marginLeft: '4px',
            color: this.props.connected ? 'var(--color-spotify-green)' : 'red'
          }}
        />
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
