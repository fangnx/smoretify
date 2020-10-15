import React from 'react';
import { connect } from 'react-redux';
import { List, Placeholder } from 'semantic-ui-react';
import { getLyricsFromGenius } from '../../api/geniusAPI';

class SongLyricsWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      lines: [],
      isReady: false
    };
  }

  /**
   * For url:
   * '_': no matched search result from Genius, thus cannot conduct the search.
   * '': signals change in currently placed track.
   * any non-empty string: should conduct the search (the validity of url will be checked later).
   */
  async componentWillReceiveProps(nextProps) {
    if (nextProps.url === '_') {
      this.setState({
        lines: [
          'Lyrics not available.',
          'The current song is not found on Genius.com 😢'
        ],
        isReady: true
      });
      return;
    }
    if (nextProps.url !== this.props.url) {
      this.setState({ isReady: false });
      if (nextProps.url !== '') {
        this.getLyrics(nextProps.url);
      }
    }
  }

  async getLyrics(pageUrl) {
    await getLyricsFromGenius({
      url: pageUrl
    })
      .then(async res => {
        if (res.data) {
          const lines = this.parseLyrics(res.data.songLyrics);
          await this.setState({ lines: lines, isReady: true });
        } else {
          await this.setState({
            lines: ['Lyrics not available.'],
            isReady: true
          });
        }
      })
      .catch();
  }

  parseLyrics(rawLyrics) {
    return rawLyrics.split('\n').filter(line => !!line.trim());
  }

  render() {
    const fillArr = new Array(30).fill(0);
    return (
      <div
        className="songLyricsWidget"
        style={{
          fontFamily: this.props.fontFamily,
          fontStyle: this.props.italicized ? 'italic' : 'normal'
        }}
      >
        {this.state.isReady ? (
          <List className="textFocusAnimation">
            {this.state.lines.map((row, index) => (
              <List.Item
                as="a"
                key={`lyrics-line-${index}`}
                style={{
                  textAlign: this.props.leftAligned ? 'left' : 'center'
                }}
              >
                {row}
              </List.Item>
            ))}
          </List>
        ) : (
          <Placeholder fluid inverted>
            {fillArr.map((_, index) => (
              <Placeholder.Line key={`lyrics-placeholderLine-${index}`} />
            ))}
          </Placeholder>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geniusInfo, layout } = state;
  return {
    url: geniusInfo.songLyricsUrl,
    leftAligned: layout.lyricsLeftAligned,
    fontFamily: layout.lyricsFontFamily,
    italicized: layout.lyricsItalicized
  };
};

export default connect(
  mapStateToProps,
  null
)(SongLyricsWidget);
