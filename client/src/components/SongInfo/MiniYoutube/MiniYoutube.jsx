/**
 * MiniYoutube.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-28 17:27:18
 * @last-modified 2019-07-28 17:40:00
 */

import React from 'react';
import Youtube from 'react-youtube';
import { Label } from 'semantic-ui-react';

class MiniYoutube extends React.Component {
  componentWillReceiveProps() {}

  render() {
    const opts = {
      height: '250',
      width: '400',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <div className="miniYoutube-widget">
        <Youtube videoId="NMD0XB2XfLM" opts={opts} onReady={this._onReady} />
      </div>
    );
  }
}

export default MiniYoutube;
