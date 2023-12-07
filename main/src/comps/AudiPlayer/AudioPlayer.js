import React, { Component } from "react";
import "./defaults.css";
import ReactPlayer from "react-player";
import { styled } from '@mui/material';
import { Box } from '@mui/system';

import Mics from "../Mics";
import speaker1 from '../../media/speaker1.gif';
import speakerCircle from '../../media/speakercircle.gif';
import speakerAnim from '../../media/speakeranim.gif';

function format(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string) {
  return ("0" + string).slice(-2);
}

function isValidHttpUrl(string) {
  if (string?.includes("http")) {
    return string;
  }
  return null;
}


const MicsWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgb(7, 10, 23)',
  height: '66px',
  width: '100%',
  padding: '1.4rem 1.4rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Speaker = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& img': {
     height: '45px',
     width: '45px',
     marginRight: '1rem',
     '&:last-child': {
        marginRight: 0,
     },
  },
}));

const CircleGif = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
}));

const MiddleSpeaker = styled(Box)(({ theme }) => ({
  flex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
     height: '52px',
     width: '79px',
  },
}));


class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.setState({ songs: this.props.songs, songIndex: 0 });
  }
  state = {
    url: null,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    songs: this.props.songs,
    songIndex: 0,
    showVideo:false
  };

  componentDidMount() {
    var that = this;
    document
      .querySelector(".aplayer-bar-wrap")
      .addEventListener("click", function (e) {
        var position = e.clientX - this.getBoundingClientRect().left;
        var total = this.getBoundingClientRect().width;
        let seekAt = position / total;
        that.setState({ seeking: true });
        that.player.seekTo(parseFloat(seekAt));
        that.setState({ seeking: false });
      });
  }
  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handlePlayPause = () => {
    this.setState((prevstate) => ({ playing: !prevstate.playing }));
  };

  handleStop = () => {
    this.setState({ url: null, playing: false });
  };

  handleToggleControls = () => {
    const url = this.state.url;
    this.setState(
      {
        controls: !this.state.controls,
        url: null,
      },
      () => this.load(url)
    );
  };

  handleToggleLight = () => {
    this.setState({ light: !this.state.light });
  };

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleSetPlaybackRate = (e) => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };

  handleOnPlaybackRateChange = (speed) => {
    this.setState({ playbackRate: parseFloat(speed) });
  };

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };

  handlePlay = () => {
    
    //let activePlayer = this.player.getActivePlayer?this.player.getActivePlayer():null;
    this.setState({ playing: true });
    let isYoutube = this.state.songs[this.state.songIndex].externalSourceUrl.includes("youtube");
    this.setState({ showVideo: isYoutube });      

  };

  handleEnablePIP = () => {

    this.setState({ pip: true });
  };

  handleDisablePIP = () => {

    this.setState({ pip: false });
  };

  handlePause = () => {

    this.setState({ playing: false });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {

    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleEnded = () => {
    
    if (this.state.songIndex == this.state.songs.length - 1) {
      this.setState({ songIndex: 0 });
      
      let isYoutube = this.state.songs[0].externalSourceUrl.includes("youtube");
      this.setState({ showVideo: isYoutube });  

      return;
    }
    this.setState({ songIndex: this.state.songIndex + 1 });
    setTimeout(() => {
      if (!this.state.playing) {
        console.log("this.state.showVideo")

        let btn = document.querySelector('.aplayer-play')
        if (btn) {
          btn.click()
        }

      }
    }, [1000])

    let isYoutube = this.state.songs[this.state.songIndex+1].externalSourceUrl.includes("youtube");
    this.setState({ showVideo: isYoutube });    

  };

  handleDuration = (duration) => {
    this.setState({ duration });
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;
    const SEPARATOR = " · ";

    if (!this.state.songs[this.state.songIndex]) {
      return <></>;
    }
    return (
      <div className="app">
        <section className="section">
          <div className="player-wrapper">
          <MicsWrapper >
            <Speaker>
               <Box sx={{ position: 'relative' }}>
                  <img src={speaker1} alt='' />
                  <CircleGif src={speakerCircle} alt='' />
               </Box>
               <Box sx={{ position: 'relative' }}>
                  <CircleGif src={speakerCircle} alt='' />
                  <img src={speaker1} alt='' />
               </Box>
            </Speaker>
            <MiddleSpeaker>
               <img src={speakerAnim}   alt='' />
            </MiddleSpeaker>
            <Speaker>
               <Box sx={{ position: 'relative' }}>
                  <img src={speaker1} alt='' />
                  <CircleGif src={speakerCircle} alt='' />
               </Box>
               <Box sx={{ position: 'relative' }}>
                  <CircleGif src={speakerCircle} alt='' />
                  <img src={speaker1} alt='' />
               </Box>
            </Speaker>
         </MicsWrapper>
          {!this.state.showVideo && (<Mics />)}
           <ReactPlayer
              ref={this.ref}
              className="react-player"
              width= {this.state.showVideo ?"100%":"0px"}
              height={this.state.showVideo ?"calc((100vh - 100px) *1.15)":"0px"}
              config={{
                youtube: {
                  playerVars: { showinfo: 0, controls :0 , rel:0, modestbranding:1, fs:0, disablekb:1}
                }
              }}
              url={
                isValidHttpUrl(
                  this.state.songs[this.state.songIndex].externalSourceUrl
                ) ||
                isValidHttpUrl(this.state.songs[this.state.songIndex].audioTrack[0].downloadUrl)
              }
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => this.handlePlay}
              onStart={this.handlePlay}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              //onBuffer={() => console.log("onBuffer")}
              onPlaybackRateChange={this.handleOnPlaybackRateChange}
              //onSeek={(e) => console.log("onSeek", e)}
              onEnded={this.handleEnded}
              onError={this.handleEnded}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}

            />

          </div>
        </section>
        <div style={{ display: "block" }}>
          <div className="aplayer aplayer-withlist">
            <div className="aplayer-body">
              <div
                className="aplayer-pic"
                style={{
                  backgroundImage: `url(
                   ${this.state.songs[this.state.songIndex].cover[0].downloadUrl}
                  )`,
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              >
                {!playing ? (
                  <div
                    onClick={this.handlePlayPause}
                    className="aplayer-button aplayer-play"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 16 31"
                    >
                      <path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path>
                    </svg>
                  </div>
                ) : (
                  <div
                    onClick={this.handlePlayPause}
                    className="aplayer-button aplayer-pause"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 17 32"
                    >
                      <path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path>
                    </svg>
                  </div>
                )}
              </div>
              <div className="aplayer-info">
                <div className="aplayer-music">
                  <span className="aplayer-title">
                    {this.state.songs[this.state.songIndex].trackName}
                  </span>
                  <span className="aplayer-author">
                    {" "}
                    - {this.state.songs[this.state.songIndex].artist}
                  </span>
                </div>
                <div className="aplayer-lrc">
                  <div
                    className="aplayer-lrc-contents"
                  // style="transform: translateY(0); -webkit-transform: translateY(0);"
                  ></div>
                </div>
                <div className="aplayer-controller">
                  <div className="aplayer-bar-wrap">
                    <div className="aplayer-bar">
                      <div className="aplayer-loaded" style={{ width: "0%" }}></div>
                      <div
                        className="aplayer-played"
                        style={{
                          width: played * 100 + "%",
                          background: "rgb(255, 255, 255)",
                        }}
                      >
                        <span
                          className="aplayer-thumb"
                          style={{ background: "#FFF" }}
                        >
                          <span className="aplayer-loading-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 32 32"
                            >
                              <path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z"></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="aplayer-time">
                    <span className="aplayer-time-inner">
                      <span className="aplayer-ptime">
                        {format(duration * played)}
                      </span>{" "}
                      / <span className="aplayer-dtime">{format(duration)}</span>
                    </span>
                    <span className="aplayer-icon aplayer-icon-back">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 32 32"
                      >
                        <path d="M25.468 6.947c-0.326-0.172-0.724-0.151-1.030 0.057l-6.438 4.38v-3.553c0-0.371-0.205-0.71-0.532-0.884-0.326-0.172-0.724-0.151-1.030 0.057l-12 8.164c-0.274 0.186-0.438 0.496-0.438 0.827s0.164 0.641 0.438 0.827l12 8.168c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-3.556l6.438 4.382c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-16.333c0-0.371-0.205-0.71-0.532-0.884z"></path>
                      </svg>
                    </span>
                    <span className="aplayer-icon aplayer-icon-play">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 16 31"
                      >
                        <path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path>
                      </svg>
                    </span>
                    <span className="aplayer-icon aplayer-icon-forward">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 32 32"
                      >
                        <path d="M25.468 6.947c-0.326-0.172-0.724-0.151-1.030 0.057l-6.438 4.38v-3.553c0-0.371-0.205-0.71-0.532-0.884-0.326-0.172-0.724-0.151-1.030 0.057l-12 8.164c-0.274 0.186-0.438 0.496-0.438 0.827s0.164 0.641 0.438 0.827l12 8.168c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-3.556l6.438 4.382c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-16.333c0-0.371-0.205-0.71-0.532-0.884z"></path>
                      </svg>
                    </span>
                    <div className="aplayer-volume-wrap">
                      <button
                        type="button"
                        className="aplayer-icon aplayer-icon-volume-down"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 28 32"
                        >
                          <path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z"></path>
                        </svg>
                      </button>
                      <div className="aplayer-volume-bar-wrap">
                        <div className="aplayer-volume-bar">
                          <div
                            className="aplayer-volume"
                            style={{
                              height: "100%",
                              background: "rgb(255, 255, 255)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="aplayer-icon aplayer-icon-order"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 32 32"
                      >
                        <path d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="aplayer-icon aplayer-icon-loop"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 29 32"
                      >
                        <path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="aplayer-icon aplayer-icon-menu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 22 32"
                      >
                        <path d="M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z"></path>
                      </svg>
                    </button>
                    <button type="button" className="aplayer-icon aplayer-icon-lrc">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 32 32"
                      >
                        <path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="aplayer-miniswitcher">
                <button className="aplayer-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 32 32"
                  >
                    <path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="aplayer-list aplayer-list-hide"
              style={{ maxHeight: 250 }}
            >
              <ol style={{ maxHeight: 250 }}>
                <li className="">
                  <span
                    className="aplayer-list-cur"
                    style={{ backgroundColor: "#FFF" }}
                  ></span>
                  <span className="aplayer-list-index">1</span>
                  <span className="aplayer-list-title">Ummon Hiyonat</span>
                  <span className="aplayer-list-author">Test Track</span>
                </li>

                <li className="aplayer-list-light">
                  <span
                    className="aplayer-list-cur"
                    style={{ backgroundColor: "#FFF" }}
                  ></span>
                  <span className="aplayer-list-index">2</span>
                  <span className="aplayer-list-title">La Afraye</span>
                  <span className="aplayer-list-author">Unknown</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
