/**
 * TrackArtistsInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-28 15:57:18
 * @last-modified 2019-08-04 00:50:24
 */

import React from 'react';
import './TrackArtistsInfo.css';
import { Table, Label } from 'semantic-ui-react';

class TrackArtistsInfo extends React.Component {
  componentWillReceiveProps() {}

  render() {
    return (
      <div className="trackArtistsInfo-widget">
        <Table compact inverted>
          <Table.Body>
            {this.props.data.map((row, index) => (
              <Table.Row>
                <Table.Cell className="name-cell">
                  {/* <Label
                    className={
                      index % 2 === 0 ? 'category-label-0' : 'category-label-1'
                    }
                  >
                    {row[0]}
                  </Label> */}
                  {row[0]}
                </Table.Cell>
                <Table.Cell className="name-cell">{row[1]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default TrackArtistsInfo;
