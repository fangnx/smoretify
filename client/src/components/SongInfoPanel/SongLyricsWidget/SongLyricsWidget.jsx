/**
 * SongLyricsWidget.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-02 00:22:19
 * @last-modified 2019-08-23 23:29:45
 */

import React from 'react';
import { connect } from 'react-redux';
import { List, Placeholder, Transition } from 'semantic-ui-react';
import { getLyricsFromGenius } from '../../../actions/geniusActions';

class SongLyricsWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      lines: [],
      isReady: false
    };
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({ isReady: false });
    if (nextProps.url !== '') {
      this.getLyrics(nextProps.url);
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
      <div className="songLyricsWidget">
        <Transition
          visible={this.state.isReady}
          animation="fade"
          duration={200}
        >
          {this.state.isReady ? (
            <List>
              {this.state.lines.map((row, index) => (
                <List.Item as="a">{row}</List.Item>
              ))}
            </List>
          ) : (
            <Placeholder fluid inverted>
              {fillArr.map(num => (
                <Placeholder.Line />
              ))}
            </Placeholder>
          )}
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { geniusInfo } = state;
  return {
    url: geniusInfo.songLyricsUrl
  };
};

export default connect(
  mapStateToProps,
  null
)(SongLyricsWidget);
