/**
 * Toolbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-04 11:21:15
 * @last-modified 2019-08-29 15:45:54
 */

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import { Button, Grid, Icon, Image, Menu } from 'semantic-ui-react';
import biscuitIcon from '../../assets/biscuit.svg';
import React_Icon from '../../assets/React_Icon.svg';
import Spotify_Icon_Green from '../../assets/Spotify_Icon_Green.png';
import Genius_Icon from '../../assets/Genius_Icon.png';
import './Toolbar.css';

class Toolbar extends React.Component {
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
                <div className="toolbar-appName">Smoretify</div>
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={8}>
            <Menu inverted className="toolbar-mid-menu">
              <Menu.Item>
                <Icon
                  name="youtube"
                  onClick={this.toggleYoutube}
                  size="large"
                ></Icon>
              </Menu.Item>
              <Menu.Item>
                <Icon
                  name={
                    this.props.lyricsLeftAligned ? 'align center' : 'align left'
                  }
                  onClick={this.toggleLyricsLeftAligned}
                  size="large"
                ></Icon>
              </Menu.Item>
              <Menu.Item>
                <Icon name="font" size="large"></Icon>
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={4}>
            <Menu inverted className="toolbar-right-menu">
              <Menu.Item>
                Built with
                <Image
                  src={React_Icon}
                  style={{ width: '1.5em', margin: '0 0 0 4px' }}
                ></Image>
                <Image
                  src={Spotify_Icon_Green}
                  style={{ width: '1.1em', margin: '0 4px 0 4px' }}
                ></Image>
                <Image
                  src={Genius_Icon}
                  style={{ width: '1.1em', margin: '0 4px 0 4px' }}
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
  const { layout } = state;
  return {
    showYoutube: layout.showYoutube,
    lyricsLeftAligned: layout.lyricsLeftAligned,
    lyricsFontFamily: layout.lyricsFontFamily
  };
};

export default connect(
  mapStateToProps,
  null
)(Toolbar);
