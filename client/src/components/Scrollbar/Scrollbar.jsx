/**
 * Scrollbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-08 00:49:49
 * @last-modified 2019-08-31 17:52:34
 */

import React from 'react';
import { Scrollbar as CustomizableScrollbar } from 'react-scrollbars-custom';
import './Scrollbar.css';

const withScrollbar = Content => {
  return class Scrollbar extends React.Component {
    render() {
      return (
        <CustomizableScrollbar className="scrollbar">
          <Content {...this.props} />
        </CustomizableScrollbar>
      );
    }
  };
};

export default withScrollbar;
