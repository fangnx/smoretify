/**
 * MiniYoutube.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-28 17:27:18
 * @last-modified 2019-08-21 23:54:21
 */

import React from 'react';
import './MiniYoutube.css';
import { Embed } from 'semantic-ui-react';
import { getYoutubeVideoID } from '../../../utils/commonUtils';

class MiniYoutube extends React.Component {
  render() {
    const videoId = getYoutubeVideoID(this.props.url);

    return (
      <div className="miniYoutube-widget">
        {/* <Youtube videoId={videoId} opts={opts} onReady={this._onReady} /> */}
        <Embed
          id={videoId}
          aspectRatio="16:9"
          autoplay="false"
          brandedUI
          // placeholder="/images/image-16by9.png"
          hd
          source="youtube"
        />
      </div>
    );
  }
}

export default MiniYoutube;
