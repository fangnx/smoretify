/**
 * SongInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-07-28 14:34:55
 */

import React from 'react';
import './SongInfo.css';
import { Container, Image, Header, Transition } from 'semantic-ui-react';
import {
  getSongInfoFromGenius,
  getReferentsBySongFromGenius
} from '../../actions/geniusActions';

class SongLyrics extends React.Component {
  constructor() {
    super();
    this.state = {
      songMainImg: '',
      geniusDescription: '',
      trackInfo: '',
      annotations: [],
      geniusPageUrl: '',
      youtubeUrl: ''
    };
  }

  async getSongInfo() {
    await getSongInfoFromGenius({ songId: 74885 })
      .then(async res => {
        if (res.status === 200) {
          console.log(res);
          const rawDescription = res.data.description.dom.children;
          let pureTextDescription = '';
          // Note: Genius API returns string literal '?' for non-existing description.
          if (rawDescription.length > 0 && rawDescription.indexOf('?') === -1) {
            const flattenDom = arr => {
              const tempArr = arr
                .flat()
                .filter(node => !!node)
                .map(node => {
                  if (node.children) {
                    return node.children;
                  } else {
                    return node;
                  }
                });
              return tempArr.some(e => Array.isArray(e))
                ? flattenDom(tempArr)
                : tempArr;
            };
            pureTextDescription = flattenDom(rawDescription).reduce(
              (str0, str1) => str0 + str1
            );
          }
          // Check if there are available media links.
          let youtubeUrl = '';
          if (res.data.media) {
            res.data.media.forEach(m => {
              if (m.provider === 'youtube') {
                youtubeUrl = m.url;
              }
            });
          }
          // Parse track info (artist relations).
          const trackInfo = this.parseTrackInfo(res.data.custom_performances);

          await this.setState({
            songMainImg: res.data.song_art_image_url,
            geniusDescription: pureTextDescription,
            trackInfo: trackInfo,
            geniusPageUrl: res.data.url,
            youtubeUrl: youtubeUrl
          });
        }
      })
      .catch();
  }

  async getAnnotations() {
    await getReferentsBySongFromGenius({ songId: 74885 })
      .then(async res => {
        if (res.status === 200 && res.data.length > 0) {
          console.log(res);
          const annotations = this.parseReferents(res.data);
          await this.setState({
            annotations: annotations
          });
        }
      })
      .catch();

    // Parse referents info (annotations to the song lyrics).
  }

  parseTrackInfo(rawData) {
    return rawData.map(category => {
      const map = new Map();
      return map.set(category.label, category.artists);
    });
  }

  parseReferents(rawData) {
    return rawData.map(referent => {
      return referent.annotations
        .map(anno => anno.body.html)
        .reduce((html0, html1) => html0 + html1);
    });
  }

  async componentWillMount() {
    await this.getSongInfo();
    await this.getAnnotations();
  }

  render() {
    return (
      <div className="songInfo-panel">
        {/* <Image src={this.state.songMainImg} className="songInfo-topImage" /> */}
        <Container className="songInfo-container description">
          {this.state.geniusDescription}
        </Container>

        <Container className="songInfo-container annotations">aaa</Container>

        <Container className="songInfo-container trackInfo">
          track info goes here
        </Container>
      </div>
    );
  }
}

export default SongLyrics;
