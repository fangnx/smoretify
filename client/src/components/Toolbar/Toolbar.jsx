/**
 * Toolbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-04 11:21:15
 * @last-modified 2019-08-31 01:56:40
 */

import React from 'react';
import { connect } from 'react-redux';
import SpotifyStatus from './SpotifyStatus';
import { Grid, Icon, Image, Menu, Popup } from 'semantic-ui-react';
import biscuitIcon from '../../assets/biscuit.svg';
// import React_Icon from '../../assets/React_Icon.svg';
import Spotify_Icon_Green from '../../assets/Spotify_Icon_Green.png';
import Genius_Icon from '../../assets/Genius_Icon.png';
import GitHub_Icon from '../../assets/GitHub_Icon.png';
import './Toolbar.css';

const PROJECT_GITHUB_LINK = 'https://github.com/fangnx/smoretify';

const popupStyle = {
  backgroundColor: 'var(--mainBoard-shade-color)'
};

class Toolbar extends React.PureComponent {
  onClickUrl(type) {
    if (type === 'github') {
      window.open(PROJECT_GITHUB_LINK);
    }
  }

  toggleYoutube = e => {
    e.preventDefault();
    this.props.dispatch({
      type: 'LAYOUT',
      payload: {
        showYoutube: !this.props.showYoutube,
        lyricsLeftAligned: this.props.lyricsLeftAligned
      }
    });
  };

  toggleLyricsLeftAligned = e => {
    e.preventDefault();
    this.props.dispatch({
      type: 'LAYOUT',
      payload: {
        lyricsLeftAligned: !this.props.lyricsLeftAligned
      }
    });
  };

  render() {
    return (
      <div className="toolbar">
        <Grid columns={3} className="toolBar-grid">
          <Grid.Column width={4}>
            <Menu inverted className="toolbar-left-menu">
              <Menu.Item>
                <Image src={biscuitIcon} className="toolbar-logo" />
                <SpotifyStatus />
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={8}>
            <Menu inverted className="toolbar-mid-menu">
              <Menu.Item>
                <Popup
                  content={
                    this.props.showYoutube ? 'Hide YouTube' : 'Show YouTube'
                  }
                  inverted
                  on="hover"
                  style={popupStyle}
                  trigger={
                    <Icon
                      name="youtube"
                      onClick={this.toggleYoutube}
                      size="large"
                      style={
                        this.props.showYoutube
                          ? {}
                          : { color: 'var(--text-color-1)' }
                      }
                    ></Icon>
                  }
                ></Popup>
              </Menu.Item>

              <Menu.Item>
                <Popup
                  content={
                    this.props.lyricsLeftAligned
                      ? 'Align lyrics to center'
                      : 'Align lyrics to left'
                  }
                  inverted
                  on="hover"
                  style={popupStyle}
                  trigger={
                    <Icon
                      name={
                        this.props.lyricsLeftAligned
                          ? 'align center'
                          : 'align left'
                      }
                      onClick={this.toggleLyricsLeftAligned}
                      size="large"
                    ></Icon>
                  }
                ></Popup>
              </Menu.Item>

              <Menu.Item>
                <Icon name="font" size="large"></Icon>
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={4}>
            <Menu inverted className="toolbar-right-menu">
              <Menu.Item position="right">
                Built with
                <Image
                  src={Spotify_Icon_Green}
                  style={{ width: '1.1em', margin: '0 4px 0 6px' }}
                ></Image>
                <Image
                  src={Genius_Icon}
                  style={{ width: '1.1em', margin: '0 12px 0 4px' }}
                ></Image>
              </Menu.Item>
              <Menu.Item onClick={() => this.onClickUrl('github')}>
                View Source
                <Image
                  src={GitHub_Icon}
                  style={{ width: '1.1em', margin: '0 4px 0 6px' }}
                ></Image>
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { layout, spotify } = state;
  return {
    showYoutube: layout.showYoutube,
    lyricsLeftAligned: layout.lyricsLeftAligned,
    lyricsFontFamily: layout.lyricsFontFamily,
    connected: spotify.connected,
    displayName: spotify.displayName,
    country: spotify.country,
    profilePhotoUrl: spotify.profilePhotoUrl
  };
};

export default connect(
  mapStateToProps,
  null
)(Toolbar);
