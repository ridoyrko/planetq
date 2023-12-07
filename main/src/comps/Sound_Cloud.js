import React, { useState, useEffect, createRef } from "react";
//import './App.css';

import loadscript from "load-script";
import { Deblur, Margin } from "@mui/icons-material";
import { purple } from "@mui/material/colors";

// SoundCloud widget API
//  https://developers.soundcloud.com/docs/api/html5-widget

function Sound_Cloud(props) {
  // state

  // used to communicate between SC widget and React

  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundCover, setBackgroundCover] = useState("");
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [player, setPlayer] = useState(false);
  const iframeRef = createRef();

  // integration - update SC player based on new state (e.g. play button in React section was click)

  // adjust playback in SC player to match isPlaying state

  const playToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ display: "block" }}>
      <div class="aplayer aplayer-withlist">
        <div class="aplayer-body">
          <div
            class="aplayer-pic"
            // style='background-image: url("https://api.planetqproductions.com/storage/uploads/files/verum.jpeg"); background-color: rgb(255, 255, 255);'
          >
            <div class="aplayer-button aplayer-play">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 16 31"
              >
                <path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path>
              </svg>
            </div>

            <div class="aplayer-button aplayer-pause">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 17 32"
              >
                <path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path>
              </svg>
            </div>
          </div>
          <div class="aplayer-info">
            <div class="aplayer-music">
              <span class="aplayer-title">La Afraye</span>
              <span class="aplayer-author"> - Unknown</span>
            </div>
            <div class="aplayer-lrc">
              <div
                class="aplayer-lrc-contents"
                // style="transform: translateY(0); -webkit-transform: translateY(0);"
              ></div>
            </div>
            <div class="aplayer-controller">
              <div class="aplayer-bar-wrap">
                <div class="aplayer-bar">
                  <div class="aplayer-loaded" style={{ width: "0%" }}></div>
                  <div
                    class="aplayer-played"
                    style={{
                      width: "30.2742%",
                      background: "rgb(255, 255, 255)",
                    }}
                  >
                    <span class="aplayer-thumb" style={{ background: "#FFF" }}>
                      <span class="aplayer-loading-icon">
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
              <div class="aplayer-time">
                <span class="aplayer-time-inner">
                  <span class="aplayer-ptime">00:00</span> /{" "}
                  <span class="aplayer-dtime">00:00</span>
                </span>
                <span class="aplayer-icon aplayer-icon-back">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 32 32"
                  >
                    <path d="M25.468 6.947c-0.326-0.172-0.724-0.151-1.030 0.057l-6.438 4.38v-3.553c0-0.371-0.205-0.71-0.532-0.884-0.326-0.172-0.724-0.151-1.030 0.057l-12 8.164c-0.274 0.186-0.438 0.496-0.438 0.827s0.164 0.641 0.438 0.827l12 8.168c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-3.556l6.438 4.382c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-16.333c0-0.371-0.205-0.71-0.532-0.884z"></path>
                  </svg>
                </span>
                <span class="aplayer-icon aplayer-icon-play">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 16 31"
                  >
                    <path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path>
                  </svg>
                </span>
                <span class="aplayer-icon aplayer-icon-forward">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 32 32"
                  >
                    <path d="M25.468 6.947c-0.326-0.172-0.724-0.151-1.030 0.057l-6.438 4.38v-3.553c0-0.371-0.205-0.71-0.532-0.884-0.326-0.172-0.724-0.151-1.030 0.057l-12 8.164c-0.274 0.186-0.438 0.496-0.438 0.827s0.164 0.641 0.438 0.827l12 8.168c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-3.556l6.438 4.382c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-16.333c0-0.371-0.205-0.71-0.532-0.884z"></path>
                  </svg>
                </span>
                <div class="aplayer-volume-wrap">
                  <button
                    type="button"
                    class="aplayer-icon aplayer-icon-volume-down"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 28 32"
                    >
                      <path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z"></path>
                    </svg>
                  </button>
                  <div class="aplayer-volume-bar-wrap">
                    <div class="aplayer-volume-bar">
                      <div
                        class="aplayer-volume"
                        style={{
                          height: "100%",
                          background: "rgb(255, 255, 255)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button type="button" class="aplayer-icon aplayer-icon-order">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 32 32"
                  >
                    <path d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"></path>
                  </svg>
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-loop">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 29 32"
                  >
                    <path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333z"></path>
                  </svg>
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-menu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 22 32"
                  >
                    <path d="M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z"></path>
                  </svg>
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-lrc">
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

          <div class="aplayer-miniswitcher">
            <button class="aplayer-icon">
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
        <div class="aplayer-list aplayer-list-hide" style={{ maxHeight: 250 }}>
          <ol style={{ maxHeight: 250 }}>
            <li class="">
              <span
                class="aplayer-list-cur"
                style={{ backgroundColor: "#FFF" }}
              ></span>
              <span class="aplayer-list-index">1</span>
              <span class="aplayer-list-title">Ummon Hiyonat</span>
              <span class="aplayer-list-author">Test Track</span>
            </li>

            <li class="aplayer-list-light">
              <span
                class="aplayer-list-cur"
                style={{ backgroundColor: "#FFF" }}
              ></span>
              <span class="aplayer-list-index">2</span>
              <span class="aplayer-list-title">La Afraye</span>
              <span class="aplayer-list-author">Unknown</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
export default Sound_Cloud;
