/**
 * SongInfoPanelContainer.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-08-31 17:53:09
 */

import React from 'react';
import { connect } from 'react-redux';
import withScrollbar from '../Scrollbar';
import SongInfoPanel from './SongInfoPanel';
import './SongInfoPanel.css';

class SongInfoPanelContainer extends React.Component {
  render() {
    return (
      <SongInfoPanel
        showYoutube={this.props.showYoutube}
        youtubeUrl={this.props.youtubeUrl}
      />
    );
  }
}

const mapStateToProps = state => {
  const { layout, geniusInfo } = state;
  return {
    showYoutube: layout.showYoutube,
    youtubeUrl: geniusInfo.youtubeUrl
  };
};

SongInfoPanelContainer = withScrollbar(SongInfoPanelContainer);

export default connect(
  mapStateToProps,
  null
)(SongInfoPanelContainer);
