import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../libs/rq';
import PlayerContext from './playerContext';
import Image from 'next/image';
import ua from '../public/images/unknownalbum.jpg';

export default function Player({}) {
  const { currentSong, isPaused, pausePlay, seek, timeElapsed, nextSong } = useContext(PlayerContext);

  return (
    <div className='player'>
      <div className='song-pic'>
        <Image src={ua} height={100} width={100} alt='Your Name' />
      </div>
      <p className='song-album song-info'>{currentSong['song_name'] ? currentSong['album_name'] : '...'}</p>
      <p className='song-name song-info'>
        {currentSong['song_name'] ? currentSong['song_name'] : 'No song selected...'}
      </p>
      <p className='song-artist song-info'>{currentSong['song_name'] ? currentSong['artist_name'] : '...'}</p>
      <div className='player-controls'>
        <div className='player-controls-buttons'>
          <svg xmlns='http://www.w3.org/2000/svg' className='previous-button' width='48' height='48' viewBox='0 0 24 24'>
            <path d='M10 12v3.518l-6.031-3.518 6.031-3.518v3.518zm12 3.518l-6.031-3.518 6.031-3.518v7.036zm-22-3.518l12 7v-14l-12 7zm12 0l12 7v-14l-12 7z' />
          </svg>
          {isPaused ? (
            <svg
              className='play-pause-button'
              onClick={pausePlay}
              xmlns='http://www.w3.org/2000/svg'
              width='48'
              height='48'
              viewBox='0 0 24 24'
            >
              <path d='M4 3.532l14.113 8.468-14.113 8.468v-16.936zm-2-3.532v24l20-12-20-12z' />
            </svg>
          ) : (
            <svg onClick={pausePlay} className='play-pause-button' xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
              <path d='M18 2v20h-2v-20h2zm-10 0v20h-2v-20h2zm12-2h-6v24h6v-24zm-10 0h-6v24h6v-24z' />
            </svg>
          )}
          <svg xmlns='http://www.w3.org/2000/svg' className='next-button' onClick={nextSong} width='48' height='48' viewBox='0 0 24 24'>
            <path d='M14 8.482l6.031 3.518-6.031 3.518v-7.036zm-12 0l6.031 3.518-6.031 3.518v-7.036zm10-3.482v14l12-7-12-7zm-12 0v14l12-7-12-7z' />
          </svg>
        </div>
        <div>
          <p className='time-elapsed'>
            {Math.round(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
          </p>
          <input
            type='range'
            className='length-bar'
            name='length'
            id='bruh'
            max={currentSong['length']}
            value={timeElapsed}
            step={1}
            onChange={(event) => seek(parseInt(event.target.value))}
          />
          <p className='song-length'>
            {currentSong['length']
              ? `${Math.round(currentSong['length'] / 60)}:${String(currentSong['length'] % 60).padStart(2, '0')}`
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
