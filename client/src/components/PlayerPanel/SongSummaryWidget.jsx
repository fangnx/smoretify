/**
 * SongSummaryWidget.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-22 23:23:43
 * @last-modified 2019-08-22 23:42:35
 */

import React from 'react';
import { connect } from 'react-redux';

class SongSummaryWidget extends React.Component {
  render() {
    let songSummary = this.props.summary;
    if (songSummary === '?') {
      songSummary = 'No song info available.';
    }

    return (
      <div className="songSummaryWidget">
        <div>{songSummary}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geniusInfo } = state;
  return {
    summary: geniusInfo.songSummary
  };
};

export default connect(
  mapStateToProps,
  null
)(SongSummaryWidget);
