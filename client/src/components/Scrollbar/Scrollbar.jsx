/**
 * Scrollbar.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-08 00:49:49
 * @last-modified 2019-08-10 21:42:31
 */

import React from 'react';
import { Scrollbar as CustomizableScrollbar } from 'react-scrollbars-custom';
import './Scrollbar.css';

const style = { width: '100%', height: '1000px' };

const WithScrollbar = Content => {
  return class Scrollbar extends React.Component {
    render() {
      return (
        <CustomizableScrollbar style={style}>
          <Content {...this.props} />
        </CustomizableScrollbar>
      );
    }
  };
};

export default WithScrollbar;
