import React from 'react';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';

class SongSummaryWidget extends React.Component {
  render() {
    let songSummary = this.props.summary;
    if (songSummary) {
      if (songSummary === '_') {
        songSummary =
          '<p>Song info not available.</p><p>The current song is not found on Genius.com</p>';
      } else if (songSummary.match(/<p>(\?)<\/p>/g)) {
        songSummary = '<p>Song info not available.</p>';
      }
    }
    const fillArr = new Array(10).fill(0);

    return (
      <div className="songSummaryWidget">
        {songSummary ? (
          <div
            className="textFocusAnimation "
            dangerouslySetInnerHTML={{ __html: songSummary }}
          />
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
