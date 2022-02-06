import Layout from '../components/layout';
import SongList from '../components/songList';
import { useContext } from 'react';
import PlayerContext from '../components/playerContext';

export default function Home() {

  const filter = () => {return true}

  return (
    <Layout currentPage={'All Songs'} filter={filter}>
      <SongList filter={filter} />
    </Layout>
  );
}
