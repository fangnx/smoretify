/**
 * SongInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-08-02 00:33:46
 */

import React from 'react';
import './SongInfo.css';
import { Container, Header, Icon } from 'semantic-ui-react';
import SongLyrics from './SongLyrics/SongLyrics';
import TrackArtistsInfo from './TrackArtistsInfo/TrackArtistsInfo';
import MiniYoutube from './MiniYoutube/MiniYoutube';
import {
  getSongInfoFromGenius,
  getReferentsBySongFromGenius,
  getLyricsFromGenius
} from '../../actions/geniusActions';

class SongInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Tender is the Night',
      songMainImg: '',
      geniusDescription: '',
      trackInfo: [],
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
              (str0, str1) => str0 + ' ' + str1
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
  }

  async getLyrics() {
    await getLyricsFromGenius({
      url:
        'https://genius.com/Arctic-monkeys-i-bet-you-look-good-on-the-dancefloor-lyrics'
    }).then(async res => {});
  }

  parseLyrics(rawLyrics) {
    return rawLyrics.split('\n').filter(line => !!line);
  }

  parseTrackInfo(rawData) {
    return rawData.map(category => {
      return [
        category.label,
        category.artists.map(obj => obj.name).reduce((a0, a1) => a0 + ', ' + a1)
      ];
    });
  }

  parseReferents(rawData) {
    return rawData.map(referent => {
      // For simplicity and display, get the fisrt annotation of a referent.
      const anno = referent.annotations[0];
      const map = new Map();
      return map.set(anno.url, anno.body.html);
    });
  }

  async componentWillMount() {
    await this.getSongInfo();
    await this.getAnnotations();
  }

  render() {
    return (
      <div className="songInfo-panel">
        <MiniYoutube />
        {/* <Image src={this.state.songMainImg} className="songInfo-topImage" /> */}
        <Container className="songInfo-container title">
          <Header as="h1" className="songInfo-title">
            {this.state.title}
          </Header>
        </Container>

        <Container className="songInfo-container lyrics">
          <SongLyrics />
        </Container>

        <Container className="songInfo-container description">
          {this.state.geniusDescription}
        </Container>

        <Container className="songInfo-container annotations" />

        <Container className="songInfo-container trackInfo">
          <Header as="h2" className="songInfo-title">
            Track Info
          </Header>
          <TrackArtistsInfo data={this.state.trackInfo} />
        </Container>
      </div>
    );
  }
}

export default SongInfo;
