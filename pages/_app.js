import '../styles/globals.css';
import { useState, useRef, useEffect } from 'react';
import PlayerContext from '../components/playerContext';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import PCMPlayer from 'pcm-player';


function MyApp({ Component, pageProps }) {
  const player = useRef(null);
//   const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8001/');
  const {songData, setSongData} = useState()

//   const fetchData = async (lastMessage, player) => {
//     const data = new Int16Array(await lastMessage.data.arrayBuffer());
//     player.volume(1);
//     player.feed(data);
//   };

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
    if (player.current) player.current.destroy();
    console.log(player.current)
    player.current = initPCM();
    player.volume(1);
    
    player.feed(songData)
  };

  useEffect(() => {
    if (lastMessage) {
      fetchData(lastMessage, player.current);
    }
  }, [lastMessage]);

  return (
    <PlayerContext.Provider value={{ player: player, startPlaying: startPlaying }}>
      <Component {...pageProps} />
    </PlayerContext.Provider>
  );
}

export default MyApp;
