import '../styles/globals.css';
import { useRef, useEffect } from 'react';
import PlayerContext from '../components/playerContext';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import PCMPlayer from 'pcm-player';

function MyApp({ Component, pageProps }) {
    const player = useRef(null);
    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8001/');

    const fetchData = async (lastMessage, player) => {
        const data = new Int16Array(await lastMessage.data.arrayBuffer());
        if (player.samples) {
            player.volume(1);
            player.feed(data);
        }
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

    const startPlaying = async (songPath) => {
        if (player.current) {
            player.current.pause();
            await player.current.destroy();
            console.log(player.current);
        }
        player.current = initPCM();
        sendMessage(`play ${songPath}`);
    };
    const seek = (percentage) => {
        if (player.current) player.current.destroy();
        player.current = initPCM();
        sendMessage(`seek ${percentage}`);
    };

    useEffect(() => {
        if (lastMessage) {
            fetchData(lastMessage, player.current);
        }
    }, [lastMessage]);

    return (
        <PlayerContext.Provider value={{ player: player.current, startPlaying: startPlaying, seek: seek }}>
            <Component {...pageProps} />
        </PlayerContext.Provider>
    );
}

export default MyApp;
