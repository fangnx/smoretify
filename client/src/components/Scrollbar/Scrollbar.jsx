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
