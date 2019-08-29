/**
 * Toolbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-04 11:21:15
 * @last-modified 2019-08-29 15:08:28
 */

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import { Button, Grid, Icon, Image, Menu } from 'semantic-ui-react';
import biscuitIcon from '../../assets/biscuit.svg';
import './Toolbar.css';

class Toolbar extends React.Component {
  toggleYoutube = e => {
    e.preventDefault();
    this.props.dispatch({
      type: 'LAYOUT',
      payload: {
        showYoutube: !this.props.showYoutube
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
                  name="align center"
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
                Built by fangnx
                <Icon
                  name="github"
                  size="large"
                  style={{ padding: '0 5px 0 5px' }}
                ></Icon>
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
