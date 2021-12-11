import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Player from '../components/player';
import { fetchData } from '../libs/rq';

export default function Home() {
  const [currentSong, setCurrentSong] = useState('')
  const [songs, updateSongs] = useState([])

  useEffect(() => {
    fetchData('/api/songs', updateSongs)
  }, [])

  return (
    <div>
      <Player songPath={currentSong}/>
      <p>{currentSong}</p>
      <ul>
        {songs.map((song) => {
          return (<li key={song['song_id']}><button onClick={() => setCurrentSong(song['song_file_name'])}>{song['song_name']}</button></li>)
        })}
      </ul>
    </div>
  );
}
