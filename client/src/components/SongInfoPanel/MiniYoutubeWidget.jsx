/**
 * MiniYoutube.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-28 17:27:18
 * @last-modified 2019-08-31 17:09:03
 */

import React from 'react';
import { getYoutubeVideoID } from '../../utils/parseMediaInfo';
import { Embed } from 'semantic-ui-react';

class MiniYoutubeWidget extends React.Component {
  render() {
    const videoId = getYoutubeVideoID(this.props.url);

    return (
      <div className="miniYoutubeWidget">
        {/* <Youtube videoId={videoId} opts={opts} onReady={this._onReady} /> */}
        <Embed
          id={videoId}
          aspectRatio="16:9"
          autoplay="false"
          brandedUI
          hd
          source="youtube"
        />
      </div>
    );
  }
}

export default MiniYoutubeWidget;
