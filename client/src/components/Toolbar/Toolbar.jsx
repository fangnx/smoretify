/**
 * Toolbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-04 11:21:15
 * @last-modified 2019-08-04 11:28:40
 */

import React from 'react';
import { Menu } from 'semantic-ui-react';
import './Toolbar.css';

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <Menu inverted className="toolbar-menu">
          <Menu.Item>asdsa</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Toolbar;
