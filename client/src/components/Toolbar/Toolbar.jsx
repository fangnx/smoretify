/**
 * Toolbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-04 11:21:15
 * @last-modified 2019-09-20 19:59:52
 */

import React from 'react';
import { connect } from 'react-redux';
import {
  TOGGLE_YOUTUBE,
  CHANGE_LYRICS_ALIGNMENT,
  CHANGE_LYRICS_FONT,
  TOGGLE_LYRICS_ITALICIZED,
  CHANGE_APP_BRIGHTNESS
} from '../../redux/actionTypes';
import SpotifyStatus from './SpotifyStatus';
import {
  Button,
  Dropdown,
  Grid,
  Icon,
  Image,
  Menu,
  Popup,
  Progress
} from 'semantic-ui-react';
import biscuitIcon from '../../assets/biscuit.svg';
import Spotify_Icon_Green from '../../assets/Spotify_Icon_Green.png';
import Genius_Icon from '../../assets/Genius_Icon.png';
import GitHub_Icon from '../../assets/GitHub_Icon.png';
import './Toolbar.css';

const PROJECT_GITHUB_LINK = 'https://github.com/fangnx/smoretify';

const popupStyle = {
  backgroundColor: 'var(--color-grey)'
};

const fontOptions = [
  { key: 0, text: 'Humanist', value: 'var(--font-dynamic)' },
  { key: 1, text: 'Calligraphic', value: 'var(--font-stylish)' },
  { key: 2, text: 'Contemporary', value: 'var(--font-contemporary)' },
  { key: 3, text: 'Classic', value: 'var(--font-serif)' }
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

  toggleLyricsItalicized = e => {
    e.preventDefault();
    this.props.dispatch({
      type: TOGGLE_LYRICS_ITALICIZED,
      payload: {
        lyricsItalicized: !this.props.lyricsItalicized
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

  handleBrightnessChange = shouldIncrease => {
    let brightness = this.props.appBrightness;
    if (shouldIncrease) {
      brightness = brightness + 0.2 >= 1.0 ? 1.0 : brightness + 0.2;
    } else {
      brightness = brightness - 0.2 <= 0.2 ? 0.2 : brightness - 0.2;
    }
    this.props.dispatch({
      type: CHANGE_APP_BRIGHTNESS,
      payload: {
        appBrightness: brightness
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
                          ? 'align left'
                          : 'align center'
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
                  content={
                    this.props.lyricsItalicized
                      ? 'Unitalicize lyrics text'
                      : 'Italicize lyrics text'
                  }
                  inverted
                  on="hover"
                  style={popupStyle}
                  trigger={
                    <Icon
                      name="italic"
                      onClick={this.toggleLyricsItalicized}
                      size="large"
                      style={
                        this.props.lyricsItalicized
                          ? {}
                          : { color: 'var(--text-color-1)' }
                      }
                    ></Icon>
                  }
                ></Popup>
              </Menu.Item>

              <Menu.Item>
                <Dropdown
                  compact
                  closeOnChange
                  icon={null}
                  inline
                  openOnFocus
                  trigger={<Icon name="font" size="large"></Icon>}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      disabled
                      content="Select lyrics font style"
                    />
                    <Dropdown.Divider />
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
              </Menu.Item>

              <Menu.Item>
                <Popup
                  basic
                  inverted
                  on="click"
                  style={{ ...popupStyle, right: 0 }}
                  trigger={<Icon name="lightbulb" size="large"></Icon>}
                >
                  <>
                    <div className="miniTitle">Change app brightness</div>
                    <Progress
                      percent={this.props.appBrightness * 100}
                      size="large"
                    />
                    <div className="controller">
                      <Button.Group style={{ width: '100%' }}>
                        <Button
                          icon="minus"
                          size="tiny"
                          onClick={() => this.handleBrightnessChange(false)}
                        />
                        <Button
                          icon="plus"
                          size="tiny"
                          onClick={() => this.handleBrightnessChange(true)}
                        />
                      </Button.Group>
                    </div>
                  </>
                </Popup>
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
    lyricsItalicized: layout.lyricsItalicized,
    appBrightness: layout.appBrightness,
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
