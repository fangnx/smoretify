/**
 * MiniYoutube.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-28 17:27:18
 * @last-modified 2019-08-21 23:14:05
 */

import React from 'react';
import './MiniYoutube.css';
import Youtube from 'react-youtube';
import { getYoutubeVideoID } from '../../../utils/commonUtils';

class MiniYoutube extends React.Component {
  render() {
    const videoId = getYoutubeVideoID(this.props.url);
    console.log(videoId);

    const opts = {
      height: '270',
      width: '480',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    return (
      <div className="miniYoutube-widget">
        <Youtube videoId={videoId} opts={opts} onReady={this._onReady} />
      </div>
    );
  }
}

export default MiniYoutube;
