import '../styles/globals.css';
import { useRef, useEffect, useState } from 'react';
import PlayerContext from '../components/playerContext';
import { fetchData } from '../libs/rq';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import PCMPlayer from 'pcm-player';

function MyApp({ Component, pageProps }) {
  const player = useRef(null);
  const [songs, updateSongs] = useState([]);
  const [currentSongList, setCurrentSongList] = useState([]); 
  const currentSongListRef = useRef([]);
  const currentPlaylist = useRef([]);
  const [isPaused, setIsPaused] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timeElapsedRef = useRef(0);
  const secondTimer = useRef(null);
  const [wsUrl, setWsUrl] = useState('ws://localhost:8001/');
  const [currentSong, setCurrentSong] = useState({});
  const currentSongRef = useRef({});
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

  const initPCM = () => {
    const player = new PCMPlayer({
      encoding: '16bitInt',
      channels: 2,
      sampleRate: 44100,
      flushingTime: 100000,
    });
    return player;
  };

  const songSelected = (songPath) => {
    const songListNames = currentSongListRef.current.map((song) => song['song_file_name']);
    currentPlaylist.current = currentSongListRef.current.slice(songListNames.indexOf(songPath));
    console.log(currentPlaylist.current);
    startPlaying(songPath);
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
    secondTimer.current = setInterval(() => {
      setTimeElapsed(timeElapsedRef.current + 1);
      if (timeElapsedRef.current >= currentSongRef.current['length']) {
        nextSong();
      }
    }, 1000);
    sendMessage(`play ${songPath}`);
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
        if (timeElapsedRef.current >= currentSongRef.current['length']) {
          nextSong();
        }
      }, 1000);
    } else {
      player.current.pause();
      clearInterval(secondTimer.current);
    }
    setIsPaused(!isPaused);
  };

  const nextSong = () => {
    currentPlaylist.current = currentPlaylist.current.slice(1);
    setCurrentSong(currentPlaylist.current[0]);
    startPlaying(currentPlaylist.current[0]['song_file_name']);
  };

  useEffect(() => {
    if (lastMessage) {
      parseNewData(lastMessage, player.current);
    }
  }, [lastMessage]);

  useEffect(() => {
    setWsUrl(`ws://${/.*:\/\/(.*):.*$/g.exec(window.location.href)[1]}:8001/`);
  }, [setWsUrl]);

  useEffect(() => {
    fetchData('/api/songs', updateSongs);
  }, []);

  useEffect(() => {
    timeElapsedRef.current = timeElapsed;
    currentSongListRef.current = currentSongList
    currentSongRef.current = currentSong;
  });

  return (
    <PlayerContext.Provider
      value={{
        player: player,
        songs: songs,
        startPlaying: songSelected,
        currentSong: currentSong,
        setCurrentSong: setCurrentSong,
        isPaused: isPaused,
        pausePlay: pausePlay,
        seek: seek,
        timeElapsed: timeElapsed,
        currentSongList: currentSongList,
        setCurrentSongList: setCurrentSongList,
        nextSong: nextSong,
      }}
    >
      <Component {...pageProps} />
    </PlayerContext.Provider>
  );
}

export default MyApp;
