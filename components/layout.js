import SideBar from './sideBar';
import Player from './player';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import PlayerContext from './playerContext';

export default function Layout({ children, currentPage }) {
  const { startPlaying, currentSong, setCurrentSong } = useContext(PlayerContext);

  const pages = [
    {name: 'All Songs', href: '/'},
    {name: 'Albums', href: '/albums'},
    {name: 'Artists', href: '/artists'},
    {name: 'Playlists', href: '/playlists'},
    {name: 'Liked songs', href: '/liked_songs'},
  ]
  return (
    <div className='body'>
      <SideBar pages={pages} currentPage={currentPage} />
      <div className='page-content'>{children}</div>
      <Player songPath={currentSong['song_file_name']} />
    </div>
  );
}
