/**
 * SongLyrics.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-07-14 16:45:40
 */

import React from 'react';
import './SongLyrics.css';
import { Segment, Image, Header, Transition } from 'semantic-ui-react';
import { searchFromGenius } from '../../actions/songInfoActions';
// import geniusAuthInfo from '../../../../config/geniusAuthInfo';

class SongLyrics extends React.Component {
  constructor() {
    super();
    this.state = {
      fullTitles: []
    };
  }
  async getLyrics() {
    searchFromGenius({
      query: 'Common People pulp'
    }).then(res => res);
  }

  componentWillMount() {
    this.getLyrics();
  }

  render() {
    return (
      <React.Fragment>
        <Segment>sss</Segment>
      </React.Fragment>
    );
  }
}

export default SongLyrics;
