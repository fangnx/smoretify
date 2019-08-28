/**
 * Toolbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-04 11:21:15
 * @last-modified 2019-08-28 16:39:51
 */

import React from 'react';
import { Grid, Icon, Image, Menu } from 'semantic-ui-react';
import biscuitIcon from '../../assets/biscuit.svg';
import './Toolbar.css';

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <Grid columns={3} className="toolBar-grid">
          <Grid.Column width={4}>
            <Menu inverted className="toolbar-left-menu">
              <Menu.Item>
                <Image src={biscuitIcon} className="toolbar-logo" />
                Smoretify
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={8}>
            <Menu inverted className="toolbar-mid-menu">
              <Menu.Item>
                <Icon name="youtube" size="large"></Icon>
              </Menu.Item>
              <Menu.Item>
                <Icon name="align center" size="large"></Icon>
              </Menu.Item>
              <Menu.Item>
                <Icon name="font" size="large"></Icon>
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={4}>
            <Menu inverted className="toolbar-right-menu"></Menu>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Toolbar;
