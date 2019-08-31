/**
 * ArtistInfoPanelContainer.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 15:10:48
 * @last-modified 2019-08-31 17:53:33
 */

import React from 'react';
import { connect } from 'react-redux';
import withScrollbar from '../Scrollbar/Scrollbar';
import { getArtistInfoFromGenius } from '../../api/geniusActions';
import ArtistInfoPanel from './ArtistInfoPanel';

class ArtistInfoPanelContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '\u00a0',
      altNames: [],
      mainImg: '',
      summary: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: '',
      isReady: false
    };
  }

  async getArtistInfo(artistId) {
    await getArtistInfoFromGenius({ artistId })
      .then(async res => {
        if (res.status === 200) {
          await this.setState({
            name: res.data.name,
            altNames: res.data.alternate_names,
            mainImg: res.data.image_url,
            summary: res.data.description.html,
            facebookName: res.data.facebook_name,
            twitterName: res.data.twitterName,
            insName: res.data.instagram_name,
            isReady: true
          });
        }
      })
      .catch(err => console.log(err));
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.artistId !== this.props.artistId) {
      this.setState({ isReady: false });
      if (nextProps.artistId >= 0) {
        await this.getArtistInfo(nextProps.artistId);
      }
    }
  }

  render() {
    let summary = this.state.summary;
    if (summary.match(/<p>(\?)<\/p>/g)) {
      summary = '<p>No artist info available.</p>';
    }
    const fillArr = new Array(20).fill(0);

    return (
      <ArtistInfoPanel
        fillArr={fillArr}
        isReady
        mainImage={this.state.mainImg}
        name={this.state.name}
        summary={summary}
      ></ArtistInfoPanel>
    );
  }
}

const mapStateToProps = state => {
  const { geniusInfo } = state;
  return {
    artistId: geniusInfo.primaryArtistId
  };
};

ArtistInfoPanelContainer = withScrollbar(ArtistInfoPanelContainer);

export default connect(
  mapStateToProps,
  null
)(ArtistInfoPanelContainer);
