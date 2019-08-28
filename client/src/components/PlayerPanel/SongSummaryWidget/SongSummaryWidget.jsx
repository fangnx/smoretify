/**
 * SongSummaryWidget.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-22 23:23:43
 * @last-modified 2019-08-28 16:12:26
 */

import React from 'react';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';

class SongSummaryWidget extends React.Component {
  render() {
    let songSummary = this.props.summary;
    if (songSummary === '?') {
      songSummary = 'No song info available.';
    }
    const fillArr = new Array(10).fill(0);

    return (
      <div className="songSummaryWidget">
        {songSummary !== '' ? (
          <div dangerouslySetInnerHTML={{ __html: songSummary }} />
        ) : (
          <Placeholder fluid inverted>
            {fillArr.map((_, index) => (
              <Placeholder.Line key={`songSummary-placeholderLine-${index}`} />
            ))}
          </Placeholder>
        )}
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
