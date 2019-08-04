/**
 * Toolbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-04 11:21:15
 * @last-modified 2019-08-04 14:40:34
 */

import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import biscuitIcon from '../../assets/biscuit.svg';
import './Toolbar.css';

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <Menu inverted className="toolbar-menu">
          <Menu.Item>
            <Image src={biscuitIcon} className="toolbar-logo" />
            Smoretify
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Toolbar;
