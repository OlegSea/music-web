import { useContext } from 'react';
import { useEffect } from 'react';
import PlayerContext from './playerContext';

export default function SongList({ filter }) {
  const { currentSongList, setCurrentSongList, songs, currentSong, setCurrentSong, startPlaying } =
    useContext(PlayerContext);

  const sorter = (sortCriteria) => {
    setCurrentSongList(
      [...songs.filter(filter)].sort((a, b) => {
        if (typeof a[sortCriteria] === 'string') {
          return a[sortCriteria].localeCompare(b[sortCriteria]);
        } else {
          return a[sortCriteria] - b[sortCriteria];
        }
      }),
    );
  };

  useEffect(() => {
    sorter('song_name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs, setCurrentSongList]);

  return currentSongList.length !== 0 ? (
    <table className='song-list'>
      <thead>
        <tr>
          <th
            onClick={() => {
              sorter('song_name');
            }}
          >
            Name
          </th>
          <th
            onClick={() => {
              sorter('artist_name');
            }}
          >
            Artist
          </th>
          <th
            onClick={() => {
              sorter('album_name');
            }}
          >
            Album
          </th>
          <th
            onClick={() => {
              sorter('length');
            }}
          >
            Length
          </th>
        </tr>
      </thead>
      <tbody>
        {currentSongList.map((song) => {
          return (
            <tr key={song['song_id']} className={song === currentSong ? 'current-song' : ''}>
              <td
                onClick={() => {
                  setCurrentSong(song);
                  startPlaying(song['song_file_name']);
                }}
                className='cl-song-name'
              >
                {song['song_name']}
              </td>
              <td>{song['artist_name']}</td>
              <td>{song['album_name']}</td>
              <td>{Math.round(song['length'] / 60)}:{String(song['length'] % 60).padStart(2, '0')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div></div>
  );
}
