import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      volume: '.8',
      isHovered: false,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },

      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }

    };

    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }



  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  formatTime(time) {
    return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2,3)}` : '-:--';
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  render() {
    return (
      <section className="album" id="album-info">
        <img id="album-cover-art" src={this.state.album.albumCover} alt="" />
          <h1 className="mdl-card__supporting-text"><strong>{this.state.album.title}</strong><br />
            {this.state.album.artist}<br />
            {this.state.album.releaseInfo}<br />
          </h1>
        <table id="song-list" className="mdl-data-table mdl-js-data-table" style={{width:300}}>
          <tbody>
            {this.state.album.songs.map( (song, index) =>
            <tr key={index} onClick={()=>this.handleSongClick(song)} onMouseEnter={() => this.setState({isHovered: index +1})} onMouseLeave={() => this.setState({isHovered: false })}>
              <td className="mdl-data-table__cell--non-numeric">

              <button className="mdl-button mdl-js-button mdl-button--primary">
                {(this.state.isPlaying) ?
                 <div> {(this.state.currentSong.title === song.title) ?
                 <i className="material-icons">pause</i> : (index + 1)}</div>
                :
                 (this.state.isHovered === index+1) ?
                     <i className="material-icons">play_arrow</i> : (index + 1)
                }
                </button>

              </td>
              <td className="mdl-data-table__cell--non-numeric mdl-card__supporting-text">{song.title}</td>
              <td className="mdl-data-table__cell--non-numeric mdl-card__supporting-text">{this.formatTime(song.duration)}</td>
            </tr>
            )}
          </tbody>
        </table>
        <br />
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.state.duration}
          volume={this.state.volume}
          formatTime={(t) => this.formatTime(t)}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}

export default Album;
