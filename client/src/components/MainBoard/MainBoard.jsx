/**
 * MainBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 20:36:15
 * @last-modified 2019-08-10 21:53:08
 */

import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import './MainBoard.css';
import CurrentSong from '../CurrentSong/CurrentSong';
import SongInfo from '../SongInfo/SongInfo';
import ArtistInfo from '../ArtistInfo/ArtistInfo';
import {
  getSongInfoFromGenius,
  getReferentsBySongFromGenius
} from '../../actions/geniusActions';

class MainBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Tender is the Night',
      geniusDescription: '',
      geniusTrackInfo: [],
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
            geniusDescription: pureTextDescription,
            geniusTrackInfo: trackInfo,
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
      <div className="mainBoard">
        <div className="mainBoard-scrollable">
          <Grid columns={3} className="mainBoard-grid">
            <Grid.Column width={4} className="panel mainBoard-left">
              <CurrentSong
                description={this.state.geniusDescription}
                trackInfo={this.state.geniusTrackInfo}
              />
            </Grid.Column>
            <Grid.Column width={8} className="panel mainBoard-mid">
              <SongInfo
                description={this.state.geniusDescription}
                url={this.state.geniusPageUrl}
              />
            </Grid.Column>
            <Grid.Column width={4} className="panel mainBoard-right">
              <ArtistInfo />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default MainBoard;
