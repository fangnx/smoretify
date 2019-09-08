/**
 * Toolbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-04 11:21:15
 * @last-modified 2019-09-08 00:44:45
 */

import React from 'react';
import { connect } from 'react-redux';
import {
  TOGGLE_YOUTUBE,
  CHANGE_LYRICS_ALIGNMENT,
  CHANGE_LYRICS_FONT
} from '../../redux/actionTypes';
import SpotifyStatus from './SpotifyStatus';
import {
  Dropdown,
  Grid,
  Icon,
  Image,
  Menu,
  Popup,
  Select
} from 'semantic-ui-react';
import biscuitIcon from '../../assets/biscuit.svg';
import Spotify_Icon_Green from '../../assets/Spotify_Icon_Green.png';
import Genius_Icon from '../../assets/Genius_Icon.png';
import GitHub_Icon from '../../assets/GitHub_Icon.png';
import './Toolbar.css';

const PROJECT_GITHUB_LINK = 'https://github.com/fangnx/smoretify';

const popupStyle = {
  backgroundColor: 'var(--color-grey-translucent)'
};

const fontOptions = [
  { key: 0, text: 'Minimalist', value: 'var(--font-dynamic)' },
  { key: 1, text: 'Modern', value: 'var(--font-stylish)' },
  { key: 2, text: 'Classic', value: 'var(--font-serif)' }
];

class Toolbar extends React.PureComponent {
  onClickUrl(type) {
    if (type === 'github') {
      window.open(PROJECT_GITHUB_LINK);
    }
  }

  toggleYoutube = e => {
    e.preventDefault();
    this.props.dispatch({
      type: TOGGLE_YOUTUBE,
      payload: {
        showYoutube: !this.props.showYoutube
      }
    });
  };

  toggleLyricsLeftAligned = e => {
    e.preventDefault();
    this.props.dispatch({
      type: CHANGE_LYRICS_ALIGNMENT,
      payload: {
        lyricsLeftAligned: !this.props.lyricsLeftAligned
      }
    });
  };

  handleFontChange = (e, { value }) => {
    e.preventDefault();
    this.props.dispatch({
      type: CHANGE_LYRICS_FONT,
      payload: {
        lyricsFontFamily: value
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
                  basic
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
                  basic
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
                <Popup
                  basic
                  content="Change lyrics font style"
                  inverted
                  on="hover"
                  style={popupStyle}
                  trigger={
                    <>
                      <Icon name="font" size="large"></Icon>
                      <Dropdown closeOnChange closeOnEscape inline>
                        <Dropdown.Menu inverted>
                          {fontOptions.map(opt => (
                            <Dropdown.Item
                              key={opt.key}
                              text={opt.text}
                              value={opt.value}
                              onClick={this.handleFontChange}
                              style={{ fontFamily: opt.value }}
                            ></Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  }
                ></Popup>
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
                  style={{ width: '1.1em', margin: '0 4px 0 4px' }}
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
