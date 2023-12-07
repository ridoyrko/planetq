import React, { useState, useEffect, createRef } from "react";
import Header from "./Header";
import Mics from "./Mics";
import { Box, Container, Hidden } from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";
import AudioPlayer from "./AudiPlayer/AudioPlayer";
import Sound_Cloud from "./Sound_Cloud";
//randomizing or shuffling
function shuffleFisherYates(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

const Layout = ({ children }) => {
  const [soundCloudAudio, setSoundCloudAudio] = useState({
    audio: null,
    trackID: null,
  });

  const [songs, setSongs] = useState([]);

  /// Fetch Playlist from API
  const getAudioList = () => {
    axios
      .get("https://planetqproductions.com/api/radioList")
      .then((response) => {

       
        //let YoutubeSongs = response.data.filter(x=>x.externalSourceUrl?x.externalSourceUrl.includes("youtube"):false);
       

        //https://soundcloud.com/planet-q-productions/game-head-by-yolo-planet-q-productions
        //https://admin.planetqproductions.com/api/file/download?privateUrl=tenant/d0f9a876-c53d-49f2-9894-d4430cd3fc6a/musicTrack/audioTrack/1f62bbb5-6cb2-4c65-b7cb-08d249166aea.mp3
        // let i=0;
        // YoutubeSongs.forEach(element => {
        //     i++;
        //     if (i%2===0){
        //     element.externalSourceUrl = 'https://www.youtube.com/watch?v=pRpeEdMmmQ0'}
        //     else {element.externalSourceUrl = 'https://soundcloud.com/planet-q-productions/game-head-by-yolo-planet-q-productions'}
        //  });
        
        //setSongs(shuffleFisherYates(response.data));
        setSongs(shuffleFisherYates(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // To Fetch and Start the Playlist
  useEffect(() => {
    getAudioList();
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Header />
        
        <Box sx={{ width: "100%" }}>
          <div style={{ display:  "block" }}>
            {songs?.length && <AudioPlayer songs={songs} />}
          </div>         
        </Box>
        {children}
      </Container>
    </>
  );
};

export default Layout;
