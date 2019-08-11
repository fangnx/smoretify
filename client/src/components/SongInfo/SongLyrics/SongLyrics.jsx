/**
 * SongLyrics.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-02 00:22:19
 * @last-modified 2019-08-11 01:48:40
 */

import React from 'react';
import './SongLyrics.css';
import { List, Placeholder } from 'semantic-ui-react';
import { getLyricsFromGenius } from '../../../actions/geniusActions';

class SongLyrics extends React.Component {
  constructor() {
    super();
    this.state = {
      lines: [],
      isReady: false
    };
  }

  async componentWillReceiveProps() {
    await this.getLyrics(this.props.url);
  }

  async getLyrics(pageUrl) {
    await getLyricsFromGenius({
      url: pageUrl
    })
      .then(async res => {
        const lines = this.parseLyrics(res.data.songLyrics);
        await this.setState({ lines: lines, isReady: true });
      })
      .catch();
  }

  parseLyrics(rawLyrics) {
    return rawLyrics.split('\n').filter(line => !!line.trim());
  }

  render() {
    console.log(this.state.lines);
    const { isReady } = this.state;
    const fillArr = new Array(30).fill(0);
    return (
      <div className="songLyrics-widget">
        {isReady ? (
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
      </div>
    );
  }
}

export default SongLyrics;
