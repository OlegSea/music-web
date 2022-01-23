import '../styles/globals.css';
<<<<<<< HEAD
import { useRef, useEffect, useState } from 'react';
=======
import { useState, useRef, useEffect } from 'react';
>>>>>>> d281f08fbc17296f8becfe0a820cf6c0cbf8a22b
import PlayerContext from '../components/playerContext';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import PCMPlayer from 'pcm-player';

function MyApp({ Component, pageProps }) {
  const player = useRef(null);
<<<<<<< HEAD
  const [isPaused, setIsPaused] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const secondTimer = useRef(null);
  const [wsUrl, setWsUrl] = useState('ws://localhost:8001/');
  const [currentSong, setCurrentSong] = useState({});
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(wsUrl, {
    shouldReconnect: () => {
      return true;
    },
    reconnectInterval: 100,
  });

  const parseNewData = async (lastMessage, player) => {
    const data = new Int16Array(await lastMessage.data.arrayBuffer());
    player.volume(0.25);
    try {
      player.feed(data);
    } catch (error) {}
  };
=======
//   const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8001/');
  const {songData, setSongData} = useState()

//   const fetchData = async (lastMessage, player) => {
//     const data = new Int16Array(await lastMessage.data.arrayBuffer());
//     player.volume(1);
//     player.feed(data);
//   };
>>>>>>> d281f08fbc17296f8becfe0a820cf6c0cbf8a22b

  const initPCM = () => {
    const player = new PCMPlayer({
      encoding: '16bitInt',
      channels: 2,
      sampleRate: 44100,
      flushingTime: 100000,
    });
    return player;
  };

  const startPlaying = (songPath) => {
    setIsPaused(false);
    clearInterval(secondTimer.current);
    setTimeElapsed(0);
    try {
      getWebSocket().close();
    } catch (error) {}
    if (player.current) player.current.destroy();
    player.current = initPCM();
<<<<<<< HEAD
    secondTimer.current = setInterval(() => {
      setTimeElapsed((old) => old + 1);
    }, 1000);
    sendMessage(`play ${songPath}`);
=======
    player.volume(1);
    
    player.feed(songData)
>>>>>>> d281f08fbc17296f8becfe0a820cf6c0cbf8a22b
  };

  const seek = (seconds) => {
    try {
      getWebSocket().close();
    } catch (error) {}
    if (player.current) player.current.destroy();
    player.current = initPCM();
    setTimeElapsed(seconds);
    sendMessage(`seek ${seconds} ${currentSong['song_file_name']}`);
  };

  const pausePlay = () => {
    if (isPaused) {
      player.current.continue();
      secondTimer.current = setInterval(() => {
        setTimeElapsed((old) => old + 1);
      }, 1000);
    } else {
      player.current.pause();
      clearInterval(secondTimer.current);
    }
    console.log(timeElapsed);
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (lastMessage) {
      parseNewData(lastMessage, player.current);
    }
  }, [lastMessage]);

  useEffect(() => {
    setWsUrl(`ws://${/.*:\/\/(.*):.*$/g.exec(window.location.href)[1]}:8001/`);
  }, [setWsUrl]);

  return (
    <PlayerContext.Provider
      value={{
        player: player,
        startPlaying: startPlaying,
        currentSong: currentSong,
        setCurrentSong: setCurrentSong,
        isPaused: isPaused,
        pausePlay: pausePlay,
        seek: seek,
        timeElapsed: timeElapsed,
      }}
    >
      <Component {...pageProps} />
    </PlayerContext.Provider>
  );
}

export default MyApp;
