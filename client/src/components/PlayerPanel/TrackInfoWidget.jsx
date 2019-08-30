/**
 * TrackArtistsInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-28 15:57:18
 * @last-modified 2019-08-28 14:51:34
 */

import React from 'react';
import { Table } from 'semantic-ui-react';

class TrackInfoWidget extends React.Component {
  componentWillReceiveProps() {}

  render() {
    return (
      <div className="trackInfoWidget">
        <Table compact inverted>
          <Table.Body>
            {this.props.data.map((row, index) => (
              <Table.Row
                key={`trackArtistsInfo-row-${index}`}
                className={index % 2 === 0 ? 'row-0' : 'row-1'}
              >
                <Table.Cell className="label-cell">{row[0]}</Table.Cell>
                <Table.Cell className="name-cell">{row[1]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default TrackInfoWidget;
