/**
 * SongLyrics.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-07-27 17:36:29
 */

import React from 'react';
import './SongLyrics.css';
import { Segment, Image, Header, Transition } from 'semantic-ui-react';
import { searchFromGenius } from '../../actions/geniusActions';
// import geniusAuthInfo from '../../../../config/geniusAuthInfo';

class SongLyrics extends React.Component {
  constructor() {
    super();
    this.state = {
      fullTitles: []
    };
  }

  async getSongInfo() {
    await searchFromGenius({ searchTerm: 'common people' }).then(async res => {
      console.log(res);
      if (res.data && res.data.length > 0) {
        const songApiPath = res.data[0].result.api_path;
        console.log(songApiPath.split('/').pop());
      }
    });
  }

  async componentWillMount() {
    await this.getSongInfo();
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
