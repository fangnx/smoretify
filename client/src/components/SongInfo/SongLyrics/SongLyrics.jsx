/**
 * SongLyrics.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-02 00:22:19
 * @last-modified 2019-08-02 01:08:06
 */

import React from 'react';
import './SongLyrics.css';
import { List, Placeholder } from 'semantic-ui-react';
import { getLyricsFromGenius } from '../../../actions/geniusActions';

class SongLyrics extends React.Component {
  constructor() {
    super();
    this.state = {
      lines: []
    };
  }

  async componentWillReceiveProps() {
    await this.getLyrics();
  }

  async getLyrics() {
    await getLyricsFromGenius({
      url:
        'https://genius.com/Arctic-monkeys-i-bet-you-look-good-on-the-dancefloor-lyrics'
    })
      .then(async res => {
        const lines = this.parseLyrics(res.data.songLyrics);
        await this.setState({ lines });
      })
      .catch();
  }

  parseLyrics(rawLyrics) {
    return rawLyrics.split('\n').filter(line => !!line.trim());
  }

  render() {
    return (
      <div className="songLyrics-widget">
        <List>
          {this.state.lines.map((row, index) => (
            <List.Item as="a">{row}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default SongLyrics;
