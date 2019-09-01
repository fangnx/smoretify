/**
 * MainBoardContainer.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 20:36:15
 * @last-modified 2019-08-31 21:06:32
 */

import React from 'react';
import { connect } from 'react-redux';
import {
  searchFromGenius,
  getSongInfoFromGenius,
  getReferentsBySongFromGenius
} from '../../api/geniusAPI';
import MainBoard from './MainBoard';
import './MainBoard.css';

class MainBoardContainer extends React.Component {
  /**
   * Search for the currently played track from the Genius web API.
   * @param {*} song - name of the currently played track.
   * @param {*} artists - names of the artists of the currently played track.
   * @returns The top matched search result (the most likely track match).
   */
  async searchForCurrentTrack(song, artists) {
    // Search term: song + primary artist name.
    // This is tested to yield the most accurate result.
    const searchTerm = `${song} ${artists[0]}`;
    return await searchFromGenius({ searchTerm }).then(async res => {
      if (res && res.status === 200 && res.data.length > 0) {
        const withMatchedName = res.data.filter(
          songRes => songRes.result.title === song
        );

        if (withMatchedName.length === 1) {
          return withMatchedName[0].result;
        } else if (withMatchedName.length > 1) {
          const withMatchedArtist = withMatchedName.filter(
            songRes => artists.indexOf(songRes.result.primary_artist.name) >= 0
          );
          return withMatchedArtist.length > 0
            ? withMatchedArtist[0].result
            : withMatchedName[0].result;
        }
      }
      return {};
    });
  }

  /**
   * Get the track info from a Genius search result.
   *
   * Dispatch `UPDATE_GENIUS_INFO` event to update the global track info.
   */
  async getTrackInfo(trimmedSongName, artists) {
    const song = await this.searchForCurrentTrack(trimmedSongName, artists);
    // If there is no matched result from Genius,
    // fire `UPDATE_GENIUS_INFO` action to signal unavailability.
    if (Object.keys(song).length === 0) {
      this.props.dispatch({
        type: 'UPDATE_GENIUS_INFO',
        payload: {
          primaryArtistId: -404,
          songSummary: '_',
          songLyricsUrl: '_'
        }
      });
      return;
    }
    await getSongInfoFromGenius({ songId: song.id })
      .then(async res => {
        if (res.status === 200) {
          // Check if there are available media links.
          let youtubeUrl = '';
          if (res.data.media) {
            res.data.media.forEach(m => {
              if (m.provider === 'youtube') {
                youtubeUrl = m.url;
              }
            });
          }

          this.props.dispatch({
            type: 'UPDATE_GENIUS_INFO',
            payload: {
              songSummary: res.data.description.html,
              songLyricsUrl: res.data.url,
              trackPerformers: this.parseTrackInfo(
                res.data.custom_performances
              ),
              primaryArtistId: song.primary_artist.id,
              youtubeUrl
            }
          });
        }
      })
      .catch();
  }

  /**
   * Parse the track performers data
   * @param {*} rawData raw track performers data.
   * @returns Array of [performer role, performer name] pairs.
   */
  parseTrackInfo(rawData) {
    return rawData.map(category => {
      return [
        category.label,
        category.artists.map(obj => obj.name).reduce((a0, a1) => a0 + ', ' + a1)
      ];
    });
  }

  /**
   * TODO
   */
  async getAnnotations() {
    await getReferentsBySongFromGenius({ songId: 74885 })
      .then(async res => {
        if (res.status === 200 && res.data.length > 0) {
          const annotations = this.parseReferents(res.data);
          await this.setState({
            annotations: annotations
          });
        }
      })
      .catch();
  }

  parseReferents(rawData) {
    return rawData.map(referent => {
      // For simplicity and display, get the first annotation of a referent.
      const anno = referent.annotations[0];
      const map = new Map();
      return map.set(anno.url, anno.body.html);
    });
  }

  async componentWillReceiveProps(nextProps) {
    await this.getTrackInfo(nextProps.trimmedSongName, nextProps.artistNames);
  }

  render() {
    return <MainBoard />;
  }
}

const mapStateToProps = state => {
  const { songInfo } = state;
  return {
    songName: songInfo.currentSongName,
    trimmedSongName: songInfo.trimmedCurrentSongName,
    artistNames: songInfo.currentArtists
  };
};

export default connect(
  mapStateToProps,
  null
)(MainBoardContainer);
