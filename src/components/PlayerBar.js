import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" id="previous" onClick={this.props.handlePrevClick}>
            <i className="material-icons">skip_previous</i>
          </button>
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" id="play-pause" onClick={this.props.handleSongClick} >
            <i className="material-icons">{this.props.isPlaying ? "pause" : "play_arrow"}</i>
          </button>
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" id="next" onClick={this.props.handleNextClick} >
            <i className="material-icons">skip_next</i>
          </button>
          <br /><br />
        </section>
        <section id="time-control">
          <div className="current-time">{this.props.formatTime(this.props.currentTime)}  &nbsp;/&nbsp; {this.props.formatTime(this.props.duration)}</div>
          <p style={{width:300}}>
          <input
            className="mdl-slider mdl-js-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={(this.props.currentTime / this.props.duration) || 0 }
            onChange={this.props.handleTimeChange}
          />
          </p>
          <div className="volume">{Math.round((this.props.volume) * 100)}</div>
        </section>
        <section id="volume-control">
          <p style={{width:300}}>
          <input
            className="mdl-slider mdl-js-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={this.props.volume}
            onChange={this.props.handleVolumeChange}
          />
          </p>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
