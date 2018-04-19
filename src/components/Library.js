import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
      this.state = { albums: albumData };
  }

  render () {
    return (
      <table className="mdl-data-table mdl-js-data-table">
        <tbody>
          {
            this.state.albums.map( (album, index) =>
              <tr key={index}>
                <td className="mdl-data-table__cell--non-numeric">
                  <Link to={`/album/${album.slug}`} key={index}>
                  <img src={album.albumCover} alt={album.title} />
                  </Link>
                    <h1 className="mdl-card__supporting-text"><strong>{album.title}</strong><br />
                      {album.artist}<br />
                      {album.songs.length} songs<br />
                    </h1>
                </td>
              </tr>
              )
            }
        </tbody>
      </table>
    );
  }
}

export default Library;
