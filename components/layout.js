import SideBar from './sideBar';
import Player from './player';
import { useContext } from 'react';
import PlayerContext from './playerContext';
import { useState } from 'react';

export default function Layout({ children, currentPage }) {
  const { startPlaying, currentSong, setCurrentSong } = useContext(PlayerContext);
  const [sideBarShown, changeSideBarVisibility] = useState(true);

  const pages = [
    {name: 'All Songs', href: '/'},
    {name: 'Albums', href: '/albums'},
    {name: 'Artists', href: '/artists'},
    {name: 'Playlists', href: '/playlists'},
    {name: 'Liked songs', href: '/liked_songs'},
  ]
  return (
    <div className='body'>
      <SideBar sideBarShown={sideBarShown} changeSideBarVisibility={changeSideBarVisibility} pages={pages} currentPage={currentPage} />
      <div className={'page-content ' + (sideBarShown ? 'page-content-margin' : '')}>{children}</div>
      <Player songPath={currentSong['song_file_name']} />
    </div>
  );
}
