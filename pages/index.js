import { useEffect, useState } from 'react';
import { fetchData } from '../libs/rq';
import { useContext } from 'react';
import PlayerContext from '../components/playerContext';
import SideBar from '../components/sideBar';
import Layout from '../components/layout';

export default function Home() {
  const [songs, updateSongs] = useState([]);
  const { startPlaying, currentSong, setCurrentSong } = useContext(PlayerContext);

  useEffect(() => {
    fetchData('/api/songs', updateSongs);
  }, []);

  return (
    <Layout currentPage={'All Songs'}>
      <p>{currentSong['song_file_name']}</p>
      <ul>
        {songs.map((song) => {
          return (
            <li key={song['song_id']}>
              <button
                onClick={() => {
                  setCurrentSong(song);
                  startPlaying(song['song_file_name']);
                }}
              >
                {song['song_name']}
              </button>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
