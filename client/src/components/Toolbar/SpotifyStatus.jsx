import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

class SpotifyStatus extends React.PureComponent {
  render() {
    return (
      <div
        className="spotifyStatus"
        onClick={() =>
          (window.location.href = window.location.origin + '/auth/spotify')
        }
      >
        {this.props.connected ? 'Connected' : 'Connect to Spotify'}
        <Icon
          name={this.props.connected ? 'check' : 'music'}
          style={{
            marginLeft: '4px',
            color: this.props.connected
              ? 'var(--color-spotify-green)'
              : 'var(--text-color-0)'
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
